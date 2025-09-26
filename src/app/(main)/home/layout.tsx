
import ProtectedRoute from "@/components/features/auth/ProtectedRoutes";
import { AppSidebar } from "@/components/features/home/AppSidebar";
import { NavBar } from "@/components/features/home/NavBar";
import RenderNavBar from "@/components/features/home/RenderNavBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { unstable_ViewTransition as ViewTransition } from "react";


export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ProtectedRoute requiredRoles={['ADMIN', 'USER']}>
                <SidebarProvider>
                    <RenderNavBar />
                    <ViewTransition>
                        <div className="pt-12 h-min-screen" >{children}</div>
                    </ViewTransition>
                </SidebarProvider>
            </ProtectedRoute >
        </>
    );
}
