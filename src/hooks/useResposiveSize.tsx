"use client"

import { useLayoutEffect, useState } from "react"


export const useResposiveSize = ({ targetRef }: { targetRef: React.RefObject<HTMLElement> }) => {
    const [size, setSize] = useState({
        width: 0,
        height: 0
    })


    useLayoutEffect(() => {

        if (!targetRef.current) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0]
            setSize({
                width: entry.contentRect.width,
                height: entry.contentRect.height
            })
        })
        observer.observe(targetRef.current)
        return () => {
            observer.disconnect()
        };
    }, [targetRef])


    return {
        size
    }
}
