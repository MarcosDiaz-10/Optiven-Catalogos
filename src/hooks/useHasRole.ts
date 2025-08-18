import { useAuthStore } from './store/AuthStore';

export const useHasRole = (requiredRoles: string[]) => {
    const { rol } = useAuthStore((state) => (state.user)) ?? { usuario: '', rol: '' };

    if (!rol) {
        return false;
    }
    const rolesToCheck = Array.isArray(requiredRoles) ? requiredRoles : [];
    return rolesToCheck.includes(rol);
};