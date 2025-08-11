# 💰 Quotation Service – Documentación de la API

## 🎯 1. Propósito

Este microservicio se encarga de:

- Recibir las características de un iPhone usado/semiusado
- Analizar el stock disponible para sugerir un valor estimado
- Registrar cotizaciones para posibles operaciones futuras (compra/intercambio)

---

## 🗂️ 2. Estructura del Proyecto

```
quotation-service/
├── controller/
│   └── QuotationController.java
├── service/
│   ├── QuotationService.java
│   └── impl/QuotationServiceImpl.java
├── model/
│   ├── Quotation.java
│   └── enums/EstadoFisico.java
│   └── enums/CondicionGeneral.java
├── dto/
│   ├── QuotationRequestDto.java
│   └── QuotationResponseDto.java
├── repository/
│   └── QuotationRepository.java
└── exception/
    ├── QuotationNotFoundException.java
    └── InvalidQuotationDataException.java
```

---

## 🔌 3. API REST – Endpoints

| Método | URI                    | Descripción                                         |
|--------|------------------------|-----------------------------------------------------|
| POST   | /cotizaciones          | Cotiza un dispositivo y guarda el resultado         |
| GET    | /cotizaciones/{id}     | Consulta una cotización por ID                      |
| GET    | /cotizaciones          | Lista de cotizaciones filtrables por fecha o modelo |

---

## 🧠 4. Lógica de Negocio

**Cotizar un dispositivo**

1. El usuario ingresa datos como modelo, estado físico, condición de batería, etc.
2. El sistema consulta el stock actual (desde Inventory Service) para:
   - Buscar dispositivos similares
   - Calcular un valor promedio o estimado ajustado
3. Se guarda la cotización con el valor sugerido
4. Devuelve el resultado al usuario

---

## 🧪 5. Reglas de Validación

| Campo            | Regla                                 |
|------------------|---------------------------------------|
| modelo           | No vacío                              |
| estadoFisico     | Valor permitido                       |
| condicionBateria | Entre 0 y 100                         |
| condicionGeneral | NUEVO, SEMIUSADO, USADO               |
| valorEstimado    | Debe calcularse, no lo ingresa el usuario |
| fecha            | Se setea automáticamente              |

---

## 📄 6. Ejemplo de uso

### Cotización de un dispositivo

**Request**

```json
POST /cotizaciones
{
  "modelo": "iPhone 12",
  "almacenamiento": "128GB",
  "color": "Negro",
  "estadoFisico": "REGULAR",
  "condicionBateria": 80,
  "condicionGeneral": "USADO"
}
```

**Respuesta esperada**

```json
{
  "id": 103,
  "modelo": "iPhone 12",
  "valorEstimado": 230000.00,
  "fecha": "2025-07-28"
}
```

---

## 🧩 7. DTOs

### QuotationRequestDto

```java
public class QuotationRequestDto {
  private String modelo;
  private String almacenamiento;
  private String color;
  private EstadoFisico estadoFisico;
  private int condicionBateria;
  private CondicionGeneral condicionGeneral;
}
```

### QuotationResponseDto

```java
public class QuotationResponseDto {
  private Long id;
  private String modelo;
  private BigDecimal valorEstimado;
  private LocalDate fecha;
}
```

---

## 🔁 8. Comunicación con Inventory Service

Al cotizar, este microservicio llama internamente al Inventory Service vía REST para:

- Buscar dispositivos similares en stock (modelo, almacenamiento, estado)
- Obtener precios sugeridos y calcular valor promedio

---

## 📘 9. Resumen de Responsabilidades

| Capa        | Descripción                        |
|-------------|------------------------------------|
| Controller  | Define los endpoints públicos      |
| Service     | Aplica la lógica de cálculo        |
| Repository  | Persiste la cotización generada    |
| Modelos     | Representan la cotización          |
| DTOs        | Separan lógica