import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface QuotationConfigModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (params: ConfigParams) => void
}

export interface ConfigParams {
    estadoMultipliers: Record<string, number>
    condicionMultipliers: Record<string, number>
    minBatteryMultiplier: number
}

const defaultParams: ConfigParams = {
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

export function QuotationConfigModal({
                                         isOpen,
                                         onClose,
                                         onSave,
                                     }: QuotationConfigModalProps) {
    const [configParams, setConfigParams] = useState<ConfigParams>(defaultParams)

    useEffect(() => {
        if (isOpen) {
            const stored = localStorage.getItem("quotationConfig")
            if (stored) {
                setConfigParams(JSON.parse(stored))
            }
        }
    }, [isOpen])

    const handleSave = () => {
        localStorage.setItem("quotationConfig", JSON.stringify(configParams))
        onSave(configParams)
        onClose()
    }

    const handleReset = () => {
        setConfigParams(defaultParams)
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pt-6 px-4"
            style={{ margin: 0, padding: 0, top: 0 }}
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Configuración de Parámetros</h2>
                </div>

                <div className="overflow-y-auto p-4 space-y-6 flex-1">
                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-800">Multiplicadores por Estado Físico</h3>
                        {Object.entries(configParams.estadoMultipliers).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <span>{key}</span>
                                <input
                                    type="number"
                                    value={value}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    onChange={(e) =>
                                        setConfigParams((prev) => ({
                                            ...prev,
                                            estadoMultipliers: {
                                                ...prev.estadoMultipliers,
                                                [key]: parseFloat(e.target.value),
                                            },
                                        }))
                                    }
                                    className="border rounded px-2 py-1 w-24 text-right"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-800">Multiplicadores por Condición General</h3>
                        {Object.entries(configParams.condicionMultipliers).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <span>{key}</span>
                                <input
                                    type="number"
                                    value={value}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    onChange={(e) =>
                                        setConfigParams((prev) => ({
                                            ...prev,
                                            condicionMultipliers: {
                                                ...prev.condicionMultipliers,
                                                [key]: parseFloat(e.target.value),
                                            },
                                        }))
                                    }
                                    className="border rounded px-2 py-1 w-24 text-right"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-medium text-gray-800">Batería</h3>
                        <div className="flex items-center justify-between">
                            <span>Mínimo multiplicador</span>
                            <input
                                type="number"
                                value={configParams.minBatteryMultiplier}
                                min={0}
                                max={1}
                                step={0.01}
                                onChange={(e) =>
                                    setConfigParams((prev) => ({
                                        ...prev,
                                        minBatteryMultiplier: parseFloat(e.target.value),
                                    }))
                                }
                                className="border rounded px-2 py-1 w-24 text-right"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t flex justify-between gap-2">
                    <Button variant="outline" onClick={handleReset}>
                        Restablecer valores
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSave}>Guardar</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
