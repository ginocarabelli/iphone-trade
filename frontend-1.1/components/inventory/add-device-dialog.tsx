"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { fetchDeviceModels } from "@/lib/inventory-api"

interface Device {
  modelo: string
  almacenamiento: string
  color: string
  estadoFisico: string
  condicionBateria: number
  condicionGeneral: string
  precioSugerido: number
}

interface AddDeviceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (device: Device) => void
}

interface DeviceModelFromAPI {
  modelo: string
  almacenamiento: string
  base_price_usd: number
}

export function AddDeviceDialog({ open, onOpenChange, onAdd }: AddDeviceDialogProps) {
  const [formData, setFormData] = useState<Device>({
    modelo: "",
    almacenamiento: "",
    color: "",
    estadoFisico: "",
    condicionBateria: 85,
    condicionGeneral: "",
    precioSugerido: 0,
  })

  // Nuevo: estados para opciones dinámicas
  const [modelosDisponibles, setModelosDisponibles] = useState<string[]>([])
  const [almacenamientosDisponibles, setAlmacenamientosDisponibles] = useState<string[]>([])

  // Opciones fijas (colores, estados, condiciones)
  const colores = ["Negro", "Blanco", "Azul", "Rojo", "Dorado", "Plata", "Verde", "Morado"]
  const estadosFisicos = ["EXCELENTE", "BUENO", "REGULAR", "MALO"]
  const condicionesGenerales = ["NUEVO", "SEMIUSADO", "USADO"]

  // Cuando el diálogo abre, carga los modelos desde la API
  useEffect(() => {
    if (!open) return // solo carga cuando se abre

    async function loadModels() {
      try {
        const data: DeviceModelFromAPI[] = await fetchDeviceModels()

        const modelosSet = new Set<string>()
        const almacenamientosSet = new Set<string>()
        data.forEach((item) => {
          modelosSet.add(item.modelo)
          almacenamientosSet.add(item.almacenamiento)
        })

        setModelosDisponibles(Array.from(modelosSet).sort())
        setAlmacenamientosDisponibles(Array.from(almacenamientosSet).sort())
      } catch (error) {
        console.error(error)
        setModelosDisponibles([])
        setAlmacenamientosDisponibles([])
      }
    }

    loadModels()
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    onOpenChange(false)
    setFormData({
      modelo: "",
      almacenamiento: "",
      color: "",
      estadoFisico: "",
      condicionBateria: 85,
      condicionGeneral: "",
      precioSugerido: 0,
    })
  }

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Dispositivo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Select value={formData.modelo} onValueChange={(value) => setFormData({ ...formData, modelo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    {modelosDisponibles.length === 0 ? (
                        <SelectItem key={0} value={"0"} disabled>No hay modelos disponibles</SelectItem>
                    ) : (
                        modelosDisponibles.map((modelo) => (
                            <SelectItem key={modelo} value={modelo}>
                              {modelo}
                            </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="almacenamiento">Almacenamiento</Label>
                <Select
                    value={formData.almacenamiento}
                    onValueChange={(value) => setFormData({ ...formData, almacenamiento: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar capacidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {almacenamientosDisponibles.length === 0 ? (
                        <SelectItem key={0} value={"0"} disabled>No hay opciones</SelectItem>
                    ) : (
                        almacenamientosDisponibles.map((alm) => (
                            <SelectItem key={alm} value={alm}>
                              {alm}
                            </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* El resto igual, colores, estadoFisico, condicionGeneral, precioSugerido */}
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colores.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estadoFisico">Estado Físico</Label>
                <Select
                    value={formData.estadoFisico}
                    onValueChange={(value) => setFormData({ ...formData, estadoFisico: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estadosFisicos.map((estado) => (
                        <SelectItem key={estado} value={estado}>
                          {estado}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condicionGeneral">Condición General</Label>
                <Select
                    value={formData.condicionGeneral}
                    onValueChange={(value) => setFormData({ ...formData, condicionGeneral: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar condición" />
                  </SelectTrigger>
                  <SelectContent>
                    {condicionesGenerales.map((condicion) => (
                        <SelectItem key={condicion} value={condicion}>
                          {condicion}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="precioSugerido">Precio Sugerido (USD)</Label>
                <Input
                    id="precioSugerido"
                    type="number"
                    value={formData.precioSugerido}
                    onChange={(e) => setFormData({ ...formData, precioSugerido: Number(e.target.value) })}
                    placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condicionBateria">Condición de Batería: {formData.condicionBateria}%</Label>
              <Slider
                  value={[formData.condicionBateria]}
                  onValueChange={(value) => setFormData({ ...formData, condicionBateria: value[0] })}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Agregar Dispositivo</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  )
}
