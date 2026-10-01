import type {
  Acreditacion,
  UpdateAcreditacionStatusRequest,
} from "../domain/models/Acreditacion";
import type IAcreditacionRepository from "../domain/repository/IAcreditacion.repository";
import {
  isAcreditacionStatusRequestInvalid,
  isValidId,
} from "../utils/dataValidation";

export default class UpdateAcreditacionStatusUseCase {
  private acreditacionRepository: IAcreditacionRepository;

  constructor(acreditacionRepository: IAcreditacionRepository) {
    this.acreditacionRepository = acreditacionRepository;
  }

  async updateStatus(
    id: number | null,
    body: UpdateAcreditacionStatusRequest,
  ): Promise<Acreditacion> {
    if (!isValidId(id) || isAcreditacionStatusRequestInvalid(body)) {
      throw Object.assign(new Error("bad_request, Parámetros inválidos"), {
        status: 400,
      });
    }

    const acreditacion =
      await this.acreditacionRepository.findAcreditacionById(id);

    if (!acreditacion || acreditacion.state === "REMOVED") {
      throw Object.assign(
        new Error(`not_found, Acreditación ${id} no encontrada`),
        { status: 404 },
      );
    }

    if (acreditacion.estado !== "PENDIENTE") {
      throw Object.assign(
        new Error("Solo se puede decidir una acreditación PENDIENTE"),
        {
          status: 409,
        },
      );
    }
    
    const acreditacionActualizada =
      await this.acreditacionRepository.updateAcreditacionStatus(
        id,
        body.estado,
        body.motivo?.trim(),
      );

    if (!acreditacionActualizada) {
      throw Object.assign(
        new Error(`No se pudo actualizar el estado de la acreditación ${id}`),
        {
          status: 404,
        },
      );
    }
    return acreditacionActualizada;
  }
}
