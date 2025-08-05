import { LayoutCatalogoUi } from "@/components/features/catalogos/LayoutCatalogoUi";



export default async function CatalogoLayout({
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ idProveedor: string; idCatalogo: string }>;
}>) {
    const { idProveedor, idCatalogo } = await params;



    return (
        <div className="w-full h-full">
            <LayoutCatalogoUi idProveedor={idProveedor} idCatalogo={idCatalogo} />
        </div>
    );
}
