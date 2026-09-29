import type { AcreditacionFilterOptions } from "../domain/models/Acreditacion";
import type IAcreditacionRepository from "../domain/repository/IAcreditacion.repository";

export class findAllAcreditacionesUseCase {
    private acreditacionRepository: IAcreditacionRepository;

    constructor(acreditacionRepository: IAcreditacionRepository) {
        this.acreditacionRepository = acreditacionRepository
    }

    async findAll(filters: AcreditacionFilterOptions = {}) {
        const page = filters.page ?? 1;
        const offset = (filters.limit ?? 10) * (page - 1);
        const searchOptions: AcreditacionFilterOptions = {
            limit: 10,
            offset,
            ...filters
        }

        const { data, total } = await this.acreditacionRepository.findAllAcreditaciones(searchOptions);

        return {
            pagination: {
                total,
                currentPage: page,
                limit: searchOptions.limit,
                totalPages: Math.ceil(total / (searchOptions.limit ?? 10)),
            },
            data
        }
    };
}
