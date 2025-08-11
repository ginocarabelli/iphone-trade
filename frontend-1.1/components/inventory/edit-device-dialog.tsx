"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import {Device, EditDeviceDialogProps} from "@/models/models";

const modelos = [
  "iPhone 14 Pro Max",
  "iPhone 14 Pro",
  "iPhone 14",
  "iPhone 14 Plus",
  "iPhone 13 Pro Max",
  "iPhone 13 Pro",
  "iPhone 13",
  "iPhone 13 mini",
  "iPhone 12 Pro Max",
  "iPhone 12 Pro",
  "iPhone 12",
  "iPhone 12 mini",
  "iPhone 11 Pro Max",
  "iPhone 11 Pro",
  "iPhone 11",
]

const almacenamientos = ["64GB", "128GB", "256GB", "512GB", "1TB"]
const colores = ["Negro Espacial", "Blanco", "Azul", "Dorado", "Plata", "Rojo", "Verde", "Morado"]
const estadosFisicos = ["EXCELENTE", "BUENO", "REGULAR", "MALO"]
const condicionesGenerales = ["NUEVO", "SEMIUSADO", "USADO"]
const estadosStock = ["DISPONIBLE", "VENDIDO", "INTERCAMBIADO"]

export function EditDeviceDialog({ open, onOpenChange, device, onEdit }: EditDeviceDialogProps) {
  const [formData, setFormData] = useState<Device>(device)

  useEffect(() => {
    setFormData(device)
  }, [device])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEdit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Dispositivo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo</Label>
              <Select value={formData.modelo} onValueChange={(value) => setFormData({ ...formData, modelo: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {modelos.map((modelo) => (
                    <SelectItem key={modelo} value={modelo}>
                      {modelo}
                    </SelectItem>
                  ))}
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
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {almacenamientos.map((almacenamiento) => (
                    <SelectItem key={almacenamiento} value={almacenamiento}>
                      {almacenamiento}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                <SelectTrigger>
                  <SelectValue />
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
                  <SelectValue />
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
                  <SelectValue />
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
              <Label htmlFor="estadoStock">Estado de Stock</Label>
              <Select
                value={formData.estadoStock}
                onValueChange={(value) => setFormData({ ...formData, estadoStock: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {estadosStock.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
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
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
