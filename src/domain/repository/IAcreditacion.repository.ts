import Acreditacion from "../models/Acreditacion";
import type { AcreditacionFilterOptions } from "../models/Acreditacion";

export default interface IAcreditacionRepository {
    findAllAcreditaciones(filters?: AcreditacionFilterOptions): Promise<{ data: Acreditacion[]; total: number }>;
    findAcreditacionById(id: number): Promise<Acreditacion | null>;
    createAcreditacion(acreditacion: Acreditacion): Promise<Acreditacion>;
    updateAcreditacion(
        id: number,
        acreditacion: Partial<Acreditacion>,
    ): Promise<Acreditacion | null>;
    deleteAcreditacion(id: number): Promise<boolean>;
    updateAcreditacionStatus(
        id: number,
        status: string,
    ): Promise<Acreditacion | null>;
}
