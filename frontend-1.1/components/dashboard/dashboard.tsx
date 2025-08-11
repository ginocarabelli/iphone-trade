"use client"

import {useEffect, useState} from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"
import { InventoryView } from "@/components/inventory/inventory-view"
import { QuotationView } from "@/components/quotation/quotation-view"
import { TransactionView } from "@/components/transaction/transaction-view"
import { ReportsView } from "@/components/reports/reports-view"
import {ProfileView, UserData} from "@/components/profile/profile-view"
import { useAuthGuard } from "@/hooks/auth-guard"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Cookies from "js-cookie";
import {fetchUserById} from "@/lib/user";

export function Dashboard() {
    const user = useAuthGuard()
    const [activeView, setActiveView] = useState("inventory")
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userData, setUserData] = useState<UserData>()
    const router = useRouter()

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const user = JSON.parse(storedUser)
            const userId = user?.id

            if (userId) {
                fetchUserById(userId)
                    .then((data) => setUserData(data))
                    .catch((err) => console.error("Error fetching user data:", err))
            }
        }
    }, [])

    if (!user) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    const handleLogout = () => {
        Cookies.remove("token")
        localStorage.removeItem("user")
        router.push("/auth")
    }

    const renderView = () => {
        switch (activeView) {
            case "inventory":
                return <InventoryView id={user.jti} userRole={user.role} />
            case "quotation":
                return <QuotationView />
            case "transactions":
                return <TransactionView />
            case "reports":
                return <ReportsView />
            case "profile":
                return <ProfileView userData={userData} />
            default:
                return <InventoryView id={user.jti} userRole={user.role} />
        }
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar y overlay */}
            <Sidebar
                activeView={activeView}
                setActiveView={setActiveView}
                userRole={user.role}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onLogout={handleLogout}
            />

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <div className="p-4 lg:hidden">
                    <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                <main className="flex-1 overflow-auto p-4 pt-0 lg:p-6">
                    {renderView()}
                </main>
            </div>
        </div>
    )
}
