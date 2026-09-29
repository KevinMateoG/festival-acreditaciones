import Acreditacion from "../models/Acreditacion";

export default interface IAcreditacionRepository {
    findAllAcreditaciones(): Promise<Acreditacion[]>;
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
