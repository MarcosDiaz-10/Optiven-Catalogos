'use client'
import { PdfViewer } from "@/components/features/pdf-view/PdfViewer";

import { VolverButton } from "@/components/features/catalogos/VolverButton";
import { Button } from "@/components/ui/button";
import { useEffect, useState, unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Mail, MessageCircle, Phone, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ErrorComponent } from "@/components/ErrorComponent";

import { infoCatalogo } from "@/types";
import LoaidngLayoutCatalogoUi from "@/components/loadings/LoadingLayoutCatalogoUi";
import { Badge } from "@/components/ui/badge";
import ScrollToTop from "@/components/utils/ScrollToTop";
import DialogEnviarEmail from "./DialogEnviarEmail";
import axiosInstance from "@/lib/api";


export const LayoutCatalogoUi = ({ idProveedor, idCatalogo }: { idProveedor: string, idCatalogo: string }) => {


    const [error, setError] = useState<string | null>(null)
    const [catalogo, setCatalogo] = useState<infoCatalogo | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isOpenModalEmail, setIsOpenModalEmail] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            try {
                const { data } = await axiosInstance.get(`/catalogos/${idProveedor}/${idCatalogo}`)

                if (data?.error) {
                    setError(`Error al obtener el catalogo: ${data.message}, intente de nuevo `);
                    return;
                }
                setCatalogo(data?.result?.[0] || []);


            } catch (error) {
                setError(`Error al obtener el catalogo: ${error}, intente de nuevo `)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [idProveedor, idCatalogo])



    return (
        <>
            <ScrollToTop />
            {error && <ErrorComponent msgError={error} isError={!!error} />}
            {!error &&

                <div className="relative">
                    <div className="ml-6 mt-5">
                        <VolverButton />
                    </div>
                    {/* Loading Skeleton with exit animation */}
                    <div
                        className={`transition-all duration-500 ${isLoading ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                            }`}
                    >
                        {isLoading && <LoaidngLayoutCatalogoUi />}
                    </div>

                    {/* Main Content with entrance animation */}
                    <div
                        className={`transition-all duration-500 ${!isLoading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none absolute inset-0"
                            }`}
                    >

                        {!isLoading && <main className="max-w-[95%] mx-auto px-3 py-5">
                            {/* Product Header */}
                            <div className="grid lg:grid-cols-5 gap-10 mb-12">


                                {/* Compact Info Panel - Takes 2 columns */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Brand Info */}
                                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <h2 className="text-xl font-bold text-slate-900">Informacion Distribuidor</h2>
                                            </div>
                                            <div className="space-y-3 grid grid-cols-2 ">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-500">REPRESENTANTE COMERCIAL</p>
                                                    <p className="text-slate-900 font-semibold">{catalogo?.nomcasacomercial}</p>
                                                </div>
                                                <div className="pl-20">
                                                    <p className="text-sm font-medium text-slate-500">MARCA</p>
                                                    <p className="text-slate-900 font-semibold">{catalogo?.marca}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-500">Página Web</p>
                                                    <a href={'https://' + catalogo?.paginaweb} target="_blank" className="text-blue-600 font-medium hover:text-blue-700">
                                                        {catalogo?.paginaweb}
                                                    </a>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Quick Contact */}
                                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold text-slate-900 mb-4 text-lg">Contacto Directo</h3>
                                            <div className="space-y-3">
                                                {
                                                    catalogo?.whatsapp
                                                        ? (
                                                            <Button
                                                                variant="outline"
                                                                className="w-full justify-start rounded-full border-green-200 hover:bg-green-50 bg-transparent"
                                                            >
                                                                <MessageCircle className="h-4 w-4 mr-3 text-green-600" />
                                                                <span className="text-slate-700">WhatsApp: {catalogo?.whatsapp}</span>
                                                            </Button>
                                                        ) : ''
                                                }
                                                {
                                                    catalogo?.telefono
                                                        ? (
                                                            <Button
                                                                variant="outline"
                                                                className="w-full justify-start rounded-full border-blue-200 hover:bg-blue-50 bg-transparent"
                                                            >
                                                                <Phone className="h-4 w-4 mr-3 text-blue-600" />
                                                                <span className="text-slate-700">Teléfono: {catalogo?.telefono}</span>
                                                            </Button>
                                                        ) : ''
                                                }
                                                {
                                                    catalogo?.telconta
                                                        ? (
                                                            <Button
                                                                variant="outline"
                                                                className="w-full justify-start rounded-full border-blue-200 hover:bg-blue-50 bg-transparent"
                                                            >
                                                                <Phone className="h-4 w-4 mr-3 text-blue-600" />
                                                                <span className="text-slate-700">Contacto: {catalogo?.telconta}</span>
                                                            </Button>
                                                        ) : ''
                                                }

                                                {
                                                    catalogo?.instagram
                                                        ? (
                                                            <Button
                                                                variant="outline"
                                                                className="w-full justify-start rounded-full border-pink-200 hover:bg-pink-50 bg-transparent"
                                                            >
                                                                <Instagram className="h-4 w-4 mr-3 text-pink-600" />
                                                                <span className="text-slate-700">{catalogo?.instagram}</span>
                                                            </Button>
                                                        ) : ''
                                                }
                                                {
                                                    catalogo?.email
                                                        ? (
                                                            <Button
                                                                variant="outline"
                                                                className="w-full justify-start rounded-full border-slate-200 hover:bg-slate-50 bg-transparent"
                                                            >
                                                                <Mail className="h-4 w-4 mr-3 text-slate-600" />
                                                                <span className="text-slate-700">{catalogo?.email}</span>
                                                            </Button>
                                                        ) : ''
                                                }



                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Stats */}
                                    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 pb-6 pt-0">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold mb-4 text-lg">Información del Catálogo</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold">150+</p>
                                                    <p className="text-blue-100 text-sm">Modelos</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold">2025</p>
                                                    <p className="text-blue-100 text-sm">Colección</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                {/* Large Catalog Image - Takes 3 columns */}

                                <div className="lg:col-span-3">
                                    <div className="relative">
                                        <ViewTransition name={idCatalogo}>
                                            <Card className="border-0 shadow-2xl bg-white overflow-hidden transform hover:scale-[1.02] transition-all duration-300 p-0 ">
                                                <CardContent className="p-0">
                                                    <div className="relative">
                                                        {/* Main Catalog Image */}
                                                        <div className="aspect-[4/4] relative bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 ">
                                                            <Image
                                                                src={catalogo?.urlFirsPage ?? '/image-not-found.png'}
                                                                alt="Imagen catalogo"
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            {/* Overlay with catalog info */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                                                <Badge className="bg-white/30 text-white/95 text-md border-white/50 mb-3">{catalogo?.marca}</Badge>
                                                                <h1 className="text-3xl font-bold mb-2">{catalogo?.nomcatalogo}</h1>
                                                                <p className="text-white/90 text-lg">{catalogo?.descripcasaco}</p>
                                                            </div>
                                                        </div>


                                                    </div>

                                                    {/* Catalog Actions */}
                                                    <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800">
                                                        <div className="flex gap-3">

                                                            <Button
                                                                className="flex-1 bg-blue-600 hover:bg-blue-900 text-white rounded-full py-3"
                                                                onClick={() => { setIsOpenModalEmail(true) }}
                                                            >
                                                                <ShoppingCart className="h-5 w-5 mr-2" />
                                                                Hacer Pedido
                                                            </Button>

                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </ViewTransition>
                                    </div>
                                </div>
                            </div>

                            {/* Catalog Section */}
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Catálogo de Productos</h2>
                                    <p className="text-slate-600">Explora nuestro catálogo</p>
                                </div>

                                <Separator className="my-8" />

                                {/* Placeholder for Flipbook Component */}
                                <div className="bg-white rounded-2xl shadow-lg p-4 min-h-[600px] flex items-center justify-center">
                                    <PdfViewer idCatalogo={idCatalogo} idProveedor={idProveedor} />
                                </div>
                            </div>
                        </main>}
                    </div>
                    <DialogEnviarEmail isOrderModalOpen={isOpenModalEmail} setIsOrderModalOpen={setIsOpenModalEmail} nombreCatalogo={catalogo?.nomcatalogo ?? ''} setError={setError} correoEnvio={catalogo?.email ?? ''} />
                </div>
            }
        </>
    )
}
