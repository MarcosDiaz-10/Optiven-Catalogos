'use client'
import clsx from "clsx"
import { CarouselSectionNews } from "./CarouselSectionNews"
import { useEffect, useState } from "react"
import BASE_URL from "@/lib/getUrlEnv"
import { section } from "@/types"
import { ErrorComponent } from "@/components/ErrorComponent"
import axiosInstance from "@/lib/api"

// const news = [
//     {
//         titleSection: '',
//         items: [
//             {
//                 title: 'Horizonte Infinito',
//                 img: 'https://phantom-marca-mx.unidadeditorial.es/7371e441531b736a6276bb6b7fa6dff8/resize/828/f/jpg/mx/assets/multimedia/imagenes/2023/06/15/16868023009689.jpg',
//                 description: 'Tu mundo es ahora un lienzo infinito, donde la realidad se reinventa con cada mirada',
//                 link: ''
//             },
//             {
//                 title: 'La Firma de un Visionario',
//                 img: 'https://visionyoptica.com/wp-content/uploads/2022/11/paginaweb-nota5-producto-andina-031.jpg',
//                 description: 'Hay miradas que definen un legado. La nuestra es la firma que lo confirma',
//                 link: ''
//             },
//             {
//                 title: 'Luz y Sombra, Un Mismo Estilo',
//                 img: 'https://cdnx.jumpseller.com/red-de-accesorioos/image/37488276/WhatsApp_Image_2023-07-10_at_4.19.20_PM__1_.jpeg?1689029305',
//                 description: 'Un estilo que fluye sin interrupciones, adaptándose a la velocidad de la luz y de tu vida',
//                 link: ''
//             },
//             {
//                 title: 'El Color de lo Instantáneo',
//                 img: 'https://gv-brxm.imgix.net/binaries/_ht_1727867293709/content/gallery/es-optica2000/gallery/other-pages/transitions/gens-image.jpeg?fit=fillmax&w=2160&h=1874&q=50&auto=format',
//                 description: 'La tecnología se convierte en autoexpresión. Elegí tu tono y definí tu mundo a la velocidad de la luz',
//                 link: ''
//             },
//             {
//                 title: 'Anatomía de la Visión Futura',
//                 img: 'https://about.fb.com/ltam/wp-content/uploads/sites/14/2024/09/461276718_1636722540593891_4494012770455415545_n.png?fit=1920%2C1080',
//                 description: 'La ingeniería de lo invisible. Una sinfonía de microtecnología para una experiencia mágicamente natural',
//                 link: ''
//             },
//         ]
//     },
//     {
//         titleSection: 'Monturas Oftalmicas',
//         items: [
//             {
//                 title: 'Horizonte Infinito',
//                 img: 'https://phantom-marca-mx.unidadeditorial.es/7371e441531b736a6276bb6b7fa6dff8/resize/828/f/jpg/mx/assets/multimedia/imagenes/2023/06/15/16868023009689.jpg',
//                 description: 'Tu mundo es ahora un lienzo infinito, donde la realidad se reinventa con cada mirada',
//                 link: ''
//             },
//             {
//                 title: 'La Firma de un Visionario',
//                 img: 'https://visionyoptica.com/wp-content/uploads/2022/11/paginaweb-nota5-producto-andina-031.jpg',
//                 description: 'Hay miradas que definen un legado. La nuestra es la firma que lo confirma',
//                 link: ''
//             },
//             {
//                 title: 'Luz y Sombra, Un Mismo Estilo',
//                 img: 'https://cdnx.jumpseller.com/red-de-accesorioos/image/37488276/WhatsApp_Image_2023-07-10_at_4.19.20_PM__1_.jpeg?1689029305',
//                 description: 'Un estilo que fluye sin interrupciones, adaptándose a la velocidad de la luz y de tu vida',
//                 link: ''
//             },
//             {
//                 title: 'El Color de lo Instantáneo',
//                 img: 'https://gv-brxm.imgix.net/binaries/_ht_1727867293709/content/gallery/es-optica2000/gallery/other-pages/transitions/gens-image.jpeg?fit=fillmax&w=2160&h=1874&q=50&auto=format',
//                 description: 'La tecnología se convierte en autoexpresión. Elegí tu tono y definí tu mundo a la velocidad de la luz',
//                 link: ''
//             },
//             {
//                 title: 'Anatomía de la Visión Futura',
//                 img: 'https://about.fb.com/ltam/wp-content/uploads/sites/14/2024/09/461276718_1636722540593891_4494012770455415545_n.png?fit=1920%2C1080',
//                 description: 'La ingeniería de lo invisible. Una sinfonía de microtecnología para una experiencia mágicamente natural',
//                 link: ''
//             },
//         ]
//     },
//     {
//         titleSection: 'Estuches',
//         items: [
//             {
//                 title: 'Horizonte Infinito',
//                 img: 'https://phantom-marca-mx.unidadeditorial.es/7371e441531b736a6276bb6b7fa6dff8/resize/828/f/jpg/mx/assets/multimedia/imagenes/2023/06/15/16868023009689.jpg',
//                 description: 'Tu mundo es ahora un lienzo infinito, donde la realidad se reinventa con cada mirada',
//                 link: ''
//             },
//             {
//                 title: 'La Firma de un Visionario',
//                 img: 'https://visionyoptica.com/wp-content/uploads/2022/11/paginaweb-nota5-producto-andina-031.jpg',
//                 description: 'Hay miradas que definen un legado. La nuestra es la firma que lo confirma',
//                 link: ''
//             },
//             {
//                 title: 'Luz y Sombra, Un Mismo Estilo',
//                 img: 'https://cdnx.jumpseller.com/red-de-accesorioos/image/37488276/WhatsApp_Image_2023-07-10_at_4.19.20_PM__1_.jpeg?1689029305',
//                 description: 'Un estilo que fluye sin interrupciones, adaptándose a la velocidad de la luz y de tu vida',
//                 link: ''
//             },
//             {
//                 title: 'El Color de lo Instantáneo',
//                 img: 'https://gv-brxm.imgix.net/binaries/_ht_1727867293709/content/gallery/es-optica2000/gallery/other-pages/transitions/gens-image.jpeg?fit=fillmax&w=2160&h=1874&q=50&auto=format',
//                 description: 'La tecnología se convierte en autoexpresión. Elegí tu tono y definí tu mundo a la velocidad de la luz',
//                 link: ''
//             },
//             {
//                 title: 'Anatomía de la Visión Futura',
//                 img: 'https://about.fb.com/ltam/wp-content/uploads/sites/14/2024/09/461276718_1636722540593891_4494012770455415545_n.png?fit=1920%2C1080',
//                 description: 'La ingeniería de lo invisible. Una sinfonía de microtecnología para una experiencia mágicamente natural',
//                 link: ''
//             },
//         ]
//     },
//     {
//         titleSection: 'Maquinas',
//         items: [
//             {
//                 title: 'Horizonte Infinito',
//                 img: 'https://phantom-marca-mx.unidadeditorial.es/7371e441531b736a6276bb6b7fa6dff8/resize/828/f/jpg/mx/assets/multimedia/imagenes/2023/06/15/16868023009689.jpg',
//                 description: 'Tu mundo es ahora un lienzo infinito, donde la realidad se reinventa con cada mirada',
//                 link: ''
//             },
//             {
//                 title: 'La Firma de un Visionario',
//                 img: 'https://visionyoptica.com/wp-content/uploads/2022/11/paginaweb-nota5-producto-andina-031.jpg',
//                 description: 'Hay miradas que definen un legado. La nuestra es la firma que lo confirma',
//                 link: ''
//             },
//             {
//                 title: 'Luz y Sombra, Un Mismo Estilo',
//                 img: 'https://cdnx.jumpseller.com/red-de-accesorioos/image/37488276/WhatsApp_Image_2023-07-10_at_4.19.20_PM__1_.jpeg?1689029305',
//                 description: 'Un estilo que fluye sin interrupciones, adaptándose a la velocidad de la luz y de tu vida',
//                 link: ''
//             },
//             {
//                 title: 'El Color de lo Instantáneo',
//                 img: 'https://gv-brxm.imgix.net/binaries/_ht_1727867293709/content/gallery/es-optica2000/gallery/other-pages/transitions/gens-image.jpeg?fit=fillmax&w=2160&h=1874&q=50&auto=format',
//                 description: 'La tecnología se convierte en autoexpresión. Elegí tu tono y definí tu mundo a la velocidad de la luz',
//                 link: ''
//             },
//             {
//                 title: 'Anatomía de la Visión Futura',
//                 img: 'https://about.fb.com/ltam/wp-content/uploads/sites/14/2024/09/461276718_1636722540593891_4494012770455415545_n.png?fit=1920%2C1080',
//                 description: 'La ingeniería de lo invisible. Una sinfonía de microtecnología para una experiencia mágicamente natural',
//                 link: ''
//             },
//         ]
//     }
// ]

export const NewsCards = () => {
    const [error, setError] = useState<string | null>(null)
    // const [isLoading, setIsLoading] = useState(true);
    const [news, setNews] = useState<section[]>()

    useEffect(() => {
        const getData = async () => {
            // setIsLoading(true)
            try {
                const { data } = await axiosInstance.get('/catalogos/novedades')

                if (data?.error) {
                    setError(`Error al obtener las novedades: ${data.message}, intente de nuevo `);
                    return;
                }
                setNews(data?.result || []);


            } catch (error) {
                setError(`Error al obtener las novedades dfgsdfg: ${error}, intente de nuevo `)
            } finally {
                // setIsLoading(false)
            }
        }
        getData()
    }, [])

    return (
        <div className="w-full flex flex-col gap-5">
            {error && <ErrorComponent msgError={error} isError={!!error} />}
            {
                !error && news?.map((item, index) => (
                    <div key={index} className={clsx("w-full px-5 py-5", item.titleSection ? " border-t-2 border-gray-300 scrollAnimation" : "")}>
                        {item.titleSection && <h2 className="text-4xl font-bold">{item.titleSection}</h2>}

                        <div className="w-full py-4 mt-6">
                            <CarouselSectionNews items={item.items} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
