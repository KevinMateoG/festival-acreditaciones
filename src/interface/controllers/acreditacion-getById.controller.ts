import { type Request, type Response } from "express";
import { AcreditacionByIdUseCase } from "../../application/findAcreditacionById.use-case";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import AcreditacionGetByIdPgRepository from "../../infrastructure/repository/acreditacion-getById.pg.repository";
import handleError from "../../utils/handleError";

const repository: Pick<IAcreditacionRepository, "findAcreditacionById"> = new AcreditacionGetByIdPgRepository();
const useCase = new AcreditacionByIdUseCase( repository as IAcreditacionRepository );

export const findAcreditacionById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const result = await useCase.getAcreditacionById(isNaN(id) ? null : id);

    res.status(200).json(result);
  } catch (error: any) {
    handleError(error, res);
  }
};
    