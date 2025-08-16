'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchComponent } from "./SearchComponent"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { Suspense } from 'react'
import Link from "next/link"
import RoleGuard from "../auth/RoleGuard"
import { useAuthStore } from "@/hooks/store/AuthStore"
function SearchBarFallback() {
    return <>placeholder</>
}
export const NavBar = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-30 bg-[#060317] p-2 grid grid-cols-[1fr_2fr_1fr]">
            <div className="flex items-center gap-2">
                <Link href='/home' className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={'/icon.jpg'} alt="Optiven Catalogos" />
                        <AvatarFallback>Optiven Catalogos Img</AvatarFallback>
                    </Avatar>
                    <div className="text-gray-300">
                        <h1>Optiven Catalogos</h1>
                    </div>
                </Link>
            </div>
            <div >
                <Suspense fallback={<SearchBarFallback />}>
                    <SearchComponent />
                </Suspense>
            </div>
            <div className="text-gray-300 flex justify-end items-center gap-5">
                <RoleGuard requiredRoles={['admin']}>
                    <Button className="bg-gray-700 text-gray-300 hover:bg-gray-900 hover:text-gray-100"><Link href='/home/gestion-catalogos'>Gestion Catalogos</Link></Button>
                </RoleGuard>

                <Button className="bg-gray-700 text-gray-300 hover:bg-gray-900 hover:text-gray-100"><Link href='/home/buscar-catalogos'>Ver Catálogos</Link></Button>
                <Button className="bg-gray-700 text-gray-300 hover:bg-gray-900 hover:text-gray-100" onClick={() => { useAuthStore.getState().logout() }}><Link href='/'><LogOut size={20} /></Link></Button>
            </div>

        </div>
    )
}
