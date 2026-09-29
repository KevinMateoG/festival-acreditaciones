export default interface Acreditacion{
    id: number;
    nombre: string;
    medio: string;
    email: string;
    tipo: string;
    dia_id: number;
    escenario_id?: number;
    estado: string;
    motivo_rechazo?: string;
    state: string;
}