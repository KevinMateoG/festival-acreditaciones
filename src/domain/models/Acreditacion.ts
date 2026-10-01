export const tiposAcreditacion = ["PRENSA", "FOTOGRAFO", "INFLUENCER"] as const;
export type TipoAcreditacion = (typeof tiposAcreditacion)[number];

export const estadosAcreditacion = ["PENDIENTE", "APROBADA", "RECHAZADA"] as const;
export type EstadoAcreditacion = (typeof estadosAcreditacion)[number];
export type AcreditacionState = "ACTIVE" | "REMOVED";

export interface Acreditacion {
    id: number;
    nombre: string;
    medio: string;
    email: string;
    tipo: TipoAcreditacion;
    dia_id: number;
    escenario_id: number | null;
    estado: EstadoAcreditacion;
    motivo_rechazo: string | null;
    state: AcreditacionState;
}

export interface CreateAcreditacionInput {
    nombre: string;
    medio: string;
    email: string;
    tipo: TipoAcreditacion;
    dia_id: number;
    escenario_id?: number;
}

export type CreateAcreditacionData = Omit<Acreditacion, "id">;

export interface AcreditacionFilterOptions {
    tipo?: TipoAcreditacion;
    estado?: EstadoAcreditacion;
    dia_id?: number;
    limit?: number;
    offset?: number;
    page?: number;
}

export interface UpdateAcreditacionStatusRequest {
    estado: string;
    motivo?: string;
}
