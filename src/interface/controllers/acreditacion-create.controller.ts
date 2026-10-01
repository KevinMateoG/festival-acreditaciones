import { type Request, type Response } from "express";
import { createAcreditacionUseCase } from "../../application/createAcreditacion.use-case";
import type { CreateAcreditacionInput } from "../../domain/models/Acreditacion";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import AcreditacionCreatePgRepository from "../../infrastructure/repository/acreditacion-create.pg.repository";
import handleError from "../../utils/handleError";

const repository: Pick<IAcreditacionRepository, "createAcreditacion"> =
    new AcreditacionCreatePgRepository();
const useCase = new createAcreditacionUseCase(
    repository as IAcreditacionRepository,
);

export const createAcreditacion = async (req: Request, res: Response) => {
    try {
        const result = await useCase.createAcreditacion(
            req.body as CreateAcreditacionInput,
        );

        res.status(201).json(result);
    } catch (error) {
        handleError(error, res);
    }
};