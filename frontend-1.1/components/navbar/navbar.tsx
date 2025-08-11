import { useState, useEffect } from "react"
import Link from "next/link"
import { Smartphone, Menu, X } from "lucide-react"
import Cookies from "js-cookie"
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get("token")
        setIsLoggedIn(!!token)
    }, [])

    const handleLogout = () => {
        Cookies.remove("token")
        setIsLoggedIn(false)
        router.push("/auth")
    }

    return (
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Smartphone className="h-8 w-8 text-blue-600" />
                        <span className="font-bold text-xl text-gray-900">iPhoneTrade</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {!isLoggedIn ? (
                            <>
                                <Link href="/quotation" className="text-gray-700 hover:text-blue-600">
                                    Cotizaciones
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t px-4 pb-4 space-y-5 py-5 text-center">
                    {!isLoggedIn ? (
                        <>
                            <Link href="/quotation" className="block text-gray-700 hover:text-blue-600">
                                Cotizaciones
                            </Link>
                            <Link href="/auth" className="block text-gray-700 hover:text-blue-600">
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/register"
                                className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Registrarse
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600">
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}
