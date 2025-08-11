CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('VENDEDOR', 'ADMIN') DEFAULT 'VENDEDOR',
    nombre_completo VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE devices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    almacenamiento VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL,
    estado_fisico ENUM('EXCELENTE', 'BUENO', 'REGULAR', 'MALO') NOT NULL,
    condicion_bateria INT NOT NULL CHECK (condicion_bateria BETWEEN 0 AND 100),
    condicion_general ENUM('NUEVO', 'SEMIUSADO', 'USADO') NOT NULL,
    precio_sugerido DECIMAL(10,2),
    fecha_ingreso DATE,
    fecha_salida DATE,
    estado_stock ENUM('DISPONIBLE', 'VENDIDO', 'INTERCAMBIADO') DEFAULT 'DISPONIBLE',
    creado_por BIGINT,
    FOREIGN KEY (creado_por) REFERENCES users(id)
);

CREATE TABLE cotizaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100),
    almacenamiento VARCHAR(20),
    color VARCHAR(50),
    estado_fisico ENUM('EXCELENTE', 'BUENO', 'REGULAR', 'MALO'),
    condicion_bateria INT NOT NULL CHECK (condicion_bateria BETWEEN 0 AND 100),
    condicion_general ENUM('NUEVO', 'SEMIUSADO', 'USADO'),
    valor_estimado DECIMAL(10,2),
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    creado_por BIGINT,
    FOREIGN KEY (creado_por) REFERENCES users(id)
);

CREATE TABLE transacciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('COMPRA', 'VENTA', 'INTERCAMBIO') NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    forma_pago VARCHAR(50),
    cotizacion_id BIGINT, -- usado si hay parte de pago
    registrado_por BIGINT,
    FOREIGN KEY (cotizacion_id) REFERENCES cotizaciones(id),
    FOREIGN KEY (registrado_por) REFERENCES users(id)
);

CREATE TABLE transaccion_dispositivo (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transaccion_id BIGINT NOT NULL,
    dispositivo_id BIGINT NOT NULL,
    tipo_movimiento ENUM('ENTRADA', 'SALIDA') NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (transaccion_id) REFERENCES transacciones(id),
    FOREIGN KEY (dispositivo_id) REFERENCES devices(id)
);

