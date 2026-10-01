import Acreditacion from "../domain/models/Acreditacion";
import IAcreditacionRepository from "../domain/repository/IAcreditacion.repository";

export default class DeleteAcreditacionUseCase {
  private acreditacionRepository: IAcreditacionRepository;

  constructor(acreditacionRepository: IAcreditacionRepository) {
    this.acreditacionRepository = acreditacionRepository;
  }

  async deleteAcreditacion(id: number | null) {
    if (!id || id <= 0 || typeof id !== "number") {
      throw Object.assign(new Error("Parámetros inválidos"), {
        status: 400,
      });
    }

    const acreditacionDelete =
      await this.acreditacionRepository.deleteAcreditacion(id);

    if (!acreditacionDelete) {
      throw Object.assign(new Error(`Acreditación ${id} no encontrada`), {
        status: 404,
      });
    }

    return {
      message: `Acreditación ${id} eliminada correctamente`,
    };
  }
}
