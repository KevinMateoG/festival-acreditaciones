import type {
    CreateAcreditacionData,
    CreateAcreditacionInput,
} from "../domain/models/Acreditacion";
import type IAcreditacionRepository from "../domain/repository/IAcreditacion.repository";
import { isAcreditacionDataInvalid } from "../utils/dataValidation";

export class createAcreditacionUseCase {
    private acreditacionRepository: IAcreditacionRepository;

    constructor(acreditacionRepository: IAcreditacionRepository) {
        this.acreditacionRepository = acreditacionRepository;
    }

    async createAcreditacion(acreditacion: CreateAcreditacionInput) {
        if (isAcreditacionDataInvalid(acreditacion)) {
            throw new Error("bad_request, Datos de acreditación inválidos");
        }

        const solicitud: CreateAcreditacionData = {
            nombre: acreditacion.nombre,
            medio: acreditacion.medio,
            email: acreditacion.email,
            tipo: acreditacion.tipo,
            dia_id: acreditacion.dia_id,
            escenario_id: acreditacion.escenario_id ?? null,
            estado: "PENDIENTE",
            state: "ACTIVE",
            motivo_rechazo: null,
        };
        const data =
            await this.acreditacionRepository.createAcreditacion(solicitud);
        return {
            data: data,
        };
    }
}
