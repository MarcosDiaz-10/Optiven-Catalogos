
'use client';

import { useAuthStore } from '@/hooks/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useHasRole } from '@/hooks/useHasRole';

const ProtectedRoute = ({ children, requiredRoles }: Readonly<{
    children: React.ReactNode;
    requiredRoles: string[];
}>) => {

    const isAuthenticated = useAuthStore((state) => (state.isAuthenticated));
    const isLoading = useAuthStore((state) => (state.isLoading));
    const hasRequiredRole = useHasRole(requiredRoles);
    const router = useRouter();

    useEffect(() => {
        // 1. Esperamos a que la rehidratación desde localStorage termine
        if (isLoading) {
            return;
        }

        // 2. Si no está autenticado, redirigimos al login
        if (!isAuthenticated) {
            router.push('/');
            return;
        }

        // 3. Si se requieren roles y el usuario no los tiene, redirigimos
        if (requiredRoles && !hasRequiredRole) {
            router.push('/unauthorized');
        }
    },);

    // Mientras carga, mostramos un loader para evitar parpadeos o contenido incorrecto
    if (isLoading) {
        return <div>Cargando sesión...</div>;
    }

    // Si está autenticado y tiene los permisos, mostramos el contenido protegido
    if (isAuthenticated && hasRequiredRole) {
        return <>{children}</>;
    }
    console.log(isAuthenticated)
    // En otros casos (mientras redirige), no mostrar nada
    return null;
};

export default ProtectedRoute;