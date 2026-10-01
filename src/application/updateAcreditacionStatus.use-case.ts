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
      throw new Error("bad_request, Parámetros inválidos");
    }

    const acreditacion =
      await this.acreditacionRepository.findAcreditacionById(id);

    if (!acreditacion || acreditacion.state === "REMOVED") {
      throw new Error(`not_found, Acreditación ${id} no encontrada`);
    }

    if (acreditacion.estado !== "PENDIENTE") {
      throw new Error(
        "request_not_pending, Solo se puede decidir una acreditación PENDIENTE",
      );
    }

    const acreditacionActualizada =
      await this.acreditacionRepository.updateAcreditacionStatus(
        id,
        body.estado,
        body.motivo?.trim(),
      );

    if (!acreditacionActualizada) {
      throw new Error(`not_found, Acreditación ${id} no encontrada`);
    }
    return acreditacionActualizada;
  }
}
