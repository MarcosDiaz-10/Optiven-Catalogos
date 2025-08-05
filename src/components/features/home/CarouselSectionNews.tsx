import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CardHome } from "./CardHome"
import { news } from "@/types"



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
                        <CarouselItem key={index} className="basis-1/4 h-full">
                            <CardHome title={item.titulo} description={item.descnove} img={item.imagenportada} link={item.link} />
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            {
                items.length > 4 && (
                    <>
                        <CarouselPrevious className="bg-white absolute left-2 top-1/2 -translate-y-1/2" />
                        <CarouselNext className="bg-white absolute right-2 top-1/2 -translate-y-1/2" />
                    </>
                )
            }
        </Carousel>
    )
}
