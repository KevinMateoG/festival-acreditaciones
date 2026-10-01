import prisma from "./client";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";

export default class AcreditacionDeletePgRepository implements Pick<
  IAcreditacionRepository,
  "deleteAcreditacion"
> {
  async deleteAcreditacion(id: number): Promise<boolean> {
    const acreditacion = await prisma.acreditaciones.findFirst({
      where: { id, state: { not: "REMOVED" } },
    });

    if (!acreditacion) {
      return false;
    }

    await prisma.acreditaciones.update({
      where: { id },
      data: { state: "REMOVED" },
    });

    return true;
  }
}
