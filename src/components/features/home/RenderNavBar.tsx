'use client'

import { useIsMobile } from "@/hooks/use-mobile"
import { AppSidebar } from "./AppSidebar"
import { NavBar } from "./NavBar"
import NavBarMobil from "./NavBarMobil"
export default function RenderNavBar() {
    const isMobile = useIsMobile()
    return (
        <div>
            {
                !isMobile
                    ? <NavBar />
                    : <>
                        <NavBarMobil />
                        <AppSidebar />

                    </>
            }

        </div>
    )
}
