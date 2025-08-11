"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BarChart3, Download, FileText, CalendarIcon, TrendingUp, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"
import {fetchReport, ReportData} from "@/lib/reports-api";

export function ReportsView() {
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [reportType, setReportType] = useState("ventas")
  const [reportData, setReportData] = useState<ReportData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const generateReport = async () => {
    if (!dateFrom || !dateTo) {
      toast({
        title: "Error",
        description: "Debes seleccionar un rango de fechas válido",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      const desde = dateFrom.toISOString().split("T")[0]
      const hasta = dateTo.toISOString().split("T")[0]

      const data = await fetchReport(reportType, desde, hasta)
      console.log(data)
      setReportData(data)
      toast({
        title: "Reporte generado",
        description: `Reporte de ${reportType} generado exitosamente`,
      })
    } catch (error) {
      toast({
        title: "Error al generar reporte",
        description: (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const exportToPDF = () => {
    // Simulación de exportación a PDF
    toast({
      title: "Exportando a PDF",
      description: "El reporte se está descargando...",
    })

    // Aquí iría la lógica real de exportación a PDF
    setTimeout(() => {
      toast({
        title: "PDF generado",
        description: "El reporte ha sido descargado exitosamente",
      })
    }, 2000)
  }

  const exportToExcel = () => {
    // Simulación de exportación a Excel
    const csvContent = [
      ["Fecha", "Cantidad", "Monto Total"],
      ...reportData.map((row) => [row.fecha, row.cantidad, row.montoTotal]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `reporte_${reportType}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Excel generado",
      description: "El reporte ha sido exportado a Excel",
    })
  }

  const totalAmount = reportData.reduce((sum, item) => sum + item.montoTotal, 0)
  const totalQuantity = reportData.reduce((sum, item) => sum + item.cantidad, 0)
  const averageAmount = reportData.length > 0 ? totalAmount / reportData.length : 0

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reportes y Análisis</h1>
        <p className="text-muted-foreground">Genera reportes detallados de ventas, compras e intercambios</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Configuración del Reporte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Reporte</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ventas">Ventas</SelectItem>
                  <SelectItem value="compras">Compras</SelectItem>
                  <SelectItem value="intercambios">Intercambios</SelectItem>
                  <SelectItem value="mixto">Resumen Financiero</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fecha Desde</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Fecha Hasta</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button onClick={generateReport} disabled={isLoading} className="w-full">
                {isLoading ? "Generando..." : "Generar Reporte"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas del reporte */}
      {reportData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Cantidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalQuantity}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Monto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalAmount.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Promedio Diario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">${averageAmount.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resultados del reporte */}
      {reportData.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="capitalize">Reporte de {reportType}</CardTitle>
              <div className="flex gap-2">
                <Button onClick={exportToPDF} variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar PDF
                </Button>
                <Button onClick={exportToExcel} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Excel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      {new Date(item.fecha).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">{reportData.length} transacciones</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${item.montoTotal.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      Promedio: ${(item.montoTotal / item.cantidad).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {reportData.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Configura los filtros y genera un reporte para ver los resultados</p>
        </div>
      )}
    </div>
  )
}
