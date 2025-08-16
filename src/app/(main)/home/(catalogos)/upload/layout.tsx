import ProtectedRoute from "@/components/features/auth/ProtectedRoutes";

export default function UploadLayout({
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
