import { Button } from "@/components/ui/button"
import { Expand, Shrink } from "lucide-react"

export const ControlsFullScreen = ({ onToggleFullscreen, isFullscreen }: { onToggleFullscreen: () => void, isFullscreen: boolean }) => {
    return (
        <Button onClick={onToggleFullscreen}>
            {
                isFullscreen ? <Shrink /> : <Expand />
            }
        </Button>
    )
}
