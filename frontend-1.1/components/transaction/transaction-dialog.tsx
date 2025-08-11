"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import {DeviceResponseDto, TransactionDto, TransactionDeviceDto, DeviceModelPrice} from "@/lib/types"
import {almacenamientos, colores, condicionesGenerales, formasPago, estadosFisicos} from "@/lib/options";
import {fetchDeviceModels} from "@/lib/inventory-api";
import {DeviceForm} from "@/utils/device-form";
import {VentaDevice} from "@/utils/venta-device";
import {Device} from "@/models/models";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

interface TransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "COMPRA" | "VENTA" | "INTERCAMBIO"
  onAdd: (transaction: TransactionDto) => void
}

export function TransactionDialog({ open, onOpenChange, type, onAdd }: TransactionDialogProps) {
  const [formData, setFormData] = useState<{ formaPago: string; total: number }>({ formaPago: "", total: 0 })
  const [devices, setDevices] = useState<TransactionDeviceDto[]>([])
  const [deviceModels, setDeviceModels] = useState<DeviceModelPrice[]>([])
  const [almacenamientosDisponibles, setAlmacenamientosDisponibles] = useState<Record<string, string[]>>({})

  const [selectingMovementType, setSelectingMovementType] = useState(false)

  useEffect(() => {
    if (deviceModels.length > 0) {
      const almacenamientosPorModelo: Record<string, string[]> = {}

      deviceModels.forEach((m) => {
        if (!almacenamientosPorModelo[m.modelo]) {
          almacenamientosPorModelo[m.modelo] = []
        }
        if (!almacenamientosPorModelo[m.modelo].includes(m.almacenamiento)) {
          almacenamientosPorModelo[m.modelo].push(m.almacenamiento)
        }
      })

      setAlmacenamientosDisponibles(almacenamientosPorModelo)
    }
  }, [deviceModels])

  useEffect(() => {
    if (open) {
      setFormData({ formaPago: "", total: 0 })
      setDevices([])
      fetchDeviceModels().then((data) => {
        setDeviceModels(data)

        const almacenamientoPorModelo: Record<string, string[]> = {}
        for (const m of data) {
          if (!almacenamientoPorModelo[m.modelo]) {
            almacenamientoPorModelo[m.modelo] = []
          }
          if (!almacenamientoPorModelo[m.modelo].includes(m.almacenamiento)) {
            almacenamientoPorModelo[m.modelo].push(m.almacenamiento)
          }
        }
        setAlmacenamientosDisponibles(almacenamientoPorModelo)
      })
    }
  }, [open])

  const handleAddDevice = (tipoMovimiento: "ENTRADA" | "SALIDA") => {
    const newDevice: TransactionDeviceDto = {
      dispositivo: {
        modelo: "",
        almacenamiento: "",
        color: "",
        estadoFisico: "",
        condicionBateria: 80,
        condicionGeneral: "",
        precioSugerido: 0,
        fechaIngreso: new Date().toISOString().split("T")[0],
        fechaSalida: undefined,
        estadoStock: "DISPONIBLE",
        creadoPor: JSON.parse(localStorage.getItem("user")!).id,
      },
      tipoMovimiento,
      valorUnitario: 0,
    }
    setDevices((prev) => [...prev, newDevice])
  }

  const handleDeviceFieldChange = (index: number, field: keyof DeviceResponseDto, value: any) => {
    const updatedDevices = [...devices]
    updatedDevices[index].dispositivo = {
      ...updatedDevices[index].dispositivo,
      [field]: value,
    }

    // Si se cambia el precio sugerido, también actualizar el valor unitario
    if (field === "precioSugerido") {
      updatedDevices[index].valorUnitario = value
    }

    // Actualizamos el estado y recalculamos el total usando el nuevo array
    setDevices(updatedDevices)
    recalculateTotal(updatedDevices)
  }

  const removeDevice = (index: number) => {
    const updated = devices.filter((_, i) => i !== index)
    setDevices(updated)
    recalculateTotal(updated)
  }

  const recalculateTotal = (list: TransactionDeviceDto[]) => {
    const total =
        type === "INTERCAMBIO"
            ? list.filter((d) => d.tipoMovimiento === "SALIDA").reduce((sum, d) => sum + d.valorUnitario, 0) -
            list.filter((d) => d.tipoMovimiento === "ENTRADA").reduce((sum, d) => sum + d.valorUnitario, 0)
            : list.reduce((sum, d) => sum + d.valorUnitario, 0)
    setFormData((prev) => ({ ...prev, total }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: TransactionDto = {
      tipo: type,
      formaPago: formData.formaPago,
      total: formData.total,
      dispositivos: devices,
      fecha: new Date().toISOString().split("T")[0],
      usuarioId: JSON.parse(localStorage.getItem("user")!).id
    }
    onAdd(payload)
    onOpenChange(false)
  }

  const handleDeviceUpdate = (index: number, device: Device) => {
    const updated = [...devices]
    updated[index].dispositivo = device
    updated[index].valorUnitario = device.precioSugerido
    setDevices(updated)
    recalculateTotal(updated)
  }


  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-4xl">
          <DialogHeader>
            <DialogTitle>{type === "COMPRA" ? "Nueva Compra" : type === "VENTA" ? "Nueva Venta" : "Nuevo Intercambio"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
              <Label className="text-base">Dispositivos</Label>

              {type === "INTERCAMBIO" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" size="sm">
                        <Plus className="w-4 h-4 mr-1" /> Agregar
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleAddDevice("ENTRADA")}>
                        Entrada (cliente entrega)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddDevice("SALIDA")}>
                        Salida (cliente recibe)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              ) : (
                  <Button type="button" onClick={() => handleAddDevice(type === "COMPRA" ? "ENTRADA" : "SALIDA")} size="sm">
                    <Plus className="w-4 h-4 mr-1" /> Agregar
                  </Button>
              )}
            </div>

            {devices.length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-4">
                  No hay dispositivos agregados. Agregá al menos uno.
                </div>
            )}

            {devices.map((device, index) => (
                <Card key={index} className="space-y-4">
                  <CardContent className="p-4 space-y-4">
                    {device.tipoMovimiento === "ENTRADA" ? (
                        <DeviceForm
                            dispositivo={device.dispositivo}
                            onChange={(field, value) => handleDeviceFieldChange(index, field, value)}
                            deviceModels={deviceModels}
                            almacenamientosDisponibles={almacenamientosDisponibles}
                            onRemove={() => removeDevice(index)}
                        />

                    ) : (
                        <div className="flex justify-between gap-4">
                          <Badge variant="secondary" className="rounded-md">{device.tipoMovimiento}</Badge>
                          <VentaDevice
                              value={device.dispositivo}
                              onChange={(d) => {
                                if (d) handleDeviceUpdate(index, d)
                              }}
                          />
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeDevice(index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                    )}
                  </CardContent>
                </Card>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Forma de Pago</Label>
                <Select value={formData.formaPago} onValueChange={(v) => setFormData({ ...formData, formaPago: v })}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar forma de pago" /></SelectTrigger>
                  <SelectContent>{formasPago.map((fp) => <SelectItem key={fp} value={fp}>{fp}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{type === "INTERCAMBIO" ? "Diferencia a Pagar" : "Total"}</Label>
                <Input type="number" value={formData.total} readOnly className={type === "INTERCAMBIO" && formData.total < 0 ? "text-red-600 font-bold" : "font-bold"} />
                {type === "INTERCAMBIO" && formData.total < 0 && (
                    <span className="text-xs text-red-500">El cliente debe recibir ${Math.abs(formData.total)}</span>
                )}
              </div>
            </div>

            {type === "INTERCAMBIO" && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {formData.total >= 0
                        ? `El cliente debe pagar $${formData.total} adicionales.`
                        : `El cliente debe recibir $${Math.abs(formData.total)} de vuelta.`}
                  </AlertDescription>
                </Alert>
            )}

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={devices.length === 0}>
                Registrar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  )
}
