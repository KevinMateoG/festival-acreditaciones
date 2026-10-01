import Acreditacion from "../domain/models/Acreditacion";
import IAcreditacionRepository from "../domain/repository/IAcreditacion.repository";
import { isValidId } from "../utils/dataValidation";

export default class DeleteAcreditacionUseCase {
  private acreditacionRepository: IAcreditacionRepository;

  constructor(acreditacionRepository: IAcreditacionRepository) {
    this.acreditacionRepository = acreditacionRepository;
  }

  async deleteAcreditacion(id: number | null) {
    if (!isValidId(id)) {
      throw new Error("bad_request, Parámetros inválidos");
    }

    const acreditacionDelete =
      await this.acreditacionRepository.deleteAcreditacion(id);

    if (!acreditacionDelete) {
      throw new Error(`not_found, Acreditación ${id} no encontrada`);
    }

    return {
      message: `Acreditación ${id} eliminada correctamente`,
    };
  }
}
