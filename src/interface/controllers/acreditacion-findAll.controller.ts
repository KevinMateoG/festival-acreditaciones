import { type Request, type Response } from "express";
import { findAllAcreditacionesUseCase } from "../../application/findAllAcreditaciones.use-case";
import type {
    AcreditacionFilterOptions,
    EstadoAcreditacion,
    TipoAcreditacion,
} from "../../domain/models/Acreditacion";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import AcreditacionFindAllPgRepository from "../../infrastructure/repository/acreditacion-findAll.pg.repository";
import handleError from "../../utils/handleError";

const repository: Pick<IAcreditacionRepository, "findAllAcreditaciones"> =
    new AcreditacionFindAllPgRepository();
const useCase = new findAllAcreditacionesUseCase(
    repository as IAcreditacionRepository,
);

export const findAllAcreditaciones = async (req: Request, res: Response) => {
    try {
        const parseStringFilter = (value: unknown): string | undefined => {
            if (value === undefined) {
                return undefined;
            }

            return typeof value === "string" ? value : "";
        };

        const parseIntegerFilter = (value: unknown): number | undefined => {
            if (value === undefined) {
                return undefined;
            }

            return typeof value === "string" ? Number(value) : Number.NaN;
        };

        const searchParams: AcreditacionFilterOptions = {
            tipo: parseStringFilter(req.query.tipo) as
                | TipoAcreditacion
                | undefined,
            estado: parseStringFilter(req.query.estado) as
                | EstadoAcreditacion
                | undefined,
            dia_id: parseIntegerFilter(req.query.dia_id),
            page: parseIntegerFilter(req.query.page),
            limit: parseIntegerFilter(req.query.limit),
        };

        const result = await useCase.findAll(searchParams);
        res.status(200).json(result);
    } catch (error) {
        handleError(error, res);
    }
};
