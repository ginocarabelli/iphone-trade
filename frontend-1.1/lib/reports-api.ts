import Cookies from "js-cookie";

export interface ReportData {
    fecha: string
    cantidad: number
    montoTotal: number
    tipo?: string
}

export interface FetchReportParams {
    desde: string
    hasta: string
    tipo?: string
}
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export interface ReportData {
    fecha: string
    cantidad: number
    montoTotal: number
}

export async function fetchReport(tipo: string, desde: string, hasta: string): Promise<ReportData[]> {
    const storedUser = localStorage.getItem("user")
    const usuarioId = storedUser ? JSON.parse(storedUser).id : null

    if (!usuarioId) {
        throw new Error("Usuario no autenticado o sin ID en localStorage")
    }

    const endpoint = `${BASE_URL}/reportes/${tipo}?desde=${desde}&hasta=${hasta}&usuarioId=${usuarioId}`

    const token = Cookies.get("token")

    const response = await fetch(endpoint,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    )

    if (!response.ok) {
        throw new Error(`Error al obtener el reporte de ${tipo}`)
    }

    return await response.json()
}
