import type { AcreditacionFilterOptions } from "../domain/models/Acreditacion";
import type Acreditacion from "../domain/models/Acreditacion";
import type IAcreditacionRepository from "../domain/repository/IAcreditacion.repository";

export class createAcreditacionUseCase {
    private acreditacionRepository: IAcreditacionRepository;

    constructor(acreditacionRepository: IAcreditacionRepository) {
        this.acreditacionRepository = acreditacionRepository;
    }

    async createAcreditacion(acreditacion: Acreditacion) {
        if (
            !acreditacion ||
            typeof acreditacion !== "object" ||
            typeof acreditacion.nombre !== "string" ||
            acreditacion.nombre.trim().length === 0 ||
            acreditacion.nombre.length > 100 ||
            typeof acreditacion.medio !== "string" ||
            acreditacion.medio.trim().length === 0 ||
            acreditacion.medio.length > 100 ||
            typeof acreditacion.email !== "string" ||
            acreditacion.email.length > 120 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(acreditacion.email) ||
            typeof acreditacion.tipo !== "string" ||
            !["PRENSA", "FOTOGRAFO", "INFLUENCER"].includes(acreditacion.tipo) ||
            !Number.isInteger(acreditacion.dia_id) ||
            acreditacion.dia_id <= 0 ||
            (acreditacion.escenario_id !== undefined &&
                (!Number.isInteger(acreditacion.escenario_id) || acreditacion.escenario_id <= 0)) ||
            (acreditacion.tipo === "FOTOGRAFO" && acreditacion.escenario_id === undefined)
        ) {
            const error = new Error('bad_request, Datos de acreditación inválidos');
            throw error;
        }

        const solicitud: Acreditacion = {
            ...acreditacion,
            estado: "PENDIENTE",
            state: "ACTIVE",
            motivo_rechazo: undefined,
        };
        const data =
            await this.acreditacionRepository.createAcreditacion(solicitud);
        return {
            data: data,
        };
    }
}
