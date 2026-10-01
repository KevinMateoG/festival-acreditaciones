import {
    estadosAcreditacion,
    tiposAcreditacion,
    type AcreditacionFilterOptions,
    type CreateAcreditacionInput,
} from "../domain/models/Acreditacion";

export function isAcreditacionDataInvalid(
    acreditacion: CreateAcreditacionInput,
): boolean {
    if (
        !acreditacion ||
        typeof acreditacion !== "object" ||
        typeof acreditacion.nombre !== "string" ||
        acreditacion.nombre.trim().length === 0 ||
        acreditacion.nombre.length > 100 ||
        typeof acreditacion.medio !== "string" ||
        acreditacion.medio.trim().length === 0 ||
        acreditacion.medio.length > 100 ||
        typeof acreditacion.email !== "string" ||
        acreditacion.email.length > 120 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(acreditacion.email) ||
        typeof acreditacion.tipo !== "string" ||
        !tiposAcreditacion.includes(acreditacion.tipo) ||
        !Number.isInteger(acreditacion.dia_id) ||
        acreditacion.dia_id <= 0 ||
        (acreditacion.escenario_id !== undefined &&
            (!Number.isInteger(acreditacion.escenario_id) ||
                acreditacion.escenario_id <= 0)) ||
        (acreditacion.tipo === "FOTOGRAFO" &&
            acreditacion.escenario_id === undefined)
    ) {
        return true;
    }

    return false;
}

export function isAcreditacionFilterInvalid(
    filters: AcreditacionFilterOptions,
): boolean {
    if (
        filters.page !== undefined &&
        (!Number.isInteger(filters.page) || filters.page < 1)
    ) {
        return true;
    }

    if (
        filters.limit !== undefined &&
        (!Number.isInteger(filters.limit) || filters.limit < 1 || filters.limit > 50)
    ) {
        return true;
    }

    if (
        filters.dia_id !== undefined &&
        (!Number.isInteger(filters.dia_id) || filters.dia_id < 1)
    ) {
        return true;
    }

    if (
        filters.tipo !== undefined &&
        !tiposAcreditacion.includes(filters.tipo)
    ) {
        return true;
    }

    if (
        filters.estado !== undefined &&
        !estadosAcreditacion.includes(filters.estado)
    ) {
        return true;
    }

    return false;
}
