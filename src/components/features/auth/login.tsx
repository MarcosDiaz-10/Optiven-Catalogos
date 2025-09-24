
'use client'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import axiosInstance from "@/lib/api";
import { useAuthStore } from "@/hooks/store/AuthStore";


const formSchema = z.object({
    codigoUser: z.string().min(1, "El codigo de usuario es requerido"),
    password: z.string().min(1, "La contraseña es requerida"),
});

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            codigoUser: "",
            password: "",
        },
    })

    const [error, setError] = useState(false)
    const [msg, setMsgError] = useState('')
    const [onSubmitLoading, setOnSubmitLoading] = useState(false)
    const login = useAuthStore(state => state.login)
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/home')
        }
    }, [isAuthenticated, router])
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setOnSubmitLoading(true)
        setError(false)
        setMsgError('')
        try {

            const res = await axiosInstance.post('/users/login', { username: data.codigoUser, password: data.password })

            const { error: errorResp, msg: msgResp, access_token, refresh_token } = await res.data

            if (errorResp) {
                setError(true)
                setMsgError(msgResp)
                return
            }


            login(access_token, refresh_token)
            localStorage.setItem('refresh_token_catalogos', refresh_token)
            router.push('/home')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(true)
            console.log(error)
            const { message, response } = error
            console.log(response?.data?.Error)
            const messageError = (response?.data?.Error) ? response?.data.msg : message
            setMsgError(messageError)
        } finally {
            setOnSubmitLoading(false)
        }


    }
    return (


        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Inicia sesion en tu cuenta</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Ingresa tu codigo de usuario y tu contraseña
                    </p>
                    {
                        (error)
                            ? (
                                <Alert variant="destructive" className="bg-red-100 flex justify-center w-full items-center gap-2">
                                    <div>
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        {msg}
                                    </AlertDescription>
                                </Alert>)
                            : null
                    }
                </div>
                <div className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="codigoUser"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Codigo de usuario</FormLabel>
                                <FormControl>
                                    <Input
                                        id="codigoUser"
                                        placeholder="optica-x"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="********"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit" disabled={onSubmitLoading}>
                        {onSubmitLoading ? 'Cargando...' : 'Login'}
                    </Button>
                </div>
                <div className="text-center text-sm">
                    No tienes cuenta? Comunicate con nosotros.
                </div>
                <div className="text-center text-sm text-muted-foreground">
                    Ver 0.7.0
                </div>
            </form>
        </Form>


    );
}
