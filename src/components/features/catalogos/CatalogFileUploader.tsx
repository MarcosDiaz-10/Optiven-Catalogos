"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { FileUpload } from "./fileUpload"
import { Control, Controller, FieldErrors } from "react-hook-form"
import z from "zod"

const MAX_IMAGE_SIZE_MB = 5;
const MAX_PDF_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = (sizeInMB: number) => sizeInMB * 1024 * 1024;


const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const uploadSchema = z.object({
    codcata: z.string().min(1, "El codigo no puede estar vacio"),
    nombre: z.string().min(1, 'El nombre no puede estar vacio'),
    codcasaco: z.string(),
    marca: z.string(),
    tipoCat: z.string(),
    codpais: z.string(),
    logoCatalogo: z
        .instanceof(File, { message: "El logo del catálogo es obligatorio." })
        .refine((file) => file.size <= MAX_FILE_SIZE_BYTES(MAX_IMAGE_SIZE_MB), `El tamaño máximo es de ${MAX_IMAGE_SIZE_MB}MB.`)
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Solo se admiten formatos .jpg, .png y .webp."),
    pdfCatalogo: z
        .instanceof(File, { message: "El PDF del catálogo es obligatorio." })
        .refine((file) => file.type === "application/pdf", "El archivo debe ser un PDF.")
        .refine((file) => file.size <= MAX_FILE_SIZE_BYTES(MAX_PDF_SIZE_MB), `El tamaño máximo es de ${MAX_PDF_SIZE_MB}MB.`),
})


interface CatalogFileUploaderProps {
    // Pasamos el 'control' de react-hook-form
    control: Control<z.infer<typeof uploadSchema>>
    // Y los errores para mostrarlos
    errors: FieldErrors<z.infer<typeof uploadSchema>>
}

export function CatalogFileUploader({ control, errors }: CatalogFileUploaderProps) {
    return (
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Archivos del Catálogo
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Campo para el Logo del Catálogo */}
                    <Controller
                        name="logoCatalogo"
                        control={control}
                        rules={{ required: "El logo del catálogo es obligatorio" }}
                        render={({ field }) => (
                            <FileUpload
                                type="image"
                                title="Logo del Catálogo"
                                description="PNG, JPG hasta 5MB"
                                accept="image/*"
                                maxSize={5}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.logoCatalogo?.message}
                                required
                            />
                        )}
                    />



                    <Controller
                        name="pdfCatalogo"
                        control={control}
                        rules={{ required: "El PDF del catálogo es obligatorio" }}
                        render={({ field }) => (
                            <FileUpload
                                type="pdf"
                                title="PDF del Catálogo"
                                description="Archivo PDF hasta 50MB"
                                accept=".pdf"
                                maxSize={50}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.pdfCatalogo?.message}
                                required
                            />
                        )}
                    />
                </div>

                {/* Campo para el PDF del Catálogo */}
            </CardContent>
        </Card>
    )
}