import React from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import {
    colores,
    estadosFisicos,
    condicionesGenerales,
} from "@/lib/options"
import type { DeviceResponseDto, DeviceModelPrice } from "@/lib/types"
import { Device } from "@/models/models"

interface DeviceFormProps {
    dispositivo: Device
    onChange: (field: keyof DeviceResponseDto, value: any) => void
    onRemove?: () => void // 🔹 Nueva prop para eliminar
    deviceModels: DeviceModelPrice[]
    almacenamientosDisponibles: Record<string, string[]>
}

export function DeviceForm({ dispositivo, onChange, onRemove, deviceModels, almacenamientosDisponibles }: DeviceFormProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
                <Label>Modelo</Label>
                <Select value={dispositivo.modelo} onValueChange={(v) => onChange("modelo", v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar modelo" />
                    </SelectTrigger>
                    <SelectContent>
                        {[...new Set(deviceModels.map((m) => m.modelo))]
                            .sort()
                            .map((modelo) => (
                                <SelectItem key={modelo} value={modelo}>
                                    {modelo}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>Almacenamiento</Label>
                <Select
                    value={dispositivo.almacenamiento}
                    onValueChange={(v) => onChange("almacenamiento", v)}
                    disabled={!dispositivo.modelo}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                dispositivo.modelo
                                    ? "Seleccionar almacenamiento"
                                    : "Elegí un modelo primero"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {(almacenamientosDisponibles[dispositivo.modelo] || [])
                            .sort()
                            .map((a) => (
                                <SelectItem key={a} value={a}>
                                    {a}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>Color</Label>
                <Select value={dispositivo.color} onValueChange={(v) => onChange("color", v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar color" />
                    </SelectTrigger>
                    <SelectContent>
                        {colores.map((c) => (
                            <SelectItem key={c} value={c}>
                                {c}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>Estado Físico</Label>
                <Select value={dispositivo.estadoFisico} onValueChange={(v) => onChange("estadoFisico", v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado físico" />
                    </SelectTrigger>
                    <SelectContent>
                        {estadosFisicos.map((e) => (
                            <SelectItem key={e} value={e}>
                                {e}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>Condición General</Label>
                <Select value={dispositivo.condicionGeneral} onValueChange={(v) => onChange("condicionGeneral", v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar condición general" />
                    </SelectTrigger>
                    <SelectContent>
                        {condicionesGenerales.map((cg) => (
                            <SelectItem key={cg} value={cg}>
                                {cg}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>Condición de Batería: {dispositivo.condicionBateria}%</Label>
                <Slider
                    value={[dispositivo.condicionBateria]}
                    onValueChange={(v) => onChange("condicionBateria", v[0])}
                    max={100}
                    min={0}
                    step={1}
                />
            </div>

            <div className="space-y-1">
                <Label>Precio Sugerido</Label>
                <Input
                    type="number"
                    value={dispositivo.precioSugerido}
                    onChange={(e) => onChange("precioSugerido", Number(e.target.value))}
                    min={0}
                />
            </div>

            {onRemove && (
                <div className="col-span-4 flex justify-center items-center mt-2">
                    <Button type="button" variant="ghost" onClick={onRemove}>
                        <Trash2 className="w-4 h-4 mr-1" /> Eliminar
                    </Button>
                </div>
            )}
        </div>
    )
}
