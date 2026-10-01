import prisma from "./client";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import type {
  Acreditacion,
  EstadoDecisionAcreditacion,
  EstadoAcreditacion,
  TipoAcreditacion,
  AcreditacionState,
} from "../../domain/models/Acreditacion";

export default class AcreditacionUpdateStatusPgRepository implements Pick<
  IAcreditacionRepository,
  "updateAcreditacionStatus"
> {
  async updateAcreditacionStatus(
    id: number,
    status: EstadoDecisionAcreditacion,
    motivo?: string,
  ): Promise<Acreditacion | null> {
    const acreditacionActualizada = await prisma.acreditaciones.update({
      where: { id },
      data: {
        estado: status,
        motivo_rechazo: motivo ?? null,
      },
      select: {
        id: true,
        nombre: true,
        medio: true,
        email: true,
        tipo: true,
        dia_id: true,
        escenario_id: true,
        estado: true,
        motivo_rechazo: true,
        state: true,
      },
    });

    return {
      ...acreditacionActualizada,
      tipo: acreditacionActualizada.tipo as TipoAcreditacion,
      estado: acreditacionActualizada.estado as EstadoAcreditacion,
      state: acreditacionActualizada.state as AcreditacionState,
      escenario_id: acreditacionActualizada.escenario_id,
      motivo_rechazo: acreditacionActualizada.motivo_rechazo,
    };
  }
}
