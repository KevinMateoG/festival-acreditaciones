import type { Acreditacion, AcreditacionFilterOptions, CreateAcreditacionData } from "../models/Acreditacion";

export default interface IAcreditacionRepository {
    findAllAcreditaciones(filters?: AcreditacionFilterOptions): Promise<{ data: Acreditacion[]; total: number }>;
    findAcreditacionById(id: number): Promise<Acreditacion | null>;
    createAcreditacion(acreditacion: CreateAcreditacionData): Promise<Acreditacion>;
    updateAcreditacion(id: number, acreditacion: Partial<Acreditacion>): Promise<Acreditacion | null>;
    deleteAcreditacion(id: number): Promise<boolean>;
    updateAcreditacionStatus(
        id: number,
        status: string,
        motivo?: string,
    ): Promise<Acreditacion | null>;
}