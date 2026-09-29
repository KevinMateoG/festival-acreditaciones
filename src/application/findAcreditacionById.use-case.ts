import Acreditacion from '../domain/models/Acreditacion';
import IAcreditacionRepository from '../domain/repository/IAcreditacion.repository';

export class AcreditacionByIdUseCase{
    private acreditacionRepository: IAcreditacionRepository;

    constructor(acreditacionRepository: IAcreditacionRepository){
        this.acreditacionRepository = acreditacionRepository;
    }

    async getAcreditacionById(id: number | null) {
        if (!id || id < 0){
            throw new Error('El id de la acreditación es inválido');
        }
        const acreditacion = await this.acreditacionRepository.findAcreditacionById(id);
        return { acreditacion };
    }
}