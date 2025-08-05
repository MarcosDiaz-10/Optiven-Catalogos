'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { news } from "@/types"
import clsx from "clsx"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"


export const SliceComponent = ({ elements, height }: { elements: news[], height: string }) => {
    const autoplayPlugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
    )
    console.log(elements)
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

                            <Link href={element.link}>
                                <div className="h-full w-full"><Image width={400} height={400} className="h-full w-full object-cover " src={element?.imagenportada || ''} alt="" /></div>
                            </Link>

                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-[20%] -translate-y-1/2 bg-white" />
            <CarouselNext className="absolute right-2 top-[20%] -translate-y-1/2 bg-white" />
        </Carousel >
    )
}
