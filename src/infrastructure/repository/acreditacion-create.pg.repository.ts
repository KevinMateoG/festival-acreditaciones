import prisma from "./client";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import type {
    Acreditacion,
    AcreditacionState,
    CreateAcreditacionData,
    EstadoAcreditacion,
    TipoAcreditacion,
} from "../../domain/models/Acreditacion";

export default class AcreditacionCreatePgRepository
    implements Pick<IAcreditacionRepository, "createAcreditacion">
{
    async createAcreditacion(
        acreditacion: CreateAcreditacionData,
    ): Promise<Acreditacion> {
        const createdAcreditacion = await prisma.acreditaciones.create({
            data: acreditacion,
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
            ...createdAcreditacion,
            tipo: createdAcreditacion.tipo as TipoAcreditacion,
            estado: createdAcreditacion.estado as EstadoAcreditacion,
            state: createdAcreditacion.state as AcreditacionState,
        };
    }
}