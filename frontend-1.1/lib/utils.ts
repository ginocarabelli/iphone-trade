import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {fetchDeviceModels} from "@/lib/inventory-api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateQuotation = async (formData: {
  modelo: string
  almacenamiento: string
  estadoFisico: "EXCELENTE" | "BUENO" | "REGULAR" | "MALO"
  condicionGeneral: "NUEVO" | "SEMIUSADO" | "USADO"
  condicionBateria: number
}) => {
  try {
    const deviceModels = await fetchDeviceModels()

    const foundModel = deviceModels.find(
        (m) =>
            m.modelo.toLowerCase() === formData.modelo.toLowerCase() &&
            m.almacenamiento.toLowerCase() === formData.almacenamiento.toLowerCase()
    )

    const DEFAULT_BASE_PRICE = 400
    const basePrice = foundModel ? foundModel.base_price_usd : DEFAULT_BASE_PRICE

    const estadoMultiplier =
        {
          EXCELENTE: 1.0,
          BUENO: 0.85,
          REGULAR: 0.7,
          MALO: 0.5,
        }[formData.estadoFisico] || 0.85

    const condicionMultiplier =
        {
          NUEVO: 1.0,
          SEMIUSADO: 0.9,
          USADO: 0.8,
        }[formData.condicionGeneral] || 0.85

    const batteryMultiplier = formData.condicionBateria / 100

    const finalPrice = Math.round(basePrice * estadoMultiplier * condicionMultiplier * batteryMultiplier)

    return finalPrice
  } catch (error) {
    console.error(error)
    return 400 // fallback
  }
}
