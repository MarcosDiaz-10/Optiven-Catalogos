import { NavBar } from "@/components/features/home/NavBar";


export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            <div>{children}</div>
        </>
    );
}
