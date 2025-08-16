import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'
import { persist, createJSONStorage } from 'zustand/middleware';
interface User {
    usuario: string;
    rol: string;
}


interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, refreshToken: string) => void;
    logout: () => void;
    setTokens: (accessToken: string) => void;
    setRefreshTokens: (refreshToken: string) => void;
    setIsLoading: (value: boolean) => void;
}

export const useAuthStore = create(
    persist<AuthState>(
        (set, get) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            rol: null,
            isLoading: true,
            refreshToken: null,
            login: (token, refreshToken) => {
                try {
                    const userData: { rol: string, sub: string } = jwtDecode(token)

                    set({ user: { usuario: userData?.sub, rol: userData?.rol }, accessToken: token, isAuthenticated: true, isLoading: false, refreshToken })
                } catch (error) {
                    console.error("Fallo al decodificar el token en el login", error);

                    get().logout();
                }
            },
            logout: () => {
                set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
            },
            setTokens: (accessToken) => {
                set({ accessToken });
            },
            setRefreshTokens: (refreshToken) => {
                set({ refreshToken })
            },
            setIsLoading: (value) => {
                set({ isLoading: value })
            }
        }),
        {
            name: 'auth-storage', // Clave única en localStorage
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                ...state
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    if (state.accessToken) {
                        try {
                            const decoded = jwtDecode(state.accessToken);
                            // Verificamos si el token ha expirado
                            if ((decoded.exp ?? Infinity) * 1000 > Date.now()) {
                                // Si el token es válido, reconstruimos el estado del usuario
                                state.isAuthenticated = true;
                            } else {
                                // Si el token ha expirado, lo limpiamos para forzar un nuevo login
                                state.accessToken = null;
                                state.refreshToken = null;
                            }
                        } catch (error) {
                            console.error("Fallo al rehidratar desde un token almacenado", error);
                            // Si el token es inválido, lo limpiamos
                            state.accessToken = null;
                            state.refreshToken = null;
                        }
                    }
                    // Marcamos la carga como completa para que la UI pueda renderizarse de forma segura
                    state.isLoading = false;
                }
            }
        }
    )
    ,

)