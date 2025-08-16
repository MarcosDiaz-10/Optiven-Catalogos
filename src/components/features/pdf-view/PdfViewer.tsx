/* eslint-disable  */
// @ts-nocheck
'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import HTMLFlipBook from 'react-pageflip';
import { BASE_URL_FOR_STATIC_IMAGES_PDF, } from "@/constants";
import { useResposiveSize } from "@/hooks/useResposiveSize";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import BASE_URL from "@/lib/getUrlEnv";
import clsx from "clsx";
import { Slider } from "@/components/ui/slider"
import { ZoomControls } from "./ControlsZoom";
import { ControlsFullScreen } from "./ControlsFullScreen";
import { ControlsPagination } from "./ControlsPagination";
import { ErrorComponent } from "@/components/ErrorComponent";
import { LoadingComponent } from "@/components/LoadingComponent";
import Image from "next/image";
import axiosInstance from "@/lib/api";






const Page = forwardRef(({ pageNumber, dataUrl }: { pageNumber: number, dataUrl: string }, ref: any) => {

    return (

        <div className={
            clsx(
                "bg-white overflow-hidden z-40 relative",
                "after:content-[''] after:absolute after:inset-0 after:z-10 after:pointer-events-none",
                pageNumber % 2 === 0 ? 'after:bg-gradient-to-l after:from-[rgba(0,0,0,0.3)] after:via-[rgba(0,0,0,0.1)] after:via-3%  after:to-transparent after:to-10%  rounded-l-lg' : ' after:bg-gradient-to-r after:from-[rgba(0,0,0,0.3)] after:via-[rgba(0,0,0,0.1)] after:via-3%  after:to-transparent after:to-10% border-l border-gray-400 rounded-r-lg'
            )} ref={ref}>
            <div className="w-full h-full flex flex-col items-stretch justify-between">
                <div className="w-full h-full bg-contain bg-no-repeat bg-position-[50%] object-cover">
                    <Image loading="eager" src={dataUrl} width={1000} height={1000} alt={`Página ${pageNumber}`} style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="absolute bottom-[10px] left-0 w-full text-center z-20  text-[0.8em] text-[#050303]">{pageNumber}</div>
            </div>
        </div>


    );
});
Page.displayName = 'Page';




interface ImageBackend {
    url: string,
    numpagina: number
}
export const PdfViewer = ({ idProveedor, idCatalogo }: { idProveedor: string, idCatalogo: string }) => {
    const [images, setImages] = useState<(ImageBackend | null)[]>()
    const [currentPage, setCurrentPage] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [numPages, setNumPages] = useState(0)
    const bookRef = useRef<any>(null)
    const containerRef = useRef<any>(null)
    const [isZoomed, setIsZoomed] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [scale, setScale] = useState(1)

    const { size } = useResposiveSize({ targetRef: containerRef })



    useEffect(() => {


        const getData = async () => {
            setIsLoading(true)
            try {
                const { data } = await axiosInstance.get(`/catalogos/${idProveedor}/${idCatalogo}/images`)
                if (data?.error) throw new Error('Error con la conexion, intente de nuevo ')

                setImages(data?.result)
                setNumPages(data?.result?.length)

                setIsLoading(false)

            } catch (error) {
                setError('Error al obtener las paginas, intente de nuevo ')
            }
        }

        getData()


    }, [])

    useEffect(() => {
        const handleFullscreenChange = () => {

            setIsFullscreen(!!document.fullscreenElement);
        };


        document.addEventListener('fullscreenchange', handleFullscreenChange);


        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [])

    const onSliderChage = (value: any) => {
        const pageNumber = value[0]

        if (bookRef.current) {
            bookRef.current.pageFlip().turnToPage(pageNumber);

        }
    }


    const onFlip = useCallback((e: any) => {
        const newCurrentPage = e.data;
        setCurrentPage(newCurrentPage)

        setIsFlipping(false);


    }, [])

    const onPrevPage = () => {
        if (bookRef.current) {

            setIsFlipping(true);
            bookRef.current.pageFlip().flipPrev();
        }
    };

    const onNextPage = () => {
        if (bookRef.current) {
            setIsFlipping(true);
            bookRef.current.pageFlip().flipNext();

        }

    };
    const onTransform = (ref: any, state: any) => {
        setIsZoomed(state.scale > 1);
        setScale(state.scale)
    };

    const onToggleFullscreen = () => {

        if (!document.fullscreenElement) {

            containerRef.current?.requestFullscreen();
        } else {

            document.exitFullscreen();
        }
    };



    return (
        <>
            {isLoading && !!!error && <LoadingComponent width="w-[98%]" height="h-screen" />}
            {error && <ErrorComponent msgError={error} isError={!!error} />}
            {
                !isLoading && !error && (images?.length ?? 0) > 0 && (
                    <TransformWrapper
                        initialScale={1}
                        minScale={1}
                        // wheel={{
                        //     activationKeys: ['Control', 'Meta']
                        // }}
                        maxScale={3}
                        onTransformed={onTransform}
                        disabled={isFlipping}
                        panning={{
                            disabled: !isZoomed
                        }}
                    >

                        <div ref={containerRef} className="flex flex-col  h-full w-full   bg-gray-100 relative rounded-2xl">

                            <TransformComponent
                                wrapperStyle={{ width: '100%', height: '100%' }}
                                contentStyle={{ width: '100%', height: '100%' }}
                            >

                                <div className="flex flex-col h-full w-full   pt-15  items-center justify-center box-border">
                                    <div className={clsx('flex flex-col  pb-10 ', isFullscreen ? 'w-[90%] pt-0' : 'w-[95%]')}>
                                        <HTMLFlipBook
                                            style={{ willChange: 'transform' }}
                                            width={3000}
                                            height={3200}
                                            className=" m-0 rounded-lg "
                                            onFlip={onFlip}
                                            ref={bookRef}
                                            showCover={true}
                                            mobileScrollSupport={false}
                                            size="stretch"
                                            flippingTime={500}




                                        >
                                            {
                                                images?.map((image, index) => (
                                                    <Page key={image?.numpagina ?? index} dataUrl={image?.url} pageNumber={image?.numpagina ?? index} />
                                                ))
                                            }

                                        </HTMLFlipBook>



                                    </div>
                                </div>

                                <div className="absolute top-0 left-0 w-full h-full z-10" style={{ pointerEvents: isZoomed ? 'auto' : 'none' }} />
                            </TransformComponent>
                            <Slider defaultValue={[0]} bgSlider="bg-blue-900" max={numPages - 1} className="cursor-pointer pt-5" step={currentPage === 0 ? 1 : 2} value={[currentPage]} onValueChange={onSliderChage} min={0} />
                            <div className="flex w-full bg-gray-700 pt-4 pb-2 px-2 rounded-b-2xl items-center justify-between gap-5">
                                <ControlsPagination onPrevPage={onPrevPage} onNextPage={onNextPage} currentPage={currentPage} numPages={numPages} />
                                <div className="flex  gap-4 w-max">
                                    <ZoomControls />
                                    <ControlsFullScreen isFullscreen={isFullscreen} onToggleFullscreen={onToggleFullscreen} />
                                </div>
                            </div>
                        </div>
                    </TransformWrapper>
                )
            }

        </ >

    )
}
