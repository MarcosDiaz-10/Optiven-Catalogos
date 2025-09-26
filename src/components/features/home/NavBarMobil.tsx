import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { Suspense } from "react";
import { SearchComponent } from "./SearchComponent";
function SearchBarFallback() {
    return <>placeholder</>
}
export default function NavBarMobil() {
    return (
        <div className="fixed top-0 left-0 w-full z-30 bg-[#060317] p-2 grid grid-cols-[1fr_3fr_1fr]">

            <div className="flex items-center">
                <SidebarTrigger className="text-white" />

            </div>
            <div >
                <Suspense fallback={<SearchBarFallback />}>
                    <SearchComponent />
                </Suspense>
            </div>
            <div className="flex items-center gap-2 justify-end">
                <Link href='/home' className="flex items-center gap-2 ">
                    <Avatar>
                        <AvatarImage src={'http://optivenhost.net/catalogos/icon.jpg'} alt="Optiven Catalogos" />
                        <AvatarFallback>Optiven Catalogos Img</AvatarFallback>
                    </Avatar>

                </Link>
            </div>


        </div>
    )
}
