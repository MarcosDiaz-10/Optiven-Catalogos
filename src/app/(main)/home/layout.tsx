import ProtectedRoute from "@/components/features/auth/ProtectedRoutes";
import { NavBar } from "@/components/features/home/NavBar";
import { unstable_ViewTransition as ViewTransition } from "react";


export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ProtectedRoute requiredRoles={['ADMIN', 'USER']}>
                <div>
                    <NavBar />
                </div>
                <ViewTransition>
                    <div className="pt-12 h-min-screen" >{children}</div>
                </ViewTransition>
            </ProtectedRoute>
        </>
    );
}
