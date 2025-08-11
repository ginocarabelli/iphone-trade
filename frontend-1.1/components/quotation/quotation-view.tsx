"use client"

import React, {useEffect} from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import {Calculator, Settings2, Smartphone} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import {colores, condicionesGenerales, estadosFisicos} from "@/lib/options";
import {fetchDeviceModels} from "@/lib/inventory-api";
import {DeviceModelPrice} from "@/lib/types";
import {QuotationConfigModal} from "@/utils/quotation-config-modal";

interface QuotationData {
  modelo: string
  almacenamiento: string
  color: string
  estadoFisico: string
  condicionBateria: number
  condicionGeneral: string
}

interface QuotationResult {
  id: number
  valorEstimado: number
  fecha: string
  dispositivo: QuotationData
}

const DEFAULT_CONFIG = {
  estadoMultipliers: {
    EXCELENTE: 1.0,
    BUENO: 0.85,
    REGULAR: 0.7,
    MALO: 0.5,
  },
  condicionMultipliers: {
    NUEVO: 1.0,
    SEMIUSADO: 0.9,
    USADO: 0.8,
  },
  minBatteryMultiplier: 0.5,
}

export function QuotationView() {
  const [formData, setFormData] = useState<QuotationData>({
    modelo: "",
    almacenamiento: "",
    color: "",
    estadoFisico: "",
    condicionBateria: 85,
    condicionGeneral: "",
  })
  const [quotationResult, setQuotationResult] = useState<QuotationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [deviceModels, setDeviceModels] = useState<DeviceModelPrice[]>([])
  const [almacenamientosDisponibles, setAlmacenamientosDisponibles] = useState<string[]>([])
  const { toast } = useToast()

  const [configModalOpen, setConfigModalOpen] = useState(false)
  const [quotationConfig, setQuotationConfig] = useState(() => {
    const saved = localStorage.getItem("quotationConfig")
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG
  })

  useEffect(() => {
    fetchDeviceModels().then(setDeviceModels)
  }, [])

  useEffect(() => {
    if (!formData.modelo) {
      setAlmacenamientosDisponibles([])
      return
    }

    const disponibles = Array.from(
        new Set(
            deviceModels
                .filter((m) => m.modelo === formData.modelo)
                .map((m) => m.almacenamiento),
        ),
    ).sort()

    setAlmacenamientosDisponibles(disponibles)
    setFormData((prev) => ({ ...prev, almacenamiento: "" }))
  }, [formData.modelo, deviceModels])

  const isFormComplete = Object.values(formData).every((value) =>
      typeof value === "number" ? value >= 0 : value.trim() !== "",
  )

  const resetForm = () => {
    setFormData({
      modelo: "",
      almacenamiento: "",
      color: "",
      estadoFisico: "",
      condicionBateria: 85,
      condicionGeneral: "",
    })
    setQuotationResult(null)
  }

  const calculateQuotation = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormComplete) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor, completa todos los campos para calcular la cotización.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const foundModel = deviceModels.find(
        (m) =>
            m.modelo.toLowerCase() === formData.modelo.toLowerCase() &&
            m.almacenamiento.toLowerCase() === formData.almacenamiento.toLowerCase(),
    )

    const DEFAULT_BASE_PRICE = 400
    const basePrice = foundModel ? foundModel.basePriceUsd : DEFAULT_BASE_PRICE

    const estadoMultiplier =
        quotationConfig.estadoMultipliers[formData.estadoFisico?.toUpperCase()] ?? 0.85

    const condicionMultiplier =
        quotationConfig.condicionMultipliers[formData.condicionGeneral?.toUpperCase()] ?? 0.85

    const batteryMultiplier = Math.max(
        formData.condicionBateria / 100,
        quotationConfig.minBatteryMultiplier,
    )

    const finalPrice = Math.round(
        basePrice * estadoMultiplier * condicionMultiplier * batteryMultiplier,
    )

    const result: QuotationResult = {
      id: Date.now(),
      valorEstimado: finalPrice,
      fecha: new Date().toISOString().split("T")[0],
      dispositivo: formData,
    }

    setQuotationResult(result)
    setIsLoading(false)

    toast({
      title: "Cotización calculada",
      description: `Valor estimado: $${finalPrice.toLocaleString()}`,
    })
  }

  const getDeviceImage = (modelo: string, color: string) => {
    const modeloLower = modelo.toLowerCase()
    const colorLower = color.toLowerCase()

    // URLs oficiales de Apple para cada modelo y color
    if (modeloLower.includes("15 pro max")) {
      if (colorLower.includes("negro") || colorLower.includes("titanio negro"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-blacktitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112"
      if (colorLower.includes("blanco") || colorLower.includes("titanio blanco"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-whitetitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112"
      if (colorLower.includes("azul") || colorLower.includes("titanio azul"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-bluetitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112"
      return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-naturaltitanium-select?wid=470&hei=556&fmt=png-alpha&.v=1692895204112"
    }

    if (modeloLower.includes("14 pro max")) {
      if (colorLower.includes("negro") || colorLower.includes("espacial"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-spaceblack-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896"
      if (colorLower.includes("dorado"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-gold-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896"
      if (colorLower.includes("plata"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-silver-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896"
      if (colorLower.includes("morado"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-deeppurple-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896"
      return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-spaceblack-select?wid=470&hei=556&fmt=png-alpha&.v=1663703841896"
    }

    if (modeloLower.includes("13 pro max")) {
      if (colorLower.includes("negro") || colorLower.includes("grafito"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000"
      if (colorLower.includes("dorado"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000"
      if (colorLower.includes("plata"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-silver-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000"
      if (colorLower.includes("azul"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-sierablue-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000"
      return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1631652954000"
    }

    if (modeloLower.includes("13")) {
      if (colorLower.includes("negro") || colorLower.includes("medianoche"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000"
      if (colorLower.includes("azul"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-blue-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000"
      if (colorLower.includes("rosa"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000"
      if (colorLower.includes("rojo"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-red-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000"
      if (colorLower.includes("blanco"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-starlight-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000"
      return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000"
    }

    if (modeloLower.includes("12 pro max")) {
      if (colorLower.includes("negro") || colorLower.includes("grafito"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1604021661000"
      if (colorLower.includes("dorado"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-gold-select?wid=470&hei=556&fmt=png-alpha&.v=1604021661000"
      if (colorLower.includes("plata"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-silver-select?wid=470&hei=556&fmt=png-alpha&.v=1604021661000"
      if (colorLower.includes("azul"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-pacificblue-select?wid=470&hei=556&fmt=png-alpha&.v=1604021661000"
      return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha&.v=1604021661000"
    }

    if (modeloLower.includes("12")) {
      if (colorLower.includes("negro"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000"
      if (colorLower.includes("blanco"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-white-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000"
      if (colorLower.includes("rojo"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-red-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000"
      if (colorLower.includes("verde"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-green-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000"
      if (colorLower.includes("azul"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000"
      if (colorLower.includes("morado"))
        return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1617492507000"
      return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343704000"
    }

    // Fallback para modelos no encontrados
    return "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1629842709000"
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cotización de Dispositivos</h1>
        <p className="text-muted-foreground">
          Ingresa las características de tu iPhone para obtener una cotización estimada
        </p>
        <div className="mt-4">
          <Button
              variant="secondary"
              onClick={() => setConfigModalOpen(true)}
              className="flex items-center gap-2"
          >
            <Settings2 className="h-4 w-4" />
            Configurar parámetros
          </Button>
        </div>
      </div>

      <QuotationConfigModal
          isOpen={configModalOpen}
          onClose={() => setConfigModalOpen(false)}
          onSave={(newConfig) => {
            setQuotationConfig(newConfig)
            setConfigModalOpen(false)
            localStorage.setItem("quotationConfig", JSON.stringify(newConfig))
          }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Formulario de cotización - Más ancho */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Datos del Dispositivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={calculateQuotation} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo</Label>
                  <Select
                      value={formData.modelo}
                      onValueChange={(value) => setFormData({ ...formData, modelo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...new Set(deviceModels.map((m) => m.modelo))].sort().map((modeloUnico) => (
                          <SelectItem key={modeloUnico} value={modeloUnico}>
                            {modeloUnico}
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
                      disabled={almacenamientosDisponibles.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={almacenamientosDisponibles.length ? "Seleccionar capacidad" : "Elegí un modelo primero"} />
                    </SelectTrigger>
                    <SelectContent>
                      {almacenamientosDisponibles.map((almacenamiento) => (
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
              </div>

              <div className="space-y-4">
                <Label htmlFor="condicionBateria">Condición de Batería: {formData.condicionBateria}%</Label>
                <Slider
                  value={[formData.condicionBateria]}
                  onValueChange={(value) => setFormData({ ...formData, condicionBateria: value[0] })}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Calculando..." : "Calcular Cotización"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Limpiar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Resultado de cotización */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Resultado de Cotización
            </CardTitle>
          </CardHeader>
          <CardContent>
            {quotationResult ? (
              <div className="space-y-6">
                {/* Imagen del dispositivo */}
                <div className="flex justify-center">
                  <Image
                    src={
                      getDeviceImage(quotationResult.dispositivo.modelo, quotationResult.dispositivo.color) ||
                      "/placeholder.svg"
                    }
                    alt={`${quotationResult.dispositivo.modelo} ${quotationResult.dispositivo.color}`}
                    width={200}
                    height={250}
                    className="object-contain"
                    crossOrigin="anonymous"
                  />
                </div>

                {/* Detalles del dispositivo */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-center">{quotationResult.dispositivo.modelo}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Almacenamiento:</span>
                      <span className="font-medium">{quotationResult.dispositivo.almacenamiento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Color:</span>
                      <span className="font-medium">{quotationResult.dispositivo.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estado:</span>
                      <span className="font-medium">{quotationResult.dispositivo.estadoFisico}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Batería:</span>
                      <span className="font-medium">{quotationResult.dispositivo.condicionBateria}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condición:</span>
                      <span className="font-medium">{quotationResult.dispositivo.condicionGeneral}</span>
                    </div>
                  </div>
                </div>

                {/* Valor estimado */}
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Valor Estimado</p>
                  <p className="text-4xl font-bold text-green-600">${quotationResult.valorEstimado.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-2">Cotización #{quotationResult.id}</p>
                </div>

                <div className="text-center text-sm text-muted-foreground space-y-1">
                  <p>Cotización válida por 7 días</p>
                  <p>Fecha: {new Date(quotationResult.fecha).toLocaleDateString()}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Completa el formulario para obtener una cotización</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
