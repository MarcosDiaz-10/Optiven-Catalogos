import { NewsCards } from "@/components/features/home/NewsCards";
import { SliceComponent } from "@/components/features/home/SliceComponent";

const elements = [
    {
        isImage: false,
        link: "https://media.ray-ban.com/cms/resource/blob/1414844/2fbb35835f88063d3b985d41e46ebddc/rb-hp-balorama-hero-video-d-data.mp4",
    },
    {
        isImage: true,
        link: "https://media.oakley.com/cms/caas/v1/media/1856162/data/26853607ffcf4613704b43c9b268fd40/landscape_ratio1440x810/2600/us-indip-day-rx-fhr-d.jpg",
    },
    {
        isImage: false,
        link: "https://media.oakley.com/cms/caas/v1/media/1863180/data/4277574f22f5e554ea7c66a1fc98e0c6/ww-meta-hstn-announcement-fhr-d.mp4",
    },
]

export default function AppHome() {



    return (
        <div className="w-full flex flex-col h-full gap-2">
            <section className="relative w-full h-[100vh] overflow-hidden">
                <SliceComponent elements={elements} height="100vh" />
                <div className="absolute bottom-0 left-0 w-full h-[35%] bg-gradient-to-t from-background from-10% to-transparent pointer-events-none" />
            </section>
            <section className="absolute top-115 w-full h-full">
                <NewsCards />
            </section>
        </div >
    )
}
