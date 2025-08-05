import clsx from "clsx"
import { Skeleton } from "./ui/skeleton"

export const LoadingComponent = ({ className = 'w-full flex items-center justify-center mt-5', height, width = 'w-[80%]', bg = "bg-gray-200" }: { className?: string, height: string, width?: string, bg?: string }) => {
    return (
        <div className={clsx(className, height)}>
            <Skeleton className={clsx(width, height, bg)} />
        </div>
    )
}
