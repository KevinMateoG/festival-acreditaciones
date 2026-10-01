import prisma from "./client";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import type { Acreditacion } from "../../domain/models/Acreditacion";

export default class AcreditacionUpdatePgRepository implements Pick<IAcreditacionRepository,"updateAcreditacion"> {
  async updateAcreditacion(id: number, acreditacion: Acreditacion): Promise<Acreditacion | null> {
        const AcreditacionToUpdate = await prisma.acreditaciones.findUnique({
            where: { id }
        });

        if(!AcreditacionToUpdate) {
            throw new Error('not_found, Listing not found');
        }

        const newAcreditacion = await prisma.acreditaciones.update({
            where: { id },
            data: { ...acreditacion}
        })
        return newAcreditacion as unknown as Acreditacion;
    }
}