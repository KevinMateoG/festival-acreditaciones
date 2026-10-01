import { type Request, type Response } from "express";
import UpdateAcreditacionStatusUseCase from "../../application/updateAcreditacionStatus.use-case";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import AcreditacionUpdateStatusPgRepository from "../../infrastructure/repository/acreditacion-update-status.pg.repository";
import AcreditacionPgRepository from "../../infrastructure/repository/acreditacion.pg";
import handleError from "../../utils/handleError";

const findRepo = new AcreditacionPgRepository();
const updateStatusRepo = new AcreditacionUpdateStatusPgRepository();
const repository = {
  ...findRepo,
  ...updateStatusRepo,
} as IAcreditacionRepository;
const useCase = new UpdateAcreditacionStatusUseCase(repository);

export const updateAcreditacionStatus = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const result = await useCase.updateStatus(
      isNaN(id) ? null : id,
      req.body,
    );

    res.status(200).json({ data: result });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};
