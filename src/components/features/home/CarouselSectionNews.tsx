import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CardHome } from "./CardHome"
import { news } from "@/types"
import clsx from "clsx"



export const CarouselSectionNews = ({ items }: { items: news[] }) => {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full">
            <CarouselContent>
                {
                    items.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/1 md:basis-1/4  h-full">
                            <CardHome title={item.titulo} description={item.descnove} img={item.imagenportada} link={item.link} />
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            {
                (
                    <>
                        <CarouselPrevious className={clsx("bg-white absolute left-2 top-1/2 -translate-y-1/2", items.length < 4 && "md:hidden")} />
                        <CarouselNext className={clsx("bg-white absolute right-2 top-1/2 -translate-y-1/2", items.length < 4 && "md:hidden")} />
                    </>
                )
            }
        </Carousel>
    )
}
