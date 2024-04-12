import { Padron } from "./Padron.interface";

export interface PadronResponse{
    ok: boolean;
    limit: string;
    page: string;
    datos: Padron[];
}