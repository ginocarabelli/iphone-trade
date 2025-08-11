export interface Device {
    id?: number
    modelo: string
    almacenamiento: string
    color: string
    estadoFisico: string
    condicionBateria: number
    condicionGeneral: string
    precioSugerido: number
    fechaIngreso: string
    fechaSalida?: string
    estadoStock: string
    creadoPor?: number
}

export interface InventoryViewProps {
    userRole?: string
}

export interface EditDeviceDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    device: Device
    onEdit: (device: Device) => void
}

export interface DeviceCardProps {
    device: Device
    onEdit: () => void
    onDelete: () => void
}

