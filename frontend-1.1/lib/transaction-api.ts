import Cookies from "js-cookie";
import {TransactionDto} from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/transactions"

export async function getAllTransactions(): Promise<TransactionDto[]> {
    const token = Cookies.get("token")

    const res = await fetch(`${BASE_URL}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })

    console.log(res)

    if (!res.ok) {
        throw new Error("Error al cargar las transacciones")
    }

    return await res.json()
}

export async function createTransaction(data: TransactionDto): Promise<TransactionDto> {
    const token = Cookies.get("token")

    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const errorText = await res.text()
        console.error("Error del backend:", errorText)
        throw new Error("Error al registrar la transacción")
    }

    return await res.json()
}

export async function updateTransaction(id: number, data: TransactionDto): Promise<TransactionDto> {
    const token = Cookies.get("token")

    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        throw new Error("Error al actualizar la transacción")
    }

    return await res.json()
}

export async function deleteTransaction(id: number): Promise<void> {
    const token = Cookies.get("token")

    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    console.log(res)
    if (!res.ok) {
        throw new Error("Error al eliminar la transacción")
    }
}
