import SectionSliceNovedades from "@/components/features/home/SectionSliceNovedades";
import { NewsCards } from "@/components/features/home/NewsCards";



export default function AppHome() {



    return (
        <div className="w-full flex flex-col h-full gap-2">
            <section className="relative w-full h-[100vh] overflow-hidden">
                <SectionSliceNovedades />
                <div className="absolute bottom-0 left-0 w-full h-[35%] bg-gradient-to-t from-background from-10% to-transparent pointer-events-none" />
            </section>
            <section className="absolute top-115 w-full h-full">
                <NewsCards />
            </section>
        </div >
    )
}
