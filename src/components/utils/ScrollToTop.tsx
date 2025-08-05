'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
        // La solución más simple y que debería funcionar en el 90% de los casos
        window.scrollTo(0, 0);

        // Si la anterior no funciona por el "falso scroll", 
        // podés intentar scrollear un elemento específico por su ID.
        // Por ejemplo, si tu contenedor principal tiene id="main-content":
        // const mainContent = document.getElementById('main-content');
        // if (mainContent) {
        //   mainContent.scrollTo(0, 0);
        // }

    }, [pathname]); // El efecto se dispara cada vez que la URL (pathname) cambia

    return null; // Este componente no renderiza nada en el DOM
};

export default ScrollToTop;