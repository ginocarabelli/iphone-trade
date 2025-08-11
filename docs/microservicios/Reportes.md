# 📊 Report Service – Documentación de la API

## 🎯 1. Propósito

Este microservicio se encarga de generar reportes y estadísticas basados en las transacciones y el stock, para facilitar el análisis financiero y operativo del negocio. Incluye:

- Reportes de ventas, compras e intercambios filtrados por períodos.
- Resúmenes financieros con ganancias y pérdidas.
- Exportación de reportes en formatos comunes (PDF, Excel).

---

## 🗂️ 2. Estructura del Proyecto

```
report-service/
├── controller/
│   └── ReportController.java
├── service/
│   ├── ReportService.java
│   └── impl/ReportServiceImpl.java
├── dto/
│   ├── ReportRequestDto.java
│   ├── SalesReportDto.java
│   ├── PurchaseReportDto.java
│   └── ExchangeReportDto.java
└── exception/
    └── ReportGenerationException.java
```

---

## 🔌 3. API REST – Endpoints

| Método | URI                        | Descripción                                 |
|--------|----------------------------|---------------------------------------------|
| GET    | /reportes/ventas           | Reporte de ventas por rango de fechas       |
| GET    | /reportes/compras          | Reporte de compras por rango de fechas      |
| GET    | /reportes/intercambios     | Reporte de intercambios por rango de fechas |
| GET    | /reportes/finanzas         | Resumen financiero (ganancias, pérdidas)    |
| GET    | /reportes/ventas/export    | Exportar reporte de ventas (PDF/Excel)      |
| GET    | /reportes/compras/export   | Exportar reporte de compras                 |

---

## 🧠 4. Lógica de Negocio

- Recibe parámetros de filtro: fecha desde, fecha hasta, tipo de dispositivo, etc.
- Consulta datos desde el Transaction Service (posiblemente vía API o base compartida).
- Agrega, filtra y procesa datos para generar reportes consolidados.
- Aplica reglas contables para cálculo de ganancias, costos y márgenes.
- Prepara formatos para exportación.

---

## 🧪 5. Reglas y Validaciones

| Parámetro         | Validación                                 |
|-------------------|--------------------------------------------|
| Fecha desde/hasta | Fecha válida, desde ≤ hasta                |
| Tipo dispositivo  | Opcional, debe coincidir con inventario    |
| Formato exportación | PDF, Excel o JSON (default JSON)         |

---

## 📄 6. Ejemplo de uso

### Consulta de ventas en rango de fechas

**Request**

```http
GET /reportes/ventas?desde=2025-07-01&hasta=2025-07-28
```

**Respuesta JSON simplificada**

```json
[
  {
    "fecha": "2025-07-05",
    "cantidad": 10,
    "montoTotal": 4000000.00
  },
  {
    "fecha": "2025-07-15",
    "cantidad": 5,
    "montoTotal": 2200000.00
  }
]
```

---

## 🧩 7. DTOs relevantes

### ReportRequestDto

```java
public class ReportRequestDto {
  private LocalDate desde;
  private LocalDate hasta;
  private String tipoDispositivo; // opcional
}
```

### SalesReportDto

```java
public class SalesReportDto {
  private LocalDate fecha;
  private int cantidad;
  private BigDecimal montoTotal;
}
```

---

## 🔄 8. Integración con otros microservicios

- Consume APIs de Transaction Service para obtener datos transaccionales.
- Puede usar datos de Inventory Service para filtrar por estado o características.
- Emite reportes al frontend o a sistemas externos.

---

## 📘 9. Resumen de responsabilidades

| Capa       | Función                                 |
|------------|-----------------------------------------|
| Controller | Define endpoints para reportes          |
| Service    | Lógica para generación y filtrado       |
| DTOs       | Transportan datos entre capas y al cliente |
| Excepciones| Manejo de errores específicos de reportes |