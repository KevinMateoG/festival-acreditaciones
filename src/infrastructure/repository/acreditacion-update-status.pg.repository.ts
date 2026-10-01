import prisma from "./client";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import Acreditacion from "../../domain/models/Acreditacion";

export default class AcreditacionUpdateStatusPgRepository implements Pick<
  IAcreditacionRepository,
  "updateAcreditacionStatus"
> {
  async updateAcreditacionStatus(
    id: number,
    status: string,
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
      escenario_id: acreditacionActualizada.escenario_id ?? undefined,
      motivo_rechazo: acreditacionActualizada.motivo_rechazo ?? undefined,
    };
  }
}
