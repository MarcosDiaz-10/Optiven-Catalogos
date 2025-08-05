'use client'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const VolverButton = () => {
    const router = useRouter()
    const onReturn = () => {
        if (!document.startViewTransition) {
            router.back();
            return;
        }


        document.startViewTransition(() => {
            router.back();
        });
    }
    return (

        <Tooltip>
            <TooltipTrigger className="w-min px-4 py-2 rounded-lg bg-gray-100 text-black hover:bg-gray-200" onClick={onReturn}>
                <ArrowLeft size={20} />
            </TooltipTrigger>
            <TooltipContent>
                <p>Volver a la página anterior</p>
            </TooltipContent>
        </Tooltip>
    )
}
