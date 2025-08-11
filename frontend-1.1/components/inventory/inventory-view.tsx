"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Download } from "lucide-react"
import { AddDeviceDialog } from "./add-device-dialog"
import { EditDeviceDialog } from "./edit-device-dialog"
import { DeviceCard } from "./device-card"
import { useToast } from "@/hooks/use-toast"
import {addDevice, fetchDevices} from "@/lib/inventory-api";
import {Device, InventoryViewProps} from "@/models/models";

export function InventoryView({ id, userRole }: { id: string; userRole?: string }) {
  const [devices, setDevices] = useState<Device[]>([])
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingDevice, setEditingDevice] = useState<Device | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    setIsLoading(true)
    fetchDevices(id)
        .then((data) => {
          setDevices(data)
          setFilteredDevices(data)
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          toast({ title: "Error", description: "No se pudo cargar el inventario", variant: "destructive" })
          console.error(error)
        })
  }, [])

  useEffect(() => {
    const filtered = devices.filter(
      (device) =>
        device.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.almacenamiento.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredDevices(filtered)
  }, [searchTerm, devices])

  const handleAddDevice = (deviceData: Omit<Device, "id" | "fechaIngreso" | "estadoStock">) => {
    const newDevice: Device = {
      ...deviceData,
      fechaIngreso: new Date().toISOString().split("T")[0],
      estadoStock: "DISPONIBLE",
      creadoPor: Number(id)
    }
    addDevice(newDevice)
        .then((data) => {
          setIsLoading(false)
          toast({ title: "Añadido", description: "Dispositivo añadido al inventario", variant: "default" })
          setDevices([...devices, data])
        })
        .catch((error) => {
          setIsLoading(false)
          toast({ title: "Error", description: "No se pudo cargar el inventario", variant: "destructive" })
          console.error(error)
        })
    toast({
      title: "Dispositivo agregado",
      description: `${newDevice.modelo} ha sido agregado al inventario`,
    })
  }

  const handleEditDevice = (deviceData: Device) => {
    setDevices(devices.map((device) => (device.id === deviceData.id ? deviceData : device)))
    toast({
      title: "Dispositivo actualizado",
      description: `${deviceData.modelo} ha sido actualizado`,
    })
  }

  const handleDeleteDevice = (id: number) => {
    setDevices(devices.filter((device) => device.id !== id))
    toast({
      title: "Dispositivo eliminado",
      description: "El dispositivo ha sido eliminado del inventario",
    })
  }

  const exportToExcel = () => {
    // Simulación de exportación a Excel
    const csvContent = [
      [
        "ID",
        "Modelo",
        "Almacenamiento",
        "Color",
        "Estado Físico",
        "Batería %",
        "Condición",
        "Precio USD",
        "Fecha Ingreso",
        "Estado Stock",
      ],
      ...devices.map((device) => [
        device.id,
        device.modelo,
        device.almacenamiento,
        device.color,
        device.estadoFisico,
        device.condicionBateria,
        device.condicionGeneral,
        device.precioSugerido,
        device.fechaIngreso,
        device.estadoStock,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "inventario_iphones.csv"
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Exportación exitosa",
      description: "El inventario ha sido exportado a Excel",
    })
  }

  const availableDevices = devices.filter((d) => d.estadoStock === "DISPONIBLE").length
  const soldDevices = devices.filter((d) => d.estadoStock === "VENDIDO").length
  const totalValue = devices.filter((d) => d.estadoStock === "DISPONIBLE").reduce((sum, d) => sum + d.precioSugerido, 0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dispositivos Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableDevices}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dispositivos Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{soldDevices}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total Disponible</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar dispositivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToExcel} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Dispositivo
          </Button>
        </div>
      </div>

      {/* Lista de dispositivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDevices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onEdit={() => setEditingDevice(device)}
            onDelete={() => handleDeleteDevice(device.id!)}
          />
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron dispositivos</p>
        </div>
      )}

      {/* Diálogos */}
      <AddDeviceDialog open={showAddDialog} onOpenChange={setShowAddDialog} onAdd={handleAddDevice} />

      {editingDevice && (
        <EditDeviceDialog
          open={!!editingDevice}
          onOpenChange={() => setEditingDevice(null)}
          device={editingDevice}
          onEdit={handleEditDevice}
        />
      )}
    </div>
  )
}
