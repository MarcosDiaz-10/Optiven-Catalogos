import ProtectedRoute from "@/components/features/auth/ProtectedRoutes";

export default function GestionCatalogosLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ProtectedRoute requiredRoles={['ADMIN']}>
                <div >{children}</div>
            </ProtectedRoute>
        </>
    );
}
