import { NavBar } from "@/components/features/home/NavBar";
import { unstable_ViewTransition as ViewTransition } from "react";


export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <ViewTransition>
                <div className="pt-12 h-min-screen" >{children}</div>
            </ViewTransition>
        </>
    );
}
