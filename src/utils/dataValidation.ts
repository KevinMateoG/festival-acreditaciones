import type Acreditacion from "../domain/models/Acreditacion";

export function isAreditacionDataInvalid(acreditacion: Acreditacion) {
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
        !["PRENSA", "FOTOGRAFO", "INFLUENCER"].includes(acreditacion.tipo) ||
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
