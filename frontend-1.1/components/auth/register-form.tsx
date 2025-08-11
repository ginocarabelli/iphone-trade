"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import {registerUser} from "@/lib/auth-api";
import Cookies from "js-cookie";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export function RegisterForm({ onRegistered }: { onRegistered?: () => void }) {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [businessAddress, setBusinessAddress] = useState("")
    const [city, setCity] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await registerUser({
                fullName,
                email,
                password,
                phoneNumber: parseInt(phoneNumber),
                businessAddress,
                city,
                role: "ADMIN"
            })

            if (res?.accessToken) {
                setIsLoading(true)
                Cookies.set("token", res.accessToken, {
                    expires: 1,
                    secure: true,
                    sameSite: "strict",
                })
                toast({
                    title: "Cuenta creada",
                    description: "Ahora podés iniciar sesión",
                })
                onRegistered?.()
                router.push("/dashboard")
            }

        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || "No se pudo registrar",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Registrarse</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <Label htmlFor="fullName">Nombre completo</Label>
                        <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="address">Dirección comercial</Label>
                        <Input id="address" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="city">Ciudad</Label>
                        <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Registrando..." : "Registrarse"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
