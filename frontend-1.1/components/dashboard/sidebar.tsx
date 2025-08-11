"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Package, Calculator, ArrowRightLeft, BarChart3, BookOpen, X, LogOut, Settings, Menu} from "lucide-react"

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  userRole?: string
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
}

const menuItems = [
  { id: "inventory", label: "Inventario", icon: Package, roles: ["ADMIN", "USER"] },
  { id: "quotation", label: "Cotización", icon: Calculator, roles: ["ADMIN", "USER"] },
  { id: "transactions", label: "Transacciones", icon: ArrowRightLeft, roles: ["ADMIN", "USER"] },
  { id: "reports", label: "Reportes", icon: BarChart3, roles: ["ADMIN"] },
  { id: "profile", label: "Mi Perfil", icon: Settings, roles: ["ADMIN", "USER"] },
]

export function Sidebar({ activeView, setActiveView, userRole, isOpen, onClose, onLogout }: SidebarProps) {
  const filteredItems = menuItems.filter((item) => item.roles.includes(userRole || "VENDEDOR"))

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">iPhoneTrade</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {filteredItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveView(item.id)
                  onClose()
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        {/* Botón de logout al final */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </>
  )
}
