'use client';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, unstable_ViewTransition as ViewTransition } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { LoadingComponent } from "@/components/LoadingComponent";
import { ErrorComponent } from "@/components/ErrorComponent";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { catalogosType, proveedoresType, tiposType } from "@/types";
import axiosInstance from "@/lib/api";

export const dynamic = 'force-dynamic';


export default function SearchCatalogosUi() {

    const router = useRouter()
    const searchParams = useSearchParams()

    const [proveedores, setProveedores] = useState<proveedoresType[]>([])
    const [catalogos, setCatalogos] = useState<catalogosType[]>([])
    const [tipos, setTipos] = useState<tiposType[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoadingProveedores, setIsLoadingProveedores] = useState(true);
    const [isLoadingCatalogos, setIsLoadingCatalogos] = useState(true);
    const [isLoadingTipos, setIsLoadingTipos] = useState(true);


    const tipoActivo = searchParams.get('tipo') || 'todos';
    const proveedorActivo = searchParams.getAll('prove') || ['todos'];
    const search = searchParams.get('search') || '';

    useEffect(() => {
        const getData = async () => {
            setIsLoadingTipos(true)
            try {
                const { data } = await axiosInstance.get('/catalogos/tipos')
                if (data?.error) {
                    setError(`Error al obtener los tipos de productos: ${data.message}, intente de nuevo `);
                    return;
                }
                setTipos(data?.result || []);


            } catch (error) {
                setError(`Error al obtener los tipos de productos: ${error}, intente de nuevo `)
            } finally {
                setIsLoadingTipos(false)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        const getProveedores = async () => {
            setIsLoadingProveedores(true)
            try {
                const { data } = await axiosInstance.get('/proveedores/proveedores')
                if (data?.error) {
                    setError(`Error al obtener los proveedores: ${data.message}, intente de nuevo `);
                    return;
                }
                setProveedores(data?.result || []);


            } catch (error) {
                setError(`Error al obtener los proveedores: ${error}, intente de nuevo `)
            } finally {
                setTimeout(() => {
                    setIsLoadingProveedores(false)
                }, 300)
            }
        }

        getProveedores()
    }, [tipoActivo])

    useEffect(() => {

        const getCatalogos = async () => {
            setIsLoadingCatalogos(true)
            try {
                const { data } = await axiosInstance.get(`/catalogos/search?${searchParams.toString()}`)
                if (data?.error) {
                    setError(`Error al obtener los catalogos: ${data.message}, intente de nuevo `);
                    return;
                }
                setCatalogos(data?.result || []);


            } catch (error) {
                setError(`Error al obtener los catalogos: ${error}, intente de nuevo `)
            } finally {
                setTimeout(() => {
                    setIsLoadingCatalogos(false)
                }, 300)
            }
        }
        getCatalogos()

    }, [searchParams]);

    const onChangeTipoProduc = (val: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (val === 'todos') {
            params.delete('tipo');
        } else {
            params.set('tipo', val);
        }
        router.push(`buscar-catalogos?${params.toString()}`);
    };

    const onChangeProveedor = (checked: boolean | string, idChecked: string) => {
        const params = new URLSearchParams(searchParams.toString());

        let proveedoresActuales = params.getAll('prove');

        if (idChecked === 'todos') {
            proveedoresActuales = [];
        }
        else {
            if (!checked) {
                proveedoresActuales = proveedoresActuales.filter(p => p !== idChecked);
            } else {
                proveedoresActuales.push(idChecked);
            }
        }
        params.delete('prove');
        proveedoresActuales.forEach(p => params.append('prove', p));
        router.push(`buscar-catalogos?${params.toString()}`);
    };

    return (
        <>
            {error && <ErrorComponent msgError={error} isError={!!error} />}
            {!error && <div className=' w-full pt-1 h-screen'>
                <div className='bg-white/60 backdrop-blur-sm border-b border-slate-200/60 w-full flex items-center justify-start px-5 py-2'>
                    <div className="relative flex w-full justify-center max-w-[650px] items-center ml-5 p-3 ">
                        <div className={clsx(
                            "absolute inset-0 transition-all duration-300 ease-in-out mt-3",
                            isLoadingTipos
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 pointer-events-none translate-y-2'
                        )}>
                            <LoadingComponent className="w-full" width="w-[100%]" height="h-[35px]" />
                        </div>
                        <div className={clsx(
                            "flex items-center gap-2 transition-all duration-300 ease-in-out",
                            !isLoadingTipos
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 pointer-events-none translate-y-2'
                        )}>
                            <span className="text-sm font-medium font-inter text-slate-600 mr-4">Tipo de productos: </span>
                            <Button
                                className={clsx(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-100 bg-transparent border-none shadow-none",
                                    tipoActivo === 'todos' ? "bg-[#0d0443] text-white shadow-lg" : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                                )}
                                onClick={() => onChangeTipoProduc('todos')}
                            >
                                Todos
                            </Button>
                            {
                                tipos.map((tipo) => (
                                    <Button
                                        key={tipo.codtipo}
                                        onClick={() => onChangeTipoProduc(tipo.codtipo)}
                                        className={clsx(
                                            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-100 bg-transparent border-none shadow-none",
                                            tipoActivo === tipo.codtipo ? "bg-[#0d0443] text-white shadow-md" : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                                        )}>
                                        {tipo.nombre}
                                    </Button>
                                ))
                            }

                        </div>

                    </div>
                </div>
                <div className="flex gap-15  mx-auto justify-center px-10 py-14   ">
                    <aside className={clsx('flex flex-row justify-center space-y-6  relative')}>
                        <div className={clsx(
                            "absolute inset-0 transition-all duration-300 ease-in-out ml-4",
                            isLoadingProveedores
                                ? 'opacity-100 translate-y-0 '
                                : 'opacity-0 pointer-events-none translate-y-2')} >
                            <LoadingComponent
                                className={clsx("w-full my-2")}
                                width="w-[100%]"
                                height="h-[300px]"
                            />
                        </div>
                        <Card className={clsx(
                            "flex flex-col items-center h-min  justify-center bg-white/60 backdrop-blur-sm border-slate-200/60 py-4 shadow-sm w-max  transition-all duration-300 ease-in-out",
                            !isLoadingProveedores ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-2'
                        )}>
                            <CardContent className="relative flex flex-col px-4 py-1">
                                <div
                                >
                                    <h3 className="font-semibold text-slate-800 mb-5 flex items-center font-inter"><Filter className="w-4 h-4 mr-2" />Proveedor</h3>
                                    <div
                                        className={clsx("flex items-center space-x-2 mb-5")}
                                    >
                                        <Checkbox id={`proveedor-todos`} className="data-[state=checked]:bg-[#0d0443] data-[state=checked]:border-[#0d0443]" checked={proveedorActivo.length === 0} onCheckedChange={(checked) => onChangeProveedor(checked, 'todos')} />
                                        <div className="text-sm text-slate-600 cursor-pointer flex-1 font-inter" >Todos</div>
                                    </div>
                                    {
                                        proveedores.map((proveedor) => (
                                            <div key={proveedor.codcasaco} className="flex items-center space-x-2 mb-5">
                                                <Checkbox id={`proveedor-${proveedor.codcasaco.trim()}`} className="data-[state=checked]:bg-[#0d0443] data-[state=checked]:border-[#0d0443]" checked={proveedorActivo.includes(proveedor.codcasaco.trim())} onCheckedChange={(checked) => onChangeProveedor(checked, proveedor.codcasaco.trim())} />
                                                <div className="text-sm text-slate-600 cursor-pointer flex-1 font-inter">{proveedor.nombre}</div>
                                            </div>
                                        ))
                                    }
                                </div>

                            </CardContent>
                        </Card>

                    </aside>
                    <main className=" flex-1">
                        <div className="relative flex items-center justify-between mb-8 w-full">
                            <div className={clsx(
                                "absolute inset-0 transition-all duration-300 ease-in-out",
                                isLoadingCatalogos
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 pointer-events-none translate-y-2'
                            )}>
                                <div>
                                    <LoadingComponent className="w-full mt-2" width="w-[20%]" height="h-[40px]" />
                                    <LoadingComponent className="w-full mt-2" width="w-[40%]" height="h-[20px]" />
                                </div>
                                {
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <LoadingComponent key={index} className="w-full mt-4" width="w-[100%]" height="h-[160px]" />
                                    ))
                                }
                            </div>
                            <div className={clsx(
                                "transition-all duration-300 ease-in-out w-full",
                                !isLoadingCatalogos
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0  translate-y-2'
                            )}>
                                <div className="flex flex-col  mb-8">
                                    <h2 className="text-3xl font-bold text-slate-800 font-sans">Resultados </h2>
                                    <p className="text-slate-500 mt-2 text-lg">
                                        {
                                            search === ''
                                                ? 'Mostrando todos los catálogos disponibles'
                                                : `${catalogos.length} catálogo(s) encontrado(s) para "${search}"`

                                        }
                                    </p>
                                </div>
                                <div className="space-y-2">

                                    {
                                        catalogos.map((catalogo) => (
                                            <div className="w-full h-full" key={catalogo.codcata}>
                                                <Card className=" bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 group" >
                                                    <CardContent className="px-4 py-2">
                                                        <div className="flex gap-4 items-center">
                                                            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                                                                <ViewTransition name={catalogo.codcata}>
                                                                    <Image src={catalogo.logocata || '/Image-not-found.png'} alt="Catalogo" className="w-full h-full object-cover" width={300} height={300} />
                                                                </ViewTransition>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-end gap-4 mb-4">
                                                                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
                                                                        {catalogo.nomcatalogo}
                                                                    </h3>
                                                                    <Badge variant={'secondary'} className="bg-blue-100 text-blue-800 border-blue-500 px-3 py-1 rounded-2xl">
                                                                        {catalogo.marca}
                                                                    </Badge>
                                                                </div>
                                                                <div className="flex items-center gap-6 text-sm text-slate-600">
                                                                    <span className="truncate">
                                                                        <span className="font-medium">Proveedor:</span> {catalogo?.nomcasacomer}
                                                                    </span>
                                                                    <span className="flex-shrink-0">
                                                                        <span className="font-medium">Instagram:</span> {catalogo.instagram}
                                                                    </span>
                                                                    <span className="flex-shrink-0">
                                                                        <span className="font-medium">Tel:</span> {catalogo.telefono}
                                                                    </span>
                                                                </div>

                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <Button
                                                                    size="sm"
                                                                    className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg transition-all duration-200"

                                                                >
                                                                    <Link href={`/home/${catalogo.codcasaco?.trim()}/Catalogo/${catalogo.codcata?.trim()}`}>
                                                                        Ver Catálogo
                                                                    </Link>
                                                                </Button>
                                                            </div>
                                                        </div>

                                                    </CardContent>

                                                </Card>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="mt-8 text-start text-slate-500">
                                    <p>Mostrando {catalogos.length} de {catalogos.length} resultados</p>
                                </div>
                            </div>
                        </div>

                    </main>
                </div >

            </div >
            }
        </>
    )
}
