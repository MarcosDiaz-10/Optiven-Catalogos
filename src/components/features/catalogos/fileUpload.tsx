"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Upload, X, FileText, ImageIcon, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface FileUploadProps {
    type: "image" | "pdf"
    title: string
    description: string
    accept: string
    maxSize?: number // en MB
    value?: File | null
    onChange: (file: File | null) => void
    error?: string
    required?: boolean
}

export function FileUpload({
    type,
    title,
    description,
    accept,
    maxSize = 5,
    value,
    onChange,
    error,
    required = false,
}: FileUploadProps) {
    const [preview, setPreview] = useState<string>("")
    const [isDragOver, setIsDragOver] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (file: File | null) => {
        if (!file) {
            onChange(null)
            setPreview("")
            return
        }

        // Validar tamaño
        if (file.size > maxSize * 1024 * 1024) {
            return // El error se manejará desde el componente padre
        }

        onChange(file)

        // Generar preview para imágenes
        if (type === "image" && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        // Solo desactivamos el estado si el cursor sale del componente por completo
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragOver(false)
        }
    }

    // Esencial para que el 'drop' funcione
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)

        const droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile) {
            handleFileChange(droppedFile)
        }
    }
    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleRemove = () => {
        handleFileChange(null)
    }

    const Icon = type === "image" ? ImageIcon : FileText

    return (
        <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">
                {title} {required && <span className="text-red-500">*</span>}
            </Label>

            <div
                className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${value ? 'cursor-default' : 'cursor-pointer'} ${isDragOver
                    ? "border-blue-400 bg-blue-50/70 scale-[1.02]"
                    : error
                        ? "border-red-300 bg-red-50/50"
                        : value
                            ? "border-green-300 bg-green-50/50"
                            : "border-slate-300 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/50"
                    }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={!value ? handleClick : undefined}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                    className="hidden"
                />

                {value ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {preview ? (
                                <div className="relative group">
                                    <Image
                                        width={300}
                                        height={300}

                                        src={preview || "/placeholder.svg"}
                                        alt="Preview"
                                        className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors duration-200"></div>
                                </div>
                            ) : (
                                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center shadow-sm">
                                    <FileText className="w-8 h-8 text-slate-500" />
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <p className="font-semibold text-slate-800 truncate">{value.name}</p>
                                <p className="text-sm text-slate-500">{(value.size / 1024 / 1024).toFixed(2)} MB</p>
                                <div className="flex items-center space-x-1 mt-1">
                                    <Check className="w-3 h-3 text-green-600" />
                                    <span className="text-xs text-green-600 font-medium">Archivo cargado</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClick()
                                }}
                                className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                            >
                                Cambiar
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemove()
                                }}
                                className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center pointer-events-none">
                        <div
                            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-200 ${isDragOver
                                ? "bg-blue-100 text-blue-600 scale-110"
                                : error
                                    ? "bg-red-100 text-red-500"
                                    : "bg-slate-100 text-slate-400 hover:bg-blue-100 hover:text-blue-500"
                                }`}
                        >
                            <Icon className="w-8 h-8" />
                        </div>
                        <p
                            className={`font-semibold mb-2 transition-colors duration-200 ${error ? "text-red-600" : "text-slate-700"
                                }`}
                        >
                            {isDragOver ? "Suelta el archivo aquí" : "Arrastra tu archivo aquí"}
                        </p>
                        <p className="text-sm text-slate-500 mb-3">
                            o <span className="text-blue-600 hover:text-blue-800 underline font-medium">selecciona uno</span>
                        </p>
                        <p className="text-xs text-slate-400">{description}</p>
                    </div>
                )}

                {/* Indicador de drag over */}
                {isDragOver && (
                    <div className="absolute inset-0 bg-blue-400/10 border-2 border-blue-400 border-dashed rounded-xl flex items-center justify-center">
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg">
                            <Upload className="w-4 h-4 inline mr-2" />
                            Suelta para subir
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm animate-in slide-in-from-left-1 duration-200">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    )
}
