import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchComponent } from "./SearchComponent"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
export const NavBar = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-30 bg-[#060317] p-2 grid grid-cols-[1fr_2fr_1fr]">
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="/icon.jpg" alt="Optiven Catalogos" />
                    <AvatarFallback>Optiven Catalogos Img</AvatarFallback>
                </Avatar>
                <div className="text-gray-300">
                    <h1>Optiven Catalogos</h1>
                </div>
            </div>
            <div >
                <SearchComponent />
            </div>
            <div className="text-gray-300 flex justify-end items-center gap-5">
                <Button className="bg-gray-700 text-gray-300 hover:bg-gray-900 hover:text-gray-100">Ver Catálogos</Button>
                <Button className="bg-gray-700 text-gray-300 hover:bg-gray-900 hover:text-gray-100"><LogOut size={20} /></Button>
            </div>

        </div>
    )
}
