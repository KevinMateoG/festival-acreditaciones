import prisma from "./client";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import type { Acreditacion, AcreditacionFilterOptions } from "../../domain/models/Acreditacion";

export default class AcreditacionFindAllPgRepository implements Pick<IAcreditacionRepository, "findAllAcreditaciones"> {
    async findAllAcreditaciones(filters?: AcreditacionFilterOptions): Promise<{ data: Acreditacion[]; total: number; }> {
        const where = {
            state: "ACTIVE",
            ...(filters?.tipo !== undefined ? { tipo: filters.tipo } : {}),
            ...(filters?.estado !== undefined ? { estado: filters.estado } : {}),
            ...(filters?.dia_id !== undefined ? { dia_id: filters.dia_id } : {}),
        };
        const skip = filters?.offset ?? 0;
        const take = filters?.limit ?? 10;
        const [data, total] = await Promise.all([
            prisma.acreditaciones.findMany({
                where,
                skip,
                take,
                orderBy: { id: "asc" },
                select: {
                    id: true, nombre: true, medio: true, email: true, tipo: true,
                    dia_id: true, escenario_id: true, estado: true,
                    motivo_rechazo: true, state: true,
                },
            }),
            prisma.acreditaciones.count({ where }),
        ]);

        return { data: data as Acreditacion[], total };
    }
}