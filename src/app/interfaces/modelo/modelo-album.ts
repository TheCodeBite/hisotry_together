import { ModeloArchivo } from "./modelo-archivo";

export interface ModeloAlbum {
    key?: string,
    nombre: String,
    archivo: ModeloArchivo[],
    abreviatura?: String,
    numero?: String,
    Descripcion?: String
}
