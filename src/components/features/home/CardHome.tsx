import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"


export const CardHome = ({ title, description, img, link }: { title: string, description: string, img: string, link: string }) => {
    return (
        <Card className="cursor-pointer gap-2 flex flex-col h-[500px]" >
            <CardHeader className="">
                <CardTitle className="text-2xl font-semibold ">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex w-full flex-col items-center gap-3 px-3 flex-grow">
                <div className=" w-full flex items-center justify-center h-full rounded flex-grow overflow-hidden">
                    <Image src={img} alt="" width={400} height={400} className="object-cover rounded  w-full h-full" />
                </div>
                <div className="flex justify-start w-full">

                    <CardDescription className="text-start text-gray-500">{description}</CardDescription>
                </div>
                <div className="w-full flex items-center justify-end pt-3">
                    <Button className="bg-gray-700 text-gray-300 hover:bg-gray-900 hover:text-gray-100">Ver Catálogo</Button>
                </div>

            </CardContent>
        </Card>
    )
}
