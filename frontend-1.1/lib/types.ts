// @/lib/types.ts

import {Device} from "@/models/models";

export type TransactionType = "COMPRA" | "VENTA" | "INTERCAMBIO"
export type TipoMovimiento = "ENTRADA" | "SALIDA"
export type EstadoFisico = "EXCELENTE" | "BUENO" | "REGULAR" | "MALO"
export type CondicionGeneral = "NUEVO" | "SEMIUSADO" | "USADO"
export type EstadoStock =
    | "DISPONIBLE"
    | "RESERVADO"
    | "VENDIDO"
    | "EN_REPARACION"
    | "NO_DISPONIBLE"

export interface DeviceResponseDto {
    id?: number
    modelo: string
    almacenamiento: string
    color: string
    estadoFisico: EstadoFisico | ""
    condicionBateria: number
    condicionGeneral: CondicionGeneral | ""
    precioSugerido: number
    fechaIngreso?: string
    fechaSalida?: string
    estadoStock: EstadoStock | ""
    creadoPor?: number
}

export interface TransactionDeviceDto {
    dispositivo: Device
    tipoMovimiento: TipoMovimiento
    valorUnitario: number
}

export interface TransactionDto {
    id?: number
    tipo: TransactionType
    formaPago: string
    fecha: string
    dispositivos: TransactionDeviceDto[]
    total: number,
    usuarioId: number
}

export type DeviceModelPrice = {
    id: number
    modelo: string
    almacenamiento: string
    basePriceUsd: number
}
