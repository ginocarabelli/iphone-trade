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
import {TransactionDto} from "@/lib/types";
import {almacenamientos, modelos, colores, condicionesGenerales, formasPago, estadosFisicos} from "@/lib/options";

interface EditTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction: TransactionDto
  onEdit: (transaction: TransactionDto) => void
}

export function EditTransactionDialog({ open, onOpenChange, transaction, onEdit }: EditTransactionDialogProps) {
  const [formData, setFormData] = useState<TransactionDto>(transaction)

  useEffect(() => {
    setFormData(transaction)
  }, [transaction])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEdit(formData)
    onOpenChange(false)
  }

  const updateDeviceValue = (index: number, value: number) => {
    const updatedDevices = [...formData.dispositivos]
    updatedDevices[index].valorUnitario = value

    // Recalcular total
    let newTotal = 0
    if (formData.tipo === "INTERCAMBIO") {
      const salidas = updatedDevices
        .filter((d) => d.tipoMovimiento === "SALIDA")
        .reduce((sum, d) => sum + d.valorUnitario, 0)
      const entradas = updatedDevices
        .filter((d) => d.tipoMovimiento === "ENTRADA")
        .reduce((sum, d) => sum + d.valorUnitario, 0)
      newTotal = salidas - entradas
    } else {
      newTotal = updatedDevices.reduce((sum, d) => sum + d.valorUnitario, 0)
    }

    setFormData({
      ...formData,
      dispositivos: updatedDevices,
      total: newTotal,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Transacción #{transaction.id}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Transacción</Label>
              <Input value={formData.tipo} disabled />
            </div>
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              />
            </div>
          </div>

          {/* Dispositivos */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Dispositivos</Label>
            {formData.dispositivos.map((device, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={device.tipoMovimiento === "ENTRADA" ? "default" : "secondary"}>
                      {device.tipoMovimiento}
                    </Badge>
                    <span className="font-medium">{device.dispositivo.modelo}</span>
                  </div>
                  <div className="space-y-2">
                    <Label>Valor Unitario (USD)</Label>
                    <Input
                      type="number"
                      value={device.valorUnitario}
                      onChange={(e) => updateDeviceValue(index, Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detalles de pago */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="formaPago">Forma de Pago</Label>
              <Select
                value={formData.formaPago}
                onValueChange={(value) => setFormData({ ...formData, formaPago: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formasPago.map((forma) => (
                    <SelectItem key={forma} value={forma}>
                      {forma}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="total">{formData.tipo === "INTERCAMBIO" ? "Diferencia (USD)" : "Total (USD)"}</Label>
              <Input
                id="total"
                type="number"
                value={formData.total}
                onChange={(e) => setFormData({ ...formData, total: Number(e.target.value) })}
                readOnly={formData.tipo === "INTERCAMBIO"}
                className={formData.total < 0 ? "text-red-600 font-bold" : ""}
              />
            </div>
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
