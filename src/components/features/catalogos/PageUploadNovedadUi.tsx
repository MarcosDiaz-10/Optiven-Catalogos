/* eslint-disable  */
// @ts-nocheck
'use client'
import { ErrorComponent } from "@/components/ErrorComponent";
import { LoadingComponent } from "@/components/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BASE_URL from "@/lib/getUrlEnv";
import { marcasType, paisType, proveedoresType, tiposType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { ArrowLeft, FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from 'zod'
import { CatalogFileUploader } from "./CatalogFileUploader";
import { useRouter } from "next/navigation";
import { NovedadFileUploader } from "./NovedadFileUploader";
import { Checkbox } from "@/components/ui/checkbox";
const MAX_IMAGE_SIZE_MB = 5;
const MAX_PDF_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = (sizeInMB: number) => sizeInMB * 1024 * 1024;


const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const uploadSchema = z.object({
    titulo: z.string().min(1, 'El titulo no puede estar vacio').max(100, 'El titulo no puede tener mas de 15 caracteres '),
    descripcion: z.string().min(1, 'La descripcion no puede estar vacia').max(255, 'La descripcion no puede tener mas de 15 caracteres'),
    link: z.string().min(1, 'El link no puede estar vacio').max(255, 'El maximo de caracteres del link es 255'),
    enslice: z.boolean(),
    codtipo: z.string(),
    entop: z.boolean(),
    imagenportada: z
        .instanceof(File, { message: "El logo del catálogo es obligatorio." })
        .refine((file) => file.size <= MAX_FILE_SIZE_BYTES(MAX_IMAGE_SIZE_MB), `El tamaño máximo es de ${MAX_IMAGE_SIZE_MB}MB.`)
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Solo se admiten formatos .jpg, .png y .webp."),
})


export default function PageUploadNovedadUi() {
    const [formKey, setFormKey] = useState(0);
    const form = useForm<z.infer<typeof uploadSchema>>({
        resolver: zodResolver(uploadSchema),
        defaultValues: {

            titulo: "",
            descripticion: "",
            link: "",
            enslice: false,
            codtipo: "",
            entop: false,
            imagenportada: undefined,
        }
    })

    const router = useRouter()

    const [tipo, setTipo] = useState<tiposType[]>([])

    const [isLoadingTipos, setIsLoadingTipos] = useState(true)

    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getDataTipo = async () => {
            setIsLoadingTipos(true)
            try {
                const data = await fetch(BASE_URL + '/catalogos/tipos')
                if (!data.ok) throw new Error('Error con la conexion, intente de nuevo ')
                const json = await data.json()
                if (json?.error) {
                    setError(`Error al obtener los tipos: ${json.message}, intente de nuevo `);
                    return;
                }
                setTipo(json?.result || []);


            } catch (error) {
                setError(`Error al obtener los tipos: ${error}, intente de nuevo `)
            } finally {
                setIsLoadingTipos(false)
            }
        }
        getDataTipo()
    }, [])


    const onSubmit = async (data: z.infer<typeof uploadSchema>) => {
        setError(null)
        const formData = new FormData();
        const { imagenportada, ...rest } = data
        formData.append('data', JSON.stringify(rest))
        formData.append('imagenportada', imagenportada)
        try {
            const response = await fetch(BASE_URL + '/catalogos/novedades', {
                method: 'POST',
                body: formData,
            });

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     setError(`Error: ${errorData.message}`)
            //     throw new Error(errorData.message || 'Error al subir el catálogo.');
            // }
            const data = await response.json()
            if (data?.error) {
                setError(`Error: ${data.message}`)
                return;
            }

            setFormKey(prevKey => prevKey + 1);
        } catch (error: any) {
            console.error(error);
            setError(`Error: ${error.message}`);
        }
        form.reset()
    }

    return (

        <>
            {error && <ErrorComponent msgError={error} isError={!!error} />}
            {
                !error && <div className="max-w-4xl mx-auto px-6 py-8 h-screen">
                    {/* Header */}
                    <div className="flex items-center space-x-4 mb-8">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200"
                            onClick={() => {
                                if (!document.startViewTransition) {
                                    router.back();
                                    return;
                                }


                                document.startViewTransition(() => {
                                    router.back();
                                });
                            }}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver
                        </Button>
                        <div className="h-6 w-px bg-slate-300"></div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">Agregar Novedad</h1>
                            <p className="text-slate-600 mt-1">Completa la información para agregar la novedad al sistema</p>
                        </div>
                    </div>
                    <div className="w-full relative">
                        <div className={clsx(
                            "absolute inset-0 transition-all duration-300 ease-in-out mt-3",
                            isLoadingTipos
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 pointer-events-none translate-y-2'
                        )}>
                            <LoadingComponent className="w-full" width="w-[100%]" height="h-[400px]" />
                        </div>

                        <Form {...form}>
                            <form key={formKey} onSubmit={form.handleSubmit(onSubmit)} className={clsx("space-y-8",
                                !isLoadingTipos
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 pointer-events-none translate-y-2'
                            )}>
                                {
                                    form.formState.isSubmitSuccessful
                                        ? <div className="bg-green-300 border border-green-800 text-green-800 p-3 rounded-2xl">
                                            Novedad Subido Correctamente!
                                        </div>
                                        : null
                                }

                                {/* Información Básica */}
                                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center">
                                            <FileText className="w-5 h-5 mr-2" />
                                            Información Básica
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                            <FormField
                                                control={form.control}
                                                name="titulo"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel htmlFor="titulo" className="text-sm font-semibold text-slate-700">
                                                            Titulo *
                                                        </FormLabel>
                                                        <FormControl>

                                                            <Input
                                                                id="titulo"
                                                                {...field}
                                                                placeholder="Ej: Nuevo Catalogo de Proveedor XXXX"
                                                                className={`transition-all duration-200 `}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}



                                            />
                                            <FormField
                                                control={form.control}
                                                name="descripcion"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel htmlFor="descripcion" className="text-sm font-semibold text-slate-700">
                                                            Descripcion *
                                                        </FormLabel>
                                                        <FormControl>

                                                            <Input
                                                                id="descripcion"
                                                                {...field}
                                                                placeholder="Ej: Nuevo Catalogo de Proveedor XXXX"
                                                                className={`transition-all duration-200 `}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}



                                            />
                                            <FormField
                                                control={form.control}
                                                name="link"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel htmlFor="link" className="text-sm font-semibold text-slate-700">
                                                            Link *
                                                        </FormLabel>
                                                        <FormControl>

                                                            <Input
                                                                id="link"
                                                                {...field}
                                                                placeholder="Ej: Nuevo Catalogo de Proveedor XXXX"
                                                                className={`transition-all duration-200 `}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}



                                            />
                                            <FormField
                                                control={form.control}
                                                name="codtipo"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-semibold text-slate-700"> Tipo Catálogo *</FormLabel>

                                                        <Select
                                                            value={field.value}
                                                            onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger
                                                                className={`transition-all duration-200 `}
                                                            >
                                                                <SelectValue placeholder="Selecciona un tipo de catalogo" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {tipo.map((tipo) => (
                                                                    <SelectItem key={tipo.codtipo} value={tipo.codtipo.trim()}>
                                                                        {tipo.nombre}
                                                                    </SelectItem>
                                                                ))}

                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="enslice"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel htmlFor="enslice" className="text-sm font-semibold text-slate-700">
                                                            En Slice *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}



                                            />
                                            <FormField
                                                control={form.control}
                                                name="entop"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel htmlFor="entop" className="text-sm font-semibold text-slate-700">
                                                            Esta en el top novedades*
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}



                                            />












                                        </div>
                                    </CardContent>
                                </Card>

                                <NovedadFileUploader
                                    control={form.control}
                                    errors={form.formState.errors}
                                />

                                <div className="flex items-center justify-end space-x-4 pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="px-6 py-3 transition-all duration-200 hover:bg-slate-50 bg-transparent"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={form.formState.isSubmitSuccessful}
                                        className="px-8 py-3 bg-[#0d0443] hover:bg-blue-900 text-white transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {form.formState.isSubmitSuccessful ? (
                                            <div className="flex items-center space-x-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Subiendo...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-2">
                                                <Upload className="w-4 h-4" />
                                                <span>Subir Novedad</span>
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            }
        </>
    )
}
