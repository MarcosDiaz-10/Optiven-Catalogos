import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar"
import { BookImage, FileSliders, House, LogOut, ShieldUser } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/hooks/store/AuthStore"
import RoleGuard from "../auth/RoleGuard"

const items = [
    {
        title: "Pantalla principal",
        url: "/home",
        icon: House,
        onClick: () => { },

    },
    {
        title: "Ver Catálogos",
        url: "/home/buscar-catalogos",
        icon: BookImage,
        onClick: () => { },

    },
    {
        title: "Cerrar sesion",
        url: "/",
        icon: LogOut,
        onClick: () => { useAuthStore.getState().logout() }

    },

]

const itemsAdmin = [
    {
        title: "Gestión Catálogos",
        url: "/home/gestion-catalogos",
        icon: ShieldUser,
        onClick: () => { },

    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent className="gap-1">
                <SidebarGroup className="pb-0">
                    <SidebarTrigger />
                </SidebarGroup>
                <SidebarGroup >
                    <SidebarGroupLabel>Catalogos</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} onClick={item.onClick} >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup >
                    <RoleGuard requiredRoles={['ADMIN']}>
                        <SidebarGroupLabel>Administrador</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {itemsAdmin.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url} onClick={item.onClick} >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </RoleGuard>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar >
    )
}