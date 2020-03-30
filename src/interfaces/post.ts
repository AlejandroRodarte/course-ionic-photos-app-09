import { Usuario } from './user';

export interface Post {
    img?: string[];
    _id?: string;
    mensaje: string;
    coords: string;
    usuario?: Usuario;
    created?: string;
    __v?: number;
}
