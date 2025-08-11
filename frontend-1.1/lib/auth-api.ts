// lib/api.ts
export interface RegisterPayload {
    fullName: string
    email: string
    password: string
    phoneNumber: number
    businessAddress: string
    city: string
    role: "ADMIN" | "VENDEDOR"
}

export async function registerUser(payload: RegisterPayload): Promise<void> {
    const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || "Registro fallido")
    }
}

// lib/api.ts
export interface LoginPayload {
    email: string
    password: string
}

export async function loginUser(payload: LoginPayload): Promise<{ accessToken: string }> {
    const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error("Credenciales incorrectas")
    }

    return await response.json()
}