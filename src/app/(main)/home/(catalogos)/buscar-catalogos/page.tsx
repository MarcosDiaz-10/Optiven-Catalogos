import SearchCatalogosUi from "@/components/features/catalogos/SearchCatalogosUi";
import { Suspense } from "react";


export default function BuscarCatalogosPage() {
    return (
        // El Suspense boundary se define aquí, en el componente de servidor.
        <Suspense fallback={<div>Cargando...</div>}>
            <SearchCatalogosUi />
        </Suspense>
    );
}