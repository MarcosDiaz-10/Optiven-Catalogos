'use client'
import { useEffect, useState } from "react";
import { SliceComponent } from "./SliceComponent";
import { news } from "@/types";
import BASE_URL from "@/lib/getUrlEnv";
import { ErrorComponent } from "@/components/ErrorComponent";
import axiosInstance from "@/lib/api";



export default function SectionSliceNovedades() {
    const [error, setError] = useState<string | null>(null)
    // const [isLoading, setIsLoading] = useState(true);
    const [news, setNews] = useState<news[]>()

    useEffect(() => {
        const getData = async () => {

            try {
                const { data } = await axiosInstance.get('/catalogos/novedades-slice')


                if (data?.error) {
                    setError(`Error al obtener las novedades-slice : ${data.message}, intente de nuevo `);
                    return;
                }
                setNews(data?.result || []);


            } catch (error) {
                setError(`Error al obtener las novedades-slice  kdsjfkl: ${error}, intente de nuevo `)
            } finally {

            }
        }
        getData()
    }, [])


    return (
        <>
            {error && <ErrorComponent msgError={error} isError={!!error} />}
            {!error && <SliceComponent elements={news ?? []} height="100vh" />}
        </>
    )
}
