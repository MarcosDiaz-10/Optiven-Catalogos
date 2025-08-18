'use client'
import { ErrorComponent } from "@/components/ErrorComponent"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Toaster } from "@/components/ui/sonner"
import BASE_URL from "@/lib/getUrlEnv"
import { proveedoresType } from "@/types"
import { AlertCircle, CheckCircle, Clock, Eye, Filter, LucideProps, MoreVertical, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react"
import { toast } from "sonner"
import { VolverButton } from "./VolverButton"
import axiosInstance from "@/lib/api"

interface stausConfigType {
    label: string
    color: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}
const statusConfig: Record<string, stausConfigType> = {
    completado: { label: "Completado", color: "bg-green-100 text-green-800", icon: CheckCircle },
    pendiente: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    error: { label: "Error", color: "bg-red-100 text-red-800", icon: AlertCircle },
}

interface catalogData {
    codcasaco: string
    codcata: string
    fechasubida: string,
    logocata: string,
    marca: string,
    menerrorprocesando: string,
    nomcatalogo: string,
    pesocatalogo: number,
    procesado: string
}

interface catalogProveedor {
    catalogosPorProveedor: Record<string, catalogData[]>
    numCatalogos: number,
    numCatalogosActivos: number,
    numCatalogosPendientes: number
}

export default function PageGestionCatalogosUi() {

    const [error, setError] = useState<string | null>(null)

    // const [isLoading, setIsLoading] = useState(true)
    const [proveedores, setProveedores] = useState<proveedoresType[]>([])
    const [catalogosProveedores, setCatalogosProveedores] = useState<catalogProveedor>()

    useEffect(() => {
        const getProveedores = async () => {

            try {
                const { data } = await axiosInstance.get('/proveedores/proveedores')
                if (data?.error) {
                    setError(`Error al obtener los proveedores: ${data.message}, intente de nuevo `);
                    return;
                }
                setProveedores(data?.result || []);


            } catch (error) {
                setError(`Error al obtener los proveedores: ${error}, intente de nuevo `)
            }
        }

        getProveedores()

    }, [])

    useEffect(() => {

        const getData = async () => {
            // setIsLoading(true)
            try {
                const { data } = await axiosInstance.post(`/catalogos/catalogos-proveedores`, { proveedores: proveedores.map(proveedor => proveedor.codcasaco.trim()) })
                if (data?.error) {
                    setError(`Error al obtener el catalogo: ${data.message}, intente de nuevo `);
                    return;
                }

                setCatalogosProveedores(data?.result || {});


            } catch (error) {
                setError(`Error al obtener el catalogo: ${error}, intente de nuevo `)
            } finally {
                // setIsLoading(false)
            }
        }
        if (proveedores.length !== 0) {
            getData()
        }


    }, [proveedores])

    const onDeleteCatalogo = async (idProveedor: string, idCatalogo: string, procesado: string) => {
        try {

            const { status } = await axiosInstance.delete(`${BASE_URL}/catalogos/${idProveedor}/${idCatalogo}`);

            if (status !== 200) {
                throw new Error('Error con la conexión, no se pudo eliminar el catálogo.');
            }


            setCatalogosProveedores(estadoAnterior => {

                if (!estadoAnterior) return estadoAnterior;


                const nuevosCatalogosDelProveedor = estadoAnterior.catalogosPorProveedor[idProveedor]?.filter(
                    (catalogo) => catalogo.codcata?.trim() !== idCatalogo
                ) ?? [];

                const { numCatalogos, numCatalogosActivos, numCatalogosPendientes } = estadoAnterior
                const nuevoEstado = {
                    numCatalogos: numCatalogos - 1,
                    numCatalogosActivos: (procesado === 'completado') ? numCatalogosActivos - 1 : numCatalogosActivos,
                    numCatalogosPendientes: (procesado === 'pendiente') ? numCatalogosPendientes - 1 : numCatalogosPendientes,
                    catalogosPorProveedor: {
                        ...estadoAnterior.catalogosPorProveedor,
                        [idProveedor]: nuevosCatalogosDelProveedor,
                    },
                };

                return nuevoEstado;
            });

            toast.success('Catálogo Eliminado');

        } catch (error) {

            const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
            setError(`Error al eliminar el catálogo: ${errorMessage}`);
            toast.error('No se pudo eliminar el catálogo.');
        }
    };


    return (
        <>
            {error && <ErrorComponent msgError={error} isError={!!error} />}
            <div className="ml-6 mt-5">
                <VolverButton />
            </div>
            {!error && <main className="max-w-7xl mx-auto px-6 py-8">
                <Toaster />
                {/* Stats Cards */}

                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Catálogos</p>
                                    <p className="text-2xl font-bold text-slate-900">{catalogosProveedores?.numCatalogos ?? 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Eye className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Completados</p>
                                    <p className="text-2xl font-bold text-green-600">{catalogosProveedores?.numCatalogosActivos ?? 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Distribuidores</p>
                                    <p className="text-2xl font-bold text-slate-900">{proveedores.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Filter className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Pendientes</p>
                                    <p className="text-2xl font-bold text-yellow-600">{catalogosProveedores?.numCatalogosPendientes ?? 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-yellow-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}


                {/* Providers and Catalogs */}
                <div className="space-y-8">
                    {proveedores.map((provider) => (
                        <Card key={provider.codcasaco} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">{provider.nombre.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl text-slate-900">{provider.nombre}</CardTitle>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="rounded-full">
                                        {catalogosProveedores?.catalogosPorProveedor[provider.codcasaco.trim()]?.length} catálogo{catalogosProveedores?.catalogosPorProveedor[provider.codcasaco.trim()]?.length !== 1 ? "s" : ""}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {catalogosProveedores?.catalogosPorProveedor[provider.codcasaco.trim()]?.map((catalog) => {
                                        const StatusIcon = statusConfig[catalog.procesado].icon
                                        return (
                                            <Card
                                                key={catalog.codcata}
                                                className="border border-slate-200 hover:shadow-md transition-all duration-200 p-0"
                                            >
                                                <CardContent className="p-0">
                                                    <div className="aspect-[4/3] relative bg-gradient-to-br from-slate-100 to-slate-200">
                                                        <Image
                                                            src={catalog.logocata || "/image-not-found.png"}
                                                            alt={catalog.nomcatalogo}
                                                            fill
                                                            className="object-cover rounded-t-lg"
                                                        />
                                                        <div className="absolute top-3 left-3">
                                                            <Badge className={`${statusConfig[catalog.procesado].color} border-0`}>
                                                                <StatusIcon className="h-3 w-3 mr-1" />
                                                                {statusConfig[catalog.procesado].label}
                                                            </Badge>
                                                        </div>
                                                        <div className="absolute top-3 right-3">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button
                                                                        size="icon"
                                                                        variant="secondary"
                                                                        className="rounded-full bg-white/90 hover:bg-white"
                                                                    >
                                                                        <MoreVertical className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem>
                                                                        {
                                                                            catalog.procesado == 'completado'
                                                                                ? (<Link href={`/home/${catalog.codcasaco}/Catalogo/${catalog.codcata}`} className="flex items-center">
                                                                                    <Eye className="h-4 w-4 mr-2" />
                                                                                    Ver Catálogo
                                                                                </Link>) : ''
                                                                        }


                                                                    </DropdownMenuItem>
                                                                    {/* <DropdownMenuItem>
                                                                    <Edit className="h-4 w-4 mr-2" />
                                                                    Editar
                                                                </DropdownMenuItem> */}

                                                                    <DropdownMenuItem
                                                                        className="text-red-600"
                                                                        onClick={() => {
                                                                            onDeleteCatalogo(catalog.codcasaco?.trim(), catalog.codcata?.trim(), catalog.procesado)
                                                                        }}
                                                                    >
                                                                        <Trash2 className="h-4 w-4 mr-2 text-red-600" />
                                                                        Eliminar
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">{catalog.nomcatalogo}</h3>
                                                        {/* <p className="text-sm text-slate-600 mb-3 line-clamp-2">{catalog.}</p> */}
                                                        <div className="flex items-center justify-between text-xs ">
                                                            {/* <span>{catalog.pages} páginas</span> */}
                                                            <div className="flex gap-1">Peso:<span className="text-slate-500">{catalog.pesocatalogo < 1 ? 'Menos de 1 ' : catalog.pesocatalogo} MB</span></div>
                                                            <div className="flex gap-1">Fecha Subido:<span>{catalog.fechasubida}</span></div>

                                                        </div>
                                                        {
                                                            catalog.procesado == 'error'
                                                                ? (<div className="flex items-center text-xs text-red-500">

                                                                    <div className="flex gap-1">Error:<span className="text-red-300">{catalog.menerrorprocesando}</span></div>

                                                                </div>)
                                                                : ''
                                                        }

                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="w-full flex justify-end my-4 gap-5">
                    <Button
                        className="bg-blue-600 w-[20%] py-6 hover:bg-blue-700 text-white rounded-xl"

                    >

                        <Link href='/home/upload' className="flex items-center"><Plus className="h-4 w-4 mr-2" /> Subir Catálogo</Link>

                    </Button>
                    <Button
                        className="bg-blue-600 w-[20%] py-6 hover:bg-blue-700 text-white rounded-xl"

                    >

                        <Link href='/home/upload-novedad' className="flex items-center"><Plus className="h-4 w-4 mr-2" /> Subir Novedad</Link>

                    </Button>
                </div>
            </main>
            }
        </>

    )
}
