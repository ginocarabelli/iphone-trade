"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { Dashboard } from "@/components/dashboard/dashboard"
import {AuthLayout} from "@/components/auth/auth-layout";
import Cookies from "js-cookie";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <AuthLayout />
  }

  return <Dashboard/>
}
