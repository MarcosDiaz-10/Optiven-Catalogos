import { VolverButton } from "@/components/features/catalogos/VolverButton";
import { Button } from "@/components/ui/button";
import { unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";


export default async function CatalogoLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ idProveedor: string; idCatalogo: string }>;
}>) {
    const { idCatalogo } = await params;


    return (
        <div className="flex flex-col w-full">
            <div className="z-5 shadow-[0px_12px_14px_0px_#bab9b9] p-10">
                <div className="w-full justify-center items-center ">
                    <VolverButton />
                </div>
                <div className="grid grid-cols-[1.5fr_.5fr] w-full    ">
                    <div className="flex flex-col  items-start gap-15 pt-15 w-full h-full ">

                        <h1 className="  flex items-center">
                            <p className="text-3xl font-bold mr-2 flex items-center">{idCatalogo}: </p>
                            <p className="text-3xl italic font-semibold flex items-center">Monturas Oftalmicas marca SUGAR Colección 2023</p>
                        </h1>
                        <div className="grid grid-cols-2  gap-y-5 items-end justify-between w-full">
                            <div className="flex gap-2 text-lg "><p className="font-bold">Representante comercial:</p> DISTRIBUIDORA SVG F.P</div>
                            <div className="flex gap-2 text-lg"><p className="font-bold">Telefono:</p> +58 4243840103</div>
                            <div className="flex gap-2 text-lg"><p className="font-bold">Marca:</p> SUGAR</div>
                            <div className="flex gap-2 text-lg"><p className="font-bold">Whatsapp:</p> +58 4243840103</div>
                            <a href="http://www.sugar.com" target="_blank" className=" flex gap-2 text-lg ">
                                <p className="font-bold">Pagina Web:</p>
                                <p className="decoration-2 underline decoration-gray-500 bg-gray-100 py-1 px-2 rounded hover:text-blue-700 hover:decoration-blue-700">
                                    www.sugar.com
                                </p>
                            </a>
                            <div className="flex gap-2 text-lg"><p className="font-bold">Instagram:</p> @sugar</div>
                            <div className="flex gap-2 text-lg"><p className="font-bold">Email:</p> web@gmail.com</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 justify-end items-center w-full h-full">
                        <ViewTransition name={idCatalogo}>
                            <Image src="/LOGO_CATALOGO_AXEL.jpg" alt="Logo Catalogo Axel" className="rounded-4xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] w-[250px] h-[300px] z-0" width={1000} height={1000} />
                        </ViewTransition>
                        <div className="w-full flex justify-center">
                            <Button className="w-[70%] py-3 text-lg  bg-[#060317]  cursor-pointer">Hacer Pedido</Button>
                        </div>
                    </div>
                </div>
            </div>
            <section className="w-full  ">
                {children}
            </section>
        </div>
    );
}
