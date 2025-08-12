export interface infoCatalogo {
    codcata: string;
    contacto: string | null,
    descripcasaco: string,
    email: string,
    instagram: string,
    marca: string,
    nomcasacomercial: string,
    nomcatalogo: string,
    paginaweb: string,
    telconta: string | null,
    telefono: string,
    whatsapp: string | null
    logocata: string | null,
    urlFirsPage: string | null
    idimagen: string,
    canpedido: number

}
export interface catalogosType {
    codcasaco: string
    codcata: string
    instagram: string
    marca: string
    nomcasacomer: string
    nomcatalogo: string
    relevancia: number;
    telefono: string;
    logocata: string | null;

}

export interface proveedoresType {
    codcasaco: string;
    nombre: string;
}

export interface tiposType {
    codtipo: string;
    nombre: string;
}


export interface marcasType {
    marca: string
}
export interface paisType {
    codpais: string
    descrip: string
}


export interface news {
    codnovedad: string;
    codtipo: string;
    descnove: string;
    enslice: boolean;
    entop: boolean;
    imagenportada: string;
    link: string;
    nombretipo: string;
    titulo: string
    rutarelativa: string;
}

export interface section {
    titleSection: string;
    items: news[]
}
