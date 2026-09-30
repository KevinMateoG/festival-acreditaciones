import type { AcreditacionFilterOptions } from "../domain/models/Acreditacion";
import type Acreditacion from "../domain/models/Acreditacion";
import type IAcreditacionRepository from "../domain/repository/IAcreditacion.repository";
import { isAreditacionDataInvalid } from "../utils/dataValidation";

export class createAcreditacionUseCase {
    private acreditacionRepository: IAcreditacionRepository;

    constructor(acreditacionRepository: IAcreditacionRepository) {
        this.acreditacionRepository = acreditacionRepository;
    }

    async createAcreditacion(acreditacion: Acreditacion) {
        if (isAreditacionDataInvalid(acreditacion)) {
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
