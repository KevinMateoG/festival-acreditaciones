import { type Request, type Response } from "express";
import DeleteAcreditacionUseCase from "../../application/deleteAcreditacion.use-case";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import AcreditacionDeletePgRepository from "../../infrastructure/repository/acreditacion-delete.pg.repository";
import handleError from "../../utils/handleError";

const repository: Pick<IAcreditacionRepository, "deleteAcreditacion"> =
  new AcreditacionDeletePgRepository();
const useCase = new DeleteAcreditacionUseCase(
  repository as IAcreditacionRepository,
);

export const deleteAcreditacion = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const result = await useCase.deleteAcreditacion(isNaN(id) ? null : id);

    res.status(200).json(result);
  } catch (error: unknown) {
    return handleError(error, res);
  }
};
