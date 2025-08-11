"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

export interface DecodedToken {
    sub: string
    id: string
    jti: string
    role?: string
    exp?: number
    iat?: number
}

export function useAuthGuard() {
    const [user, setUser] = useState<DecodedToken | null>(null)
    const router = useRouter()
    useEffect(() => {
        const token = Cookies.get("token")
        if (!token) {
            router.push("/auth")
            return
        }

        try {
            const decoded = jwtDecode<DecodedToken>(token)
            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                Cookies.remove("token")
                router.push("/auth")
                return
            }
            localStorage.setItem("user", JSON.stringify({ id: decoded.jti, username: decoded.sub }))
            setUser(decoded)
        } catch (error) {
            Cookies.remove("token")
            router.push("/auth")
        }
    }, [router])

    return user
}
