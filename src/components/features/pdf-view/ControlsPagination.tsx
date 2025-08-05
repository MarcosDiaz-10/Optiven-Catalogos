import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const ControlsPagination = ({ onPrevPage, onNextPage, currentPage, numPages }: { onPrevPage: () => void; onNextPage: () => void; currentPage: number; numPages: number; }) => {
    const arrowButtonStyles = "cursor-pointer absolute top-1/2 -translate-y-1/2 flex justify-center items-center text-white bg-black/20 hover:bg-black/40 transition-colors rounded-full";


    return (
        <div className="flex w-full justify-end">
            <Button
                className={clsx(arrowButtonStyles, 'left-4 p-2 ')}
                onClick={onPrevPage}>
                <ArrowLeft size={48} />
            </Button>
            <span className="text-white">
                {
                    (currentPage !== 0 && (currentPage + 1) < numPages)
                        ? `Pagina: ${currentPage + 1}-${currentPage + 2} de ${numPages}`
                        : `Pagina: ${currentPage + 1} de ${numPages}`
                }
            </span>
            <Button
                className={clsx(arrowButtonStyles, 'right-4 p-2')}
                onClick={onNextPage}>
                <ArrowRight />
            </Button>
        </div>
    )
}
