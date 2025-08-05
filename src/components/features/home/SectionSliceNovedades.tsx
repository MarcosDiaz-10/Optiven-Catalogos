'use client'
import { useEffect, useState } from "react";
import { SliceComponent } from "./SliceComponent";
import { news } from "@/types";
import BASE_URL from "@/lib/getUrlEnv";
import { ErrorComponent } from "@/components/ErrorComponent";



export default function SectionSliceNovedades() {
    const [error, setError] = useState<string | null>(null)
    // const [isLoading, setIsLoading] = useState(true);
    const [news, setNews] = useState<news[]>()

    useEffect(() => {
        const getData = async () => {

            try {
                const data = await fetch(BASE_URL + '/catalogos/novedades-slice')
                if (!data.ok) throw new Error('Error con la conexion, intente de nuevo ')
                const json = await data.json()
                if (json?.error) {
                    setError(`Error al obtener los tipos de productos: ${json.message}, intente de nuevo `);
                    return;
                }
                console.log(json)
                setNews(json?.result || []);


            } catch (error) {
                setError(`Error al obtener los tipos de productos: ${error}, intente de nuevo `)
            } finally {

            }
        }
        getData()
    }, [])

    console.log(news)

    return (
        <>
            {error && <ErrorComponent msgError={error} isError={!!error} />}
            {!error && <SliceComponent elements={news ?? []} height="100vh" />}
        </>
    )
}
