"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function AuthLayout() {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login")

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md space-y-4">
                <Tabs defaultValue={activeTab} onValueChange={(val) => setActiveTab(val as "login" | "register")}>
                    <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
                        <TabsTrigger value="register">Registrarse</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="register">
                        <RegisterForm onRegistered={() => setActiveTab("login")} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
