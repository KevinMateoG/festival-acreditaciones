import { type Request, type Response } from "express";
import { UpdateAcreditacionUseCase } from "../../application/updateAcreditacion.use-case";
import type IAcreditacionRepository from "../../domain/repository/IAcreditacion.repository";
import AcreditacionUpdatePgRepository from "../../infrastructure/repository/acreditacion-update.pg.repository";
import handleError from "../../utils/handleError";
import { Acreditacion } from "../../domain/models/Acreditacion";

const repository: Pick<IAcreditacionRepository, "updateAcreditacion"> = new AcreditacionUpdatePgRepository();
const useCase = new UpdateAcreditacionUseCase(repository);

export const updateAcreditacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<Acreditacion> = req.body;
    const numericId = Number(id);
    const result = await useCase.updateAcreditacion(
      Number.isNaN(numericId) ? null : numericId,
      updateData,
    );
    
    res.status(200).json({ message: `Acreditación ${id} actualizada`, data: result });
  } catch (error) {
    handleError(error, res);
  }
};
