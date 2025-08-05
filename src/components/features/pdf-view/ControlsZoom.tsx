import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useControls } from "react-zoom-pan-pinch";

export const ZoomControls = () => {
    const { zoomIn, zoomOut, setTransform, instance } = useControls();

    const onScaleChange = (newScaleArr: number[]) => {
        const newScale = newScaleArr[0]
        const { width, height } = instance.wrapperComponent?.getBoundingClientRect() ?? { width: 0, height: 0 }
        const { scale: currentScale, positionX, positionY } = instance.transformState;
        const centerX = width / 2;
        const centerY = height / 2;

        const contentPointX = (centerX - positionX) / currentScale;
        const contentPointY = (centerY - positionY) / currentScale;

        const newPositionX = centerX - contentPointX * newScale;
        const newPositionY = centerY - contentPointY * newScale;

        setTransform(newPositionX, newPositionY, newScale, 0);

    };

    return (
        <div className="flex items-center justify-center w-max gap-4">
            <Button className="w-auto h-auto p-2" onClick={() => zoomOut()}><ZoomOut size={48} /></Button>

            <Slider className="w-24" defaultValue={[1]} max={3} min={1} step={0.1} value={[instance.transformState.scale]} onValueChange={onScaleChange} />

            <Button className="w-auto h-auto p-2" onClick={() => zoomIn()}><ZoomIn size={48} /></Button>

        </div >
    );
};