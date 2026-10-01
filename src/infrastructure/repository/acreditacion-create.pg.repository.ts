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
        const dia = await prisma.dias.findUnique({ where: { id: acreditacion.dia_id } });
        if (!dia) {
            throw new Error(`not_found, Día ${acreditacion.dia_id} no encontrado`);
        }

        if (acreditacion.escenario_id !== null) {
            const escenario = await prisma.escenarios.findUnique({
                where: { id: acreditacion.escenario_id },
            });
            if (!escenario) {
                throw new Error(`not_found, Escenario ${acreditacion.escenario_id} no encontrado`);
            }
        }

        const sameEmail = await prisma.acreditaciones.findFirst({
            where: {
                email: acreditacion.email,
                dia_id: acreditacion.dia_id,
                state: "ACTIVE",
            },
        });
        if (sameEmail) {
            throw new Error("accreditation_already_exists, El email ya tiene una acreditación para este día");
        }

        if (acreditacion.tipo === "FOTOGRAFO") {
            const photographers = await prisma.acreditaciones.count({
                where: {
                    tipo: "FOTOGRAFO",
                    dia_id: acreditacion.dia_id,
                    escenario_id: acreditacion.escenario_id,
                    estado: { not: "RECHAZADA" },
                    state: "ACTIVE",
                },
            });
            if (photographers >= 5) {
                throw new Error("photographer_limit_reached, Se alcanzó el máximo de fotógrafos para este escenario y día");
            }
        }

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