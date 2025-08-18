'use client'
import { useAuthStore } from "@/hooks/store/AuthStore";
import axiosInstance from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginOptiven({ token }: { token: string }) {
    const router = useRouter()
    useEffect(() => {

        const login = async () => {
            try {
                console.log(token)
                const { data } = await axiosInstance.post('/users/login-optiven', { token });
                if (data.error) {
                    throw new Error(data.message);
                }
                const { access_token, refresh_token } = data;
                useAuthStore.getState().login(access_token, refresh_token)
                localStorage.setItem('refresh_token_catalogos', refresh_token)

                if (!document.startViewTransition) {
                    router.push('/home');
                    return;
                }


                document.startViewTransition(() => {
                    router.push('/home');
                });
                // Si la respuesta es exitosa, redirigir o mostrar un mensaje
            } catch (error) {
                router.push('/');
                console.error("Error al iniciar sesión:", error);
            }
        };

        login();

    }, [router, token])
    return (
        <div>Cargando...</div>
    )
}
