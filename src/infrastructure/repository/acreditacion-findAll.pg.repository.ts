import prisma from "./client";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import type { Acreditacion, AcreditacionFilterOptions } from "../../domain/models/Acreditacion";

export default class AcreditacionFindAllPgRepository implements Pick<IAcreditacionRepository, "findAllAcreditaciones"> {
    async findAllAcreditaciones(filters?: AcreditacionFilterOptions): Promise<{ data: Acreditacion[]; total: number; }> {
        const where = filters as Record<string, unknown> | undefined;
        const [data, total] = await Promise.all([
            prisma.acreditaciones.findMany({ where: where as never }),
            prisma.acreditaciones.count({ where: where as never }),
        ]);

        return { data: data as Acreditacion[], total };
    }
}