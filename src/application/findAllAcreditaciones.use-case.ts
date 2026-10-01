import type { AcreditacionFilterOptions } from "../domain/models/Acreditacion";
import type IAcreditacionRepository from "../domain/repository/IAcreditacion.repository";
import { isAcreditacionFilterInvalid } from "../utils/dataValidation";

export class findAllAcreditacionesUseCase {
    private acreditacionRepository: IAcreditacionRepository;

    constructor(acreditacionRepository: IAcreditacionRepository) {
        this.acreditacionRepository = acreditacionRepository;
    }

    async findAll(filters: AcreditacionFilterOptions = {}) {
        if (isAcreditacionFilterInvalid(filters)) {
            throw new Error("bad_request, Filtros de acreditaciones inválidos");
        }

        const page = filters.page ?? 1;
        const limit = filters.limit ?? 10;
        const offset = (page - 1) * limit;
        const searchOptions: AcreditacionFilterOptions = {
            ...filters,
            page,
            limit,
            offset,
        };

        const { data, total } =
            await this.acreditacionRepository.findAllAcreditaciones(searchOptions);

        return {
            pagination: {
                total,
                currentPage: page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            data,
        };
    }
}
