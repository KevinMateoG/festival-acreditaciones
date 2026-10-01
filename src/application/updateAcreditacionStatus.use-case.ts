import Acreditacion, {
  UpdateAcreditacionStatusRequest,
} from "../domain/models/Acreditacion";

import IAcreditacionRepository from "../domain/repository/IAcreditacion.repository";

export default class UpdateAcreditacionStatusUseCase {
  private acreditacionRepository: IAcreditacionRepository;

  constructor(acreditacionRepository: IAcreditacionRepository) {
    this.acreditacionRepository = acreditacionRepository;
  }

  async updateStatus(
    id: number | null,
    body: UpdateAcreditacionStatusRequest,
  ): Promise<Acreditacion> {
    if (
      !id ||
      id <= 0 ||
      typeof id !== "number" ||
      !body ||
      typeof body.estado !== "string" ||
      (body.estado !== "APROBADA" && body.estado !== "RECHAZADA") ||
      (body.motivo !== undefined && typeof body.motivo !== "string")
    ) {
      throw Object.assign(new Error("Parámetros inválidos"), { status: 400 });
    }

    if (
      body.estado === "RECHAZADA" &&
      (!body.motivo || body.motivo.trim() === "")
    ) {
      throw Object.assign(new Error("El motivo es obligatorio"), {
        status: 400,
      });
    }

    const acreditacion =
      await this.acreditacionRepository.findAcreditacionById(id);

    if (!acreditacion || acreditacion.state === "REMOVED") {
      throw Object.assign(
        new Error(`not found: Acreditación ${id} no encontrada`),
        {
          status: 404,
        },
      );
    }

    if (acreditacion.estado !== "PENDIENTE") {
      throw Object.assign(
        new Error("Solo se puede decidir una acreditacion PENDIENTE"),
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
