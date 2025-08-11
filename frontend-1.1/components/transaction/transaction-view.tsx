"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  ArrowRightLeft,
  ShoppingCart,
  DollarSign,
  Edit,
  Trash2,
  MoreHorizontal,
  Smartphone,
  HardDrive, Battery, HeartPulse, Leaf
} from "lucide-react"
import { TransactionDialog } from "./transaction-dialog"
import { EditTransactionDialog } from "./edit-transaction-dialog"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction
} from "@/lib/transaction-api";
import { TransactionDto } from "@/lib/types"

export function TransactionView() {
  const [transactions, setTransactions] = useState<TransactionDto[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showDialog, setShowDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [transactionType, setTransactionType] = useState<"COMPRA" | "VENTA" | "INTERCAMBIO">("VENTA")
  const [editingTransaction, setEditingTransaction] = useState<TransactionDto | null>(null)
  const [deletingTransaction, setDeletingTransaction] = useState<TransactionDto | null>(null) // Corregido el typo
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await getAllTransactions()
        console.log("Transacciones obtenidas:", data)
        setTransactions(data)
        setFilteredTransactions(data)
      } catch (err) {
        console.error("Error al cargar transacciones", err)
        toast({
          title: "Error",
          description: "No se pudieron cargar las transacciones",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])


  useEffect(() => {
    let filtered = transactions
    if (activeTab !== "all") {
      filtered = filtered.filter((t) => t.tipo.toLowerCase() === activeTab)
    }
    if (searchTerm) {
      filtered = filtered.filter(
          (t) =>
              t.dispositivos.some((d) => d.dispositivo.modelo.toLowerCase().includes(searchTerm.toLowerCase())) ||
              t.formaPago?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    setFilteredTransactions(filtered)
  }, [searchTerm, activeTab, transactions])

  const handleAddTransaction = async (transactionData: TransactionDto) => {
    try {
      const newTransaction = await createTransaction(transactionData)
      setTransactions([newTransaction, ...transactions])

      let message = ""
      if (transactionData.tipo === "COMPRA") {
        message = `Compra registrada - Dispositivo agregado al inventario`
      } else if (transactionData.tipo === "VENTA") {
        message = `Venta registrada por $${transactionData.total}`
      } else {
        const diferencia = transactionData.total
        message = diferencia >= 0
            ? `Intercambio registrado - Cliente debe pagar $${diferencia}`
            : `Intercambio registrado - Cliente debe recibir $${Math.abs(diferencia)}`
      }

      toast({ title: "Transacción registrada", description: message })
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo registrar la transacción",
        variant: "destructive",
      })
    }
  }

  const handleEditTransaction = async (transactionData: TransactionDto) => {
    try {
      const updated = await updateTransaction(transactionData.id!, transactionData)
      setTransactions(transactions.map((t) => (t.id === updated.id ? updated : t)))
      toast({
        title: "Transacción actualizada",
        description: `Transacción #${updated.id} ha sido actualizada`,
      })
    } catch {
      toast({
        title: "Error",
        description: "No se pudo actualizar la transacción",
        variant: "destructive",
      })
    }
  }

  // Función helper para cerrar el diálogo de eliminar
  const closeDeleteDialog = () => {
    console.log("Cerrando diálogo de eliminar") // Debug
    setShowDeleteDialog(false)
    setDeletingTransaction(null)
  }

  const handleDeleteTransaction = async () => {
    if (!deletingTransaction) return

    const transactionId = deletingTransaction.id
    console.log("Eliminando transacción:", transactionId) // Debug

    try {
      await deleteTransaction(transactionId!)
      setTransactions(prev => prev.filter((t) => t.id !== transactionId))
      toast({
        title: "Transacción eliminada",
        description: `Transacción #${transactionId} ha sido eliminada`,
      })
    } catch (error) {
      console.error("Error al eliminar:", error) // Debug
      toast({
        title: "Error",
        description: "No se pudo eliminar la transacción",
        variant: "destructive",
      })
    }

    // Siempre cerrar el diálogo, sin importar si hubo error
    closeDeleteDialog()
  }

  const openEditDialog = (transaction: TransactionDto) => {
    setEditingTransaction(transaction)
    setShowEditDialog(true)
  }

  const openDeleteDialog = (transaction: TransactionDto) => {
    setDeletingTransaction(transaction)
    setShowDeleteDialog(true)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "VENTA":
        return "bg-green-100 text-green-800"
      case "COMPRA":
        return "bg-blue-100 text-blue-800"
      case "INTERCAMBIO":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "VENTA":
        return <DollarSign className="h-4 w-4" />
      case "COMPRA":
        return <ShoppingCart className="h-4 w-4" />
      case "INTERCAMBIO":
        return <ArrowRightLeft className="h-4 w-4" />
      default:
        return null
    }
  }

  const totalVentas = transactions.filter((t) => t.tipo === "VENTA").reduce((sum, t) => sum + t.total, 0)
  const totalCompras = transactions.filter((t) => t.tipo === "COMPRA").reduce((sum, t) => sum + t.total, 0)
  const totalIntercambios = transactions.filter((t) => t.tipo === "INTERCAMBIO").reduce((sum, t) => sum + t.total, 0)

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    )
  }

  return (
      <div className="space-y-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Ventas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalVentas.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Total Compras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${totalCompras.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4" />
                Total Intercambios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">${totalIntercambios.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Controles */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
                placeholder="Buscar transacciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row justify-between">
            <Button
                onClick={() => {
                  setTransactionType("COMPRA")
                  setShowDialog(true)
                }}
                variant="outline"
                className="xs:w-full"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Nueva Compra
            </Button>
            <Button
                onClick={() => {
                  setTransactionType("VENTA")
                  setShowDialog(true)
                }}
                variant="outline"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Nueva Venta
            </Button>
            <Button
                onClick={() => {
                  setTransactionType("INTERCAMBIO")
                  setShowDialog(true)
                }}
            >
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Nuevo Intercambio
            </Button>
          </div>
        </div>

        {/* Tabs y lista de transacciones */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="venta">Ventas</TabsTrigger>
            <TabsTrigger value="compra">Compras</TabsTrigger>
            <TabsTrigger value="intercambio">Intercambios</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredTransactions.map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(transaction.tipo)}
                          <Badge className={getTypeColor(transaction.tipo)}>{transaction.tipo}</Badge>
                        </div>
                        <div>
                          <p className="font-medium">Transacción #{transaction.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.fecha).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-lg">${transaction.total.toLocaleString()}</p>
                          {transaction.formaPago && (
                              <p className="text-sm text-muted-foreground">{transaction.formaPago}</p>
                          )}
                        </div>

                        {/* Menú de acciones */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(transaction)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDeleteDialog(transaction)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Dispositivos involucrados */}
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium mb-2">Dispositivos:</p>
                      <div className="space-y-1">
                        {transaction.dispositivos.map((dispositivo, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                        <span className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <Badge className="flex gap-2" variant={dispositivo.tipoMovimiento === "ENTRADA" ? "default" : "secondary"}>
                            {dispositivo.tipoMovimiento}
                          </Badge>
                          <span className="flex gap-2">
                            <Smartphone size={16}/> {dispositivo.dispositivo.modelo}
                          </span>
                          <span className="flex gap-2">
                            <HardDrive size={16}/>{dispositivo.dispositivo.almacenamiento} gb
                          </span>
                          <span className="flex gap-2">
                            <Battery size={16}/> %{dispositivo.dispositivo.condicionBateria}
                          </span>
                          <span className="flex gap-2">
                            <HeartPulse size={16}/> {dispositivo.dispositivo.condicionGeneral}
                          </span>
                          <span className="flex gap-2">
                            <Leaf size={16}/> {dispositivo.dispositivo.estadoFisico}
                          </span>
                        </span>
                              <span className="font-medium">${dispositivo.valorUnitario.toLocaleString() ?? 0}</span>
                            </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
            ))}

            {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No se encontraron transacciones</p>
                </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Diálogos */}
        <TransactionDialog
            open={showDialog}
            onOpenChange={setShowDialog}
            type={transactionType}
            onAdd={handleAddTransaction}
        />

        {editingTransaction && (
            <EditTransactionDialog
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
                transaction={editingTransaction}
                onEdit={handleEditTransaction}
            />
        )}

        {/* Modal personalizado para eliminar */}
        {showDeleteDialog && deletingTransaction && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Backdrop */}
              <div
                  className="fixed inset-0 bg-black/50"
                  onClick={closeDeleteDialog}
              />

              {/* Modal */}
              <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6 z-10">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    ¿Eliminar transacción?
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Esta acción no se puede deshacer. La transacción #{deletingTransaction.id} será eliminada permanentemente.
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                      variant="outline"
                      onClick={closeDeleteDialog}
                  >
                    Cancelar
                  </Button>
                  <Button
                      onClick={handleDeleteTransaction}
                      className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
        )}
      </div>
  )
}