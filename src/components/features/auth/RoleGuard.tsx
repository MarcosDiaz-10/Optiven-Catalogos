// components/auth/RoleGuard.js
'use client';

import { useHasRole } from '@/hooks/useHasRole';
import { useAuthStore } from '@/hooks/store/AuthStore';

const RoleGuard = ({ children, requiredRoles }: { children: React.ReactNode; requiredRoles: string[] }) => {
    const isLoading = useAuthStore((state) => state.isLoading);
    const hasRequiredRole = useHasRole(requiredRoles);

    // No renderizar nada hasta que sepamos el estado de autenticación
    if (isLoading) {
        return null;
    }

    if (!hasRequiredRole) {
        return null;
    }

    return <>{children}</>;
};

export default RoleGuard;