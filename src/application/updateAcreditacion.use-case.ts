import { Acreditacion } from '../domain/models/Acreditacion';
import IAcreditacionRepository from '../domain/repository/IAcreditacion.repository';

export class UpdateAcreditacionUseCase{
    private acreditacionRepository: Pick<IAcreditacionRepository, 'updateAcreditacion'>;

    constructor(acreditacionRepository: Pick<IAcreditacionRepository, 'updateAcreditacion'>){
        this.acreditacionRepository = acreditacionRepository;
    }

    async updateAcreditacion(id: number | null, acreditacion: Partial<Acreditacion>) {
        if (!id  || id < 0){
            throw new Error('bad_request_id, El id de la acreditación es inválido');
        }
        const updatedAcreditacion = await this.acreditacionRepository.updateAcreditacion(id, acreditacion);
        if (!updatedAcreditacion) {
            throw new Error('not_found, Acreditación no encontrada');
        }
        return { message: 'Acreditación actualizada exitosamente', acreditacion: updatedAcreditacion };
    }
}