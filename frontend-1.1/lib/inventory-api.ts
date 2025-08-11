import Cookies from "js-cookie"
import { Device } from "@/models/models"
import { DeviceModelPrice } from "./types"

export async function fetchDevices(id : string): Promise<Device[]> {
    const token = Cookies.get("token")

    const res = await fetch(`http://localhost:8080/api/devices/user/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        throw new Error("Error al obtener los dispositivos")
    }

    return res.json()
}

export async function addDevice(device: Device): Promise<Device> {
    const token = Cookies.get("token")
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    const res = await fetch("http://localhost:8080/api/devices", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-User-Id": user.id
        },
        body: JSON.stringify(device),
    })

    if (!res.ok) {
        throw new Error("Error al agregar dispositivo")
    }

    return res.json()
}

export async function updateDevice(id: number, updatedDevice: Partial<Device>): Promise<Device> {
    const token = Cookies.get("token")

    const res = await fetch(`http://localhost:8080/api/devices/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDevice),
    })

    if (!res.ok) {
        throw new Error("Error al actualizar dispositivo")
    }

    return res.json()
}

export async function deleteDevice(id: number): Promise<void> {
    const token = Cookies.get("token")

    const res = await fetch(`http://localhost:8080/api/devices/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        throw new Error("Error al eliminar dispositivo")
    }
}

export async function fetchDeviceModels(): Promise<DeviceModelPrice[]> {
    const token = Cookies.get("token")

    const res = await fetch('http://localhost:8080/api/modelos', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (!res.ok) {
        throw new Error('No se pudo obtener la lista de modelos')
    }
    const data = await res.json()
    console.log(data)
    return data
}