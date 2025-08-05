'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import clsx from "clsx"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useRef } from "react"

interface element {
    isImage: boolean,
    link?: string

}


export const SliceComponent = ({ elements, height }: { elements: element[], height: string }) => {
    const autoplayPlugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
    )
    return (
        <Carousel
            plugins={[autoplayPlugin.current]}
            opts={
                {
                    align: "start",
                    loop: true,
                }
            }
        // onMouseEnter={() => autoplayPlugin.current?.stop()}
        // onMouseLeave={() => autoplayPlugin.current?.reset()}
        >
            <CarouselContent className={clsx("", `h-[${height}]`)}>
                {
                    elements.map((element, index) => (
                        <CarouselItem key={index} className={clsx("")}>
                            {
                                element.isImage
                                    ? (
                                        <div className="h-full w-full"><Image width={400} height={400} className="h-full w-full object-cover " src={element?.link || ''} alt="" /></div>
                                    )
                                    : (
                                        <div className="h-full w-full">
                                            <video className="h-full w-full object-cover " loop playsInline preload="auto" autoPlay muted>
                                                <source src={element.link} type="video/mp4" />
                                            </video>
                                        </div>
                                    )
                            }
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-[20%] -translate-y-1/2 bg-white" />
            <CarouselNext className="absolute right-2 top-[20%] -translate-y-1/2 bg-white" />
        </Carousel >
    )
}
