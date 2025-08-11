# 🛒 Transaction Service – Documentación de la API

## 🎯 1. Propósito

Gestiona todas las operaciones comerciales: compra, venta e intercambio de dispositivos iPhone, registrando las transacciones y controlando el movimiento de stock asociado (entradas y salidas).

---

## 🗂️ 2. Estructura del Proyecto

```
transaction-service/
├── controller/
│   └── TransactionController.java
├── service/
│   ├── TransactionService.java
│   └── impl/TransactionServiceImpl.java
├── model/
│   ├── Transaction.java
│   ├── TransactionDevice.java
│   └── enums/TransactionType.java
│   └── enums/MovementType.java
├── dto/
│   ├── TransactionRequestDto.java
│   ├── TransactionDeviceDto.java
│   └── TransactionResponseDto.java
├── repository/
│   ├── TransactionRepository.java
│   └── TransactionDeviceRepository.java
└── exception/
    ├── TransactionNotFoundException.java
    └── InvalidTransactionException.java
```

---

## 🔌 3. API REST – Endpoints

| Método | URI                          | Descripción                                 |
|--------|------------------------------|---------------------------------------------|
| POST   | /transactions/compra         | Registrar una compra de dispositivo         |
| POST   | /transactions/venta          | Registrar una venta                         |
| POST   | /transactions/intercambio    | Registrar un intercambio (venta + entrega)  |
| GET    | /transactions/{id}           | Obtener detalle de una transacción          |
| GET    | /transactions                | Listar transacciones con filtros            |

---

## 🧠 4. Lógica de Negocio

### ✔️ Registro de Compra
- Se registra una transacción tipo **COMPRA**.
- Se registra uno o más dispositivos como entrada de stock.
- El estado del dispositivo cambia a **DISPONIBLE**.

### ✔️ Registro de Venta
- Se registra una transacción tipo **VENTA**.
- Se registra uno o más dispositivos como salida de stock.
- Puede incluir una cotización previa si hay dispositivo entregado como parte de pago.
- El estado del dispositivo cambia a **VENDIDO**.

### ✔️ Registro de Intercambio
- Se registra una transacción tipo **INTERCAMBIO**.
- Se registra entrada del dispositivo entregado y salida del dispositivo vendido.
- Se calcula la diferencia de valor y se registra en el total.
- Se vincula a la cotización del dispositivo entregado.

---

## 🧪 5. Reglas de Validación

| Campo         | Regla                                                        |
|---------------|--------------------------------------------------------------|
| tipo          | Debe ser uno de: COMPRA, VENTA, INTERCAMBIO                  |
| dispositivos  | No vacío, cada dispositivo debe existir y estar en estado válido |
| forma_pago    | Opcional, obligatorio en venta e intercambio                 |
| total         | Debe ser igual a la suma de valores unitarios ajustados      |
| cotizacion_id | Obligatorio en intercambios y opcional en ventas             |

---

## 📄 6. Ejemplo de uso

### Registro de venta con parte de pago (intercambio)

**Request**

```json
POST /transactions/intercambio
Content-Type: application/json

{
  "total": 450000.00,
  "formaPago": "Tarjeta",
  "cotizacionId": 55,
  "dispositivos": [
    {
      "dispositivoId": 123,
      "tipoMovimiento": "SALIDA",
      "valorUnitario": 400000.00
    },
    {
      "dispositivoId": 87,
      "tipoMovimiento": "ENTRADA",
      "valorUnitario": 50000.00
    }
  ]
}
```

---

## 🧩 7. DTOs

### TransactionRequestDto

```java
public class TransactionRequestDto {
    private BigDecimal total;
    private String formaPago;
    private Long cotizacionId; // Opcional
    private List<TransactionDeviceDto> dispositivos;
}
```

### TransactionDeviceDto

```java
public class TransactionDeviceDto {
    private Long dispositivoId;
    private MovementType tipoMovimiento; // ENTRADA o SALIDA
    private BigDecimal valorUnitario;
}
```

### TransactionResponseDto

```java
public class TransactionResponseDto {
    private Long id;
    private TransactionType tipo;
    private BigDecimal total;
    private LocalDateTime fecha;
    private String formaPago;
    private List<TransactionDeviceDto> dispositivos;
}
```

---

## 🔄 8. Integración con otros microservicios

- Llama a **Inventory Service** para actualizar estado de dispositivos tras la transacción.
- Consulta a **Quotation Service** para validar cotizaciones en intercambios.
- Puede emitir eventos para notificar al **Report Service** y otros sistemas.

---

## 📘 9. Resumen de Responsabilidades

| Capa       | Descripción                                 |
|------------|---------------------------------------------|
| Controller | Endpoints REST para operaciones             |
| Service    | Lógica para validar y guardar transacciones |
| Repository | Acceso a datos para transacciones y detalles|
| Modelos    | Entidades Transaction y TransactionDevice   |
| DTOs       | Datos de entrada y salida                   |