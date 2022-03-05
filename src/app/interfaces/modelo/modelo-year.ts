import { ModeloAlbum } from "./modelo-album";

export interface ModeloYear {
    key?: String,
    meses: ModeloAlbum[],
    year : String
}
