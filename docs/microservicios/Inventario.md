# 📦 Inventory Service – Documentación de la API

## 🎯 1. Propósito
Este microservicio gestiona el stock de iPhones, permitiendo registrar, consultar, actualizar y cambiar su estado según las transacciones que ocurran (venta, compra, intercambio).

## 🗂️ 2. Estructura del proyecto

```
inventory-service/
├── controller/
│   └── DeviceController.java
├── service/
│   ├── DeviceService.java
│   └── impl/DeviceServiceImpl.java
├── model/
│   ├── Device.java
│   ├── enums/EstadoFisico.java
│   ├── enums/CondicionGeneral.java
│   └── enums/EstadoStock.java
├── dto/
│   ├── DeviceRequestDto.java
│   ├── DeviceResponseDto.java
│   └── UpdateStockStatusDto.java
├── repository/
│   └── DeviceRepository.java
└── exception/
  ├── DeviceNotFoundException.java
  └── ValidationException.java
```

## 🔌 3. API REST – Endpoints

| Método | URI                       | Descripción                                   |
|--------|---------------------------|-----------------------------------------------|
| POST   | `/devices`                | Registrar un nuevo iPhone en stock            |
| GET    | `/devices`                | Obtener lista de dispositivos (con filtros)   |
| GET    | `/devices/{id}`           | Obtener detalle de un dispositivo             |
| PUT    | `/devices/{id}`           | Editar información del dispositivo            |
| DELETE | `/devices/{id}`           | Eliminar un dispositivo                       |
| PATCH  | `/devices/{id}/stock`     | Cambiar estado del stock (DISPONIBLE, VENDIDO, etc.) |

## 🧠 4. Lógica de Negocio

- **Registro de dispositivo**
  - Validar que los valores ingresados sean coherentes (por ejemplo: salud de batería entre 0 y 100).
  - Registrar `fecha_ingreso` automáticamente si no se provee.
  - Asignar `estado_stock = DISPONIBLE`.

- **Cambio de estado**
  - Sólo puede cambiar a:
  - `VENDIDO`: si fue vendido en una transacción.
  - `INTERCAMBIADO`: si fue parte de un intercambio.
  - `DISPONIBLE`: para reactivar un dispositivo anulado.
  - `fecha_salida` se setea automáticamente al cambiar a `VENDIDO` o `INTERCAMBIADO`.

## 🧪 5. Reglas de Validación

| Campo             | Regla                                               |
|-------------------|-----------------------------------------------------|
| modelo            | No vacío                                            |
| almacenamiento    | Debe ser uno de los permitidos (64GB, 128GB, etc.)  |
| estado_fisico     | Debe ser uno de: EXCELENTE, BUENO, etc.             |
| condicion_bateria | Entre 0 y 100                                       |
| condicion_general | NUEVO, USADO, SEMIUSADO                             |
| precio_sugerido   | Opcional, si no se conoce                           |

## 🔄 6. Flujo básico de uso

### A. Registrar dispositivo

```http
POST /devices
{
  "modelo": "iPhone 13",
  "almacenamiento": "128GB",
  "color": "Azul",
  "estadoFisico": "BUENO",
  "condicionBateria": 85,
  "condicionGeneral": "USADO",
  "precioSugerido": 400000.00
}
```

### B. Cambiar estado a VENDIDO

```http
PATCH /devices/15/stock
{
  "nuevoEstado": "VENDIDO"
}
```

## 📤 7. DTOs (Data Transfer Objects)

### DeviceRequestDto

```java
public class DeviceRequestDto {
  private String modelo;
  private String almacenamiento;
  private String color;
  private EstadoFisico estadoFisico;
  private int condicionBateria;
  private CondicionGeneral condicionGeneral;
  private BigDecimal precioSugerido;
}
```

### UpdateStockStatusDto

```java
public class UpdateStockStatusDto {
  private EstadoStock nuevoEstado;
}
```

## 📘 8. Resumen

| Capa       | Responsabilidad                  |
|------------|----------------------------------|
| Controller | Define los endpoints             |
| Service    | Contiene la lógica de negocio    |
| Repository | Acceso a datos en la base        |
| DTOs       | Validación y transporte          |
| Models     | Entidades persistentes           |