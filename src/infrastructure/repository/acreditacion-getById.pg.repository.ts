import prisma from "./client";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import type { Acreditacion, EstadoDecisionAcreditacion, EstadoAcreditacion, TipoAcreditacion, AcreditacionState } from "../../domain/models/Acreditacion";

export default class AcreditacionGetByIdPgRepository implements Pick<IAcreditacionRepository,"findAcreditacionById"> {
  async findAcreditacionById(
    id: number
  ): Promise<Acreditacion | null> {
    const acreditacion = await prisma.acreditaciones.findUnique({
        where: { id, state: "ACTIVE" }
    });
    return acreditacion as Acreditacion | null;

    
  }
}