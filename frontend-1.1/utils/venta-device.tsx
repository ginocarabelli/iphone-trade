"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
    Battery,
    DollarSign,
    HardDrive, HeartPulse, Leaf,
    Palette,
    Smartphone,
} from "lucide-react"
import { fetchDevices } from "@/lib/inventory-api"
import { Device } from "@/models/models"

interface VentaDeviceProps {
    value: Device | null
    onChange: (device: Device | null) => void
}

export function VentaDevice({ value, onChange }: VentaDeviceProps) {
    const [devices, setDevices] = useState<Device[]>([])
    const [filteredDevices, setFilteredDevices] = useState<Device[]>([])
    const [query, setQuery] = useState("")
    const [showList, setShowList] = useState(false)
    const userJson = localStorage.getItem("user")
    const userId = userJson ? JSON.parse(userJson).id : null

    useEffect(() => {
        if (!userId) return
        fetchDevices(userId)
            .then((data) => {
                setDevices(data)
                setFilteredDevices(data)
            })
            .catch(console.error)
    }, [userId])

    useEffect(() => {
        const lowerQuery = query.toLowerCase()
        setFilteredDevices(
            devices.filter((d) => d.modelo.toLowerCase().includes(lowerQuery))
        )
    }, [query, devices])

    const getBatteryColor = (battery: number) => {
        if (battery >= 90) return "text-green-600"
        if (battery >= 80) return "text-blue-600"
        if (battery >= 70) return "text-yellow-600"
        return "text-red-600"
    }

    return (
        <div className="relative w-full">
            <Input
                placeholder="Buscar por modelo..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setShowList(true)
                }}
                onFocus={() => setShowList(true)}
                onBlur={() => setTimeout(() => setShowList(false), 150)}
            />

            {showList && filteredDevices.length > 0 && (
                <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded border bg-white shadow dark:bg-gray-800">
                    {filteredDevices.map((device) => (
                        <div
                            key={device.id}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                                setQuery(`${device.modelo} - ${device.color} - ${device.almacenamiento} gb - ${device.condicionBateria} - $${device.precioSugerido} - ${device.condicionGeneral} - ${device.estadoFisico}`)
                                onChange(device)
                                setShowList(false)
                            }}
                        >
                            <Smartphone className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">{device.modelo.substring(6)}</span>
                            <div className="flex items-center gap-2 text-xs text-gray-500 ml-auto whitespace-nowrap">
                                <HardDrive className="w-4 h-4" />
                                {device.almacenamiento}GB
                                <Palette className="w-4 h-4 ml-4" />
                                {device.color}
                                <Battery className="w-4 h-4 ml-4" />
                                <span className={getBatteryColor(device.condicionBateria)}>
                                    {device.condicionBateria}%
                                </span>
                                <DollarSign className="w-4 h-4 ml-4 text-green-600" />
                                ${device.precioSugerido.toFixed(2)}
                                <HeartPulse className="w-4 h-4 ml-4" />
                                {device.condicionGeneral}
                                <Leaf className="w-4 h-4 ml-4" />
                                {device.estadoFisico}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
