'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import BASE_URL from "@/lib/getUrlEnv";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@radix-ui/react-label";
import { Building, MapPin, Package, Send, ShoppingCart, User } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

interface DialogEnviarEmailType {
    isOrderModalOpen: boolean,
    setIsOrderModalOpen: (val: boolean) => void,
    setError: (val: string | null) => void,
    nombreCatalogo: string,
    correoEnvio: string
}

const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email('Error el correo no es valido'),
    telefono: z.string().min(10, 'Numero de telefono no valido'),
    cargo: z.string(),
    nombreEmpresa: z.string().min(1),
    dir: z.string().min(1),
    ciudad: z.string().min(1),
    cantidadEstimada: z.string().min(1),
    estado: z.string().min(1),
    codigoPostal: z.string(),
    textProducto: z.string().min(1),
    comentarios: z.string(),
    metodoContacto: z.string()
})

export default function DialogEnviarEmail({ isOrderModalOpen, setIsOrderModalOpen, nombreCatalogo, setError, correoEnvio }: DialogEnviarEmailType) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            telefono: '',
            cargo: '',
            nombreEmpresa: '',
            dir: '',
            ciudad: '',
            estado: '',
            cantidadEstimada: '',
            codigoPostal: '',
            textProducto: '',
            comentarios: '',
            metodoContacto: '',
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setError(null)
        const formData = new FormData();
        const {
            username,
            email,
            telefono,
            cargo,
            nombreEmpresa,
            dir,
            ciudad,
            estado,
            cantidadEstimada,
            codigoPostal,
            textProducto,
            comentarios,
            metodoContacto
        } = values
        const body = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Pedido</title>
            <style>
                /* Estilos generales para el cuerpo del correo */
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    font-family: Arial, sans-serif;
                }
                /* Contenedor principal */
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                }
                /* Encabezado */
                .header {
                    background-color: #4A90E2; /* Un color azul similar al de los íconos */
                    color: #ffffff;
                    padding: 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                /* Contenido principal */
                .content {
                    padding: 20px 30px;
                    color: #333333;
                }
                /* Estilos para las secciones de información */
                .section {
                    margin-bottom: 20px;
                    border-bottom: 1px solid #eeeeee;
                    padding-bottom: 15px;
                }
                .section:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                }
                .section-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #4A90E2;
                    margin-bottom: 15px;
                }
                /* Estilos para los pares de datos (etiqueta y valor) */
                .data-pair {
                    margin-bottom: 10px;
                }
                .data-label {
                    font-weight: bold;
                    color: #555555;
                }
                .data-value {
                    color: #333333;
                }
                /* Estilos para el pie de página */
                .footer {
                    background-color: #f4f4f4;
                    color: #888888;
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <!-- Se usan tablas para la estructura principal para máxima compatibilidad con clientes de correo -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4;">
                <tr>
                    <td align="center" style="padding: 20px;">
                        <table class="container" border="0" cellspacing="0" cellpadding="0">
                            <!-- Fila del Encabezado -->
                            <tr>
                                <td class="header">
                                    <h1>Nuevo Pedido Recibido</h1>
                                    <p style="margin: 5px 0 0; font-size: 14px;">${nombreCatalogo}</p>
                                </td>
                            </tr>
                            <!-- Fila del Contenido -->
                            <tr>
                                <td class="content">
                                    <!-- Sección de Información Personal -->
                                    <div class="section">
                                        <h2 class="section-title">Información Personal</h2>
                                        <div class="data-pair">
                                            <span class="data-label">Nombre Completo:</span>
                                            <span class="data-value">${username}</span>
                                        </div>
                                        <div class="data-pair">
                                            <span class="data-label">Correo Electrónico:</span>
                                            <span class="data-value">${email}</span>
                                        </div>
                                        <div class="data-pair">
                                            <span class="data-label">Teléfono:</span>
                                            <span class="data-value">${telefono}</span>
                                        </div>
                                        <div class="data-pair">
                                            <span class="data-label">Cargo/Posición:</span>
                                            <span class="data-value">${cargo}</span>
                                        </div>
                                    </div>
                                    <!-- Sección de Información de la Empresa -->
                                    <div class="section">
                                        <h2 class="section-title">Información de la Empresa</h2>
                                        <div class="data-pair">
                                            <span class="data-label">Nombre de la Empresa/Óptica:</span>
                                            <span class="data-value">${nombreEmpresa}</span>
                                        </div>
                                    </div>
                                    <!-- Sección de Dirección de Entrega -->
                                    <div class="section">
                                        <h2 class="section-title">Dirección de Entrega</h2>
                                        <div class="data-pair">
                                            <span class="data-label">Dirección Completa:</span>
                                            <span class="data-value">${dir}</span>
                                        </div>
                                        <div class="data-pair">
                                            <span class="data-label">Ciudad:</span>
                                            <span class="data-value">${ciudad}</span>
                                        </div>
                                        <div class="data-pair">
                                            <span class="data-label">Estado:</span>
                                            <span class="data-value">${estado}</span>
                                        </div>
                                        <div class="data-pair">
                                            <span class="data-label">Código Postal:</span>
                                            <span class="data-value">${codigoPostal}</span>
                                        </div>
                                    </div>
                                    <!-- Sección de Detalles del Pedido -->
                                    <div class="section">
                                        <h2 class="section-title">Detalles del Pedido</h2>
                                        <div class="data-pair">
                                            <span class="data-label">Cantidad Estimada:</span>
                                            <span class="data-value">${cantidadEstimada}</span>
                                        </div>
                                        <div class="data-pair">
                                            <span class="data-label">Método de Contacto Preferido:</span>
                                            <span class="data-value">${metodoContacto}</span>
                                        </div>
                                        <div class="data-pair">
                                            <span class="data-label">Productos Específicos de Interés:</span>
                                            <p class="data-value" style="margin-top: 5px;">${textProducto}</p>
                                        </div>
                                        <div class="data-pair">
                                            <span class="data-label">Comentarios Adicionales:</span>
                                            <p class="data-value" style="margin-top: 5px;">${comentarios}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <!-- Fila del Pie de Página -->
                            <tr>
                                <td class="footer">
                                    Este es un correo generado automáticamente. Por favor, no respondas a este mensaje.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `

        const requestBody = {
            para: correoEnvio,
            asunto: `Pedido de catalogo ${nombreCatalogo}`,
            cuerpo: body

        }

        formData.append('data', JSON.stringify(requestBody))

        try {
            const response = await fetch(BASE_URL + '/mail/mails', {
                method: 'POST',
                body: formData,
            });

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     setError(`Error: ${errorData.message}`)
            //     throw new Error(errorData.message || 'Error al subir el catálogo.');
            // }
            const data = await response.json()
            if (data?.error) {
                setError(`Error: ${data.message}`)
                return;
            }


        } catch (error: any) {
            console.error(error);
            setError(`Error: ${error.message}`);
        }

    }
    return (
        <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ShoppingCart className="h-5 w-5 text-green-600" />
                        Realizar Pedido - {nombreCatalogo}
                    </DialogTitle>
                    <DialogDescription>
                        Completa tus datos para enviar la solicitud de pedido directamente al distribuidor.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >




                        <div className="space-y-6 py-4">
                            {/* Información Personal */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b">
                                    <User className="h-4 w-4 text-blue-600" />
                                    <h3 className="font-semibold text-slate-900">Información Personal</h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}

                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="customerName">Nombre Completo *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="customerName"
                                                        {...field}
                                                        placeholder="Tu nombre completo"
                                                        className="rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (

                                            <FormItem>
                                                <FormLabel htmlFor="customerEmail">Correo Electrónico *</FormLabel>
                                                <FormControl>

                                                    <Input
                                                        id="customerEmail"
                                                        type="email"
                                                        {...field}
                                                        placeholder="tu@email.com"
                                                        className="rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="telefono"
                                        render={({ field }) => (

                                            <FormItem>
                                                <FormLabel htmlFor="customerPhone">Teléfono *</FormLabel>
                                                <FormControl>

                                                    <Input

                                                        {...field}

                                                        id="customerPhone"

                                                        placeholder="+58 424-123-4567"
                                                        className="rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cargo"
                                        render={({ field }) => (

                                            <FormItem>
                                                <FormLabel htmlFor="position">Cargo/Posición </FormLabel>
                                                <FormControl>

                                                    <Input

                                                        {...field}
                                                        id="position"

                                                        placeholder="Ej: Optometrista, Gerente"
                                                        className="rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                            </div>

                            {/* Información de la Empresa */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b">
                                    <Building className="h-4 w-4 text-blue-600" />
                                    <h3 className="font-semibold text-slate-900">Información de la Empresa</h3>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="nombreEmpresa"
                                    render={({ field }) => (

                                        <FormItem>
                                            <FormLabel htmlFor="company">Nombre de la Empresa/Óptica *</FormLabel>
                                            <FormControl>

                                                <Input

                                                    {...field}
                                                    id="company"
                                                    placeholder="Nombre de tu óptica o empresa"
                                                    className="rounded-lg"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            {/* Información de Entrega */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b">
                                    <MapPin className="h-4 w-4 text-blue-600" />
                                    <h3 className="font-semibold text-slate-900">Dirección de Entrega</h3>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="dir"
                                    render={({ field }) => (

                                        <FormItem>
                                            <FormLabel htmlFor="address">Dirección Completa *</FormLabel>
                                            <FormControl>

                                                <Input

                                                    {...field}
                                                    id="address"

                                                    placeholder="Calle, número, sector"
                                                    className="rounded-lg"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <div className="grid md:grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="ciudad"
                                        render={({ field }) => (

                                            <FormItem>
                                                <FormLabel htmlFor="city">Ciudad *</FormLabel>
                                                <FormControl>

                                                    <Input

                                                        {...field}
                                                        id="city"

                                                        placeholder="Ciudad"
                                                        className="rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="estado"
                                        render={({ field }) => (

                                            <FormItem>
                                                <FormLabel htmlFor="state">Estado *</FormLabel>
                                                <FormControl>

                                                    <Input

                                                        {...field}
                                                        id="state"

                                                        placeholder="Estado"
                                                        className="rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="codigoPostal"
                                        render={({ field }) => (

                                            <FormItem>
                                                <FormLabel htmlFor="zipCode">Código Postal</FormLabel>
                                                <FormControl>

                                                    <Input

                                                        {...field}
                                                        id="zipCode"

                                                        placeholder="1234"
                                                        className="rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                            </div>

                            {/* Detalles del Pedido */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b">
                                    <Package className="h-4 w-4 text-blue-600" />
                                    <h3 className="font-semibold text-slate-900">Detalles del Pedido</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">


                                    <FormField
                                        control={form.control}
                                        name="cantidadEstimada"

                                        render={({ field }) => (

                                            <FormItem >
                                                <FormLabel htmlFor="estimatedQuantity">Cantidad Estimada</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className="rounded-lg">
                                                            <SelectValue placeholder="Cantidad aproximada" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1-10">1-10 unidades</SelectItem>
                                                            <SelectItem value="11-50">11-50 unidades</SelectItem>
                                                            <SelectItem value="51-100">51-100 unidades</SelectItem>
                                                            <SelectItem value="100+">Más de 100 unidades</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="metodoContacto"

                                        render={({ field }) => (

                                            <FormItem >
                                                <FormLabel htmlFor="estimatedQuantity">Método de Contacto preferido</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className="rounded-lg">
                                                            <SelectValue placeholder="Metodo preferido de contacto" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="correo">Correo</SelectItem>
                                                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                                            <SelectItem value="llamada">Llamada</SelectItem>

                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="textProducto"
                                        render={({ field }) => (

                                            <FormItem className=" md:col-span-2">
                                                <FormLabel htmlFor="specificProducts">Productos Específicos de Interés</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        id="specificProducts"
                                                        {...field}
                                                        placeholder="Ej: Monturas modelo AX1054, colores específicos, tallas..."
                                                        rows={3}
                                                        className="rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="comentarios"
                                        render={({ field }) => (

                                            <FormItem className="md:col-span-2">
                                                <FormLabel htmlFor="comments">Comentarios Adicionales</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        id="comments"
                                                        {...field}
                                                        placeholder="Cualquier información adicional sobre tu pedido..."
                                                        rows={3}
                                                        className="rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                </div>

                                {/* Preferencias de Contacto */}
                                {/* <div className="space-y-4 w-full">
                                    



                                </div> */}
                            </div>
                        </div>
                        <DialogFooter className="gap-2">
                            <Button variant="outline" onClick={() => setIsOrderModalOpen(false)}>
                                Cancelar
                            </Button>
                            <Button

                                className="bg-green-600 hover:bg-green-700"
                            >
                                <Send className="h-4 w-4 mr-2" />
                                Enviar Pedido
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}
