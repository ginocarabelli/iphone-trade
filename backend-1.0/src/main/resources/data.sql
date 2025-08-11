INSERT INTO devices (
    modelo, almacenamiento, color, estado_fisico, condicion_bateria,
    condicion_general, precio_sugerido, fecha_ingreso, fecha_salida,
    estado_stock, creado_por
) VALUES
      ('iPhone 13', '128', 'Negro', 'BUENO', 80, 'USADO', 650, CURRENT_DATE, NULL, 'DISPONIBLE', 1),
      ('iPhone 13', '128', 'Blanco', 'EXCELENTE', 90, 'NUEVO', 800, CURRENT_DATE, NULL, 'DISPONIBLE', 1),
      ('iPhone 12', '64', 'Rojo', 'REGULAR', 70, 'SEMIUSADO', 550, CURRENT_DATE, NULL, 'DISPONIBLE', 1),
      ('iPhone 11', '64', 'Verde', 'REGULAR', 60, 'USADO', 400, CURRENT_DATE, NULL, 'DISPONIBLE', 2),
      ('iPhone 14 Pro', '256', 'Negro Espacial', 'EXCELENTE', 100, 'NUEVO', 1250, CURRENT_DATE, NULL, 'DISPONIBLE', 1);

-- iPhone 16 Series
INSERT INTO device_models (modelo, almacenamiento, base_price_usd) VALUES
('iPhone 16 Pro Max', '128GB', 1250),
('iPhone 16 Pro Max', '256GB', 1300),
('iPhone 16 Pro Max', '512GB', 1400),
('iPhone 16 Pro Max', '1TB', 1500),
('iPhone 16 Pro', '128GB', 1150),
('iPhone 16 Pro', '256GB', 1200),
('iPhone 16 Pro', '512GB', 1300),
('iPhone 16 Pro', '1TB', 1400),
('iPhone 16 Plus', '128GB', 1000),
('iPhone 16 Plus', '256GB', 1050),
('iPhone 16 Plus', '512GB', 1150),
('iPhone 16', '128GB', 950),
('iPhone 16', '256GB', 1000),
('iPhone 16', '512GB', 1100),
('iPhone 16 mini', '128GB', 800),
('iPhone 16 mini', '256GB', 850),
('iPhone 16 mini', '512GB', 950);

-- iPhone 15 Series
INSERT INTO device_models (modelo, almacenamiento, base_price_usd) VALUES
('iPhone 15 Pro Max', '128GB', 1150),
('iPhone 15 Pro Max', '256GB', 1200),
('iPhone 15 Pro Max', '512GB', 1300),
('iPhone 15 Pro Max', '1TB', 1400),
('iPhone 15 Pro', '128GB', 1050),
('iPhone 15 Pro', '256GB', 1100),
('iPhone 15 Pro', '512GB', 1200),
('iPhone 15 Pro', '1TB', 1300),
('iPhone 15 Plus', '128GB', 900),
('iPhone 15 Plus', '256GB', 950),
('iPhone 15 Plus', '512GB', 1050),
('iPhone 15', '128GB', 850),
('iPhone 15', '256GB', 900),
('iPhone 15', '512GB', 1000);

-- iPhone 14 Series
INSERT INTO device_models (modelo, almacenamiento, base_price_usd) VALUES
('iPhone 14 Pro Max', '128GB', 950),
('iPhone 14 Pro Max', '256GB', 1000),
('iPhone 14 Pro Max', '512GB', 1100),
('iPhone 14 Pro Max', '1TB', 1200),
('iPhone 14 Pro', '128GB', 900),
('iPhone 14 Pro', '256GB', 950),
('iPhone 14 Pro', '512GB', 1050),
('iPhone 14 Pro', '1TB', 1150),
('iPhone 14 Plus', '128GB', 800),
('iPhone 14 Plus', '256GB', 850),
('iPhone 14 Plus', '512GB', 950),
('iPhone 14', '128GB', 750),
('iPhone 14', '256GB', 800),
('iPhone 14', '512GB', 900);

-- iPhone 13 Series
INSERT INTO device_models (modelo, almacenamiento, base_price_usd) VALUES
('iPhone 13 Pro Max', '128GB', 800),
('iPhone 13 Pro Max', '256GB', 850),
('iPhone 13 Pro Max', '512GB', 950),
('iPhone 13 Pro', '128GB', 750),
('iPhone 13 Pro', '256GB', 800),
('iPhone 13 Pro', '512GB', 900),
('iPhone 13', '128GB', 650),
('iPhone 13', '256GB', 700),
('iPhone 13', '512GB', 800),
('iPhone 13 mini', '128GB', 600),
('iPhone 13 mini', '256GB', 650),
('iPhone 13 mini', '512GB', 750);

-- iPhone 12 Series
INSERT INTO device_models (modelo, almacenamiento, base_price_usd) VALUES
('iPhone 12 Pro Max', '128GB', 700),
('iPhone 12 Pro Max', '256GB', 750),
('iPhone 12 Pro Max', '512GB', 850),
('iPhone 12 Pro', '128GB', 650),
('iPhone 12 Pro', '256GB', 700),
('iPhone 12 Pro', '512GB', 800),
('iPhone 12', '64GB', 500),
('iPhone 12', '128GB', 550),
('iPhone 12', '256GB', 600),
('iPhone 12 mini', '64GB', 450),
('iPhone 12 mini', '128GB', 500),
('iPhone 12 mini', '256GB', 550);

-- iPhone 11 Series
INSERT INTO device_models (modelo, almacenamiento, base_price_usd) VALUES
('iPhone 11 Pro Max', '64GB', 600),
('iPhone 11 Pro Max', '256GB', 650),
('iPhone 11 Pro Max', '512GB', 750),
('iPhone 11 Pro', '64GB', 550),
('iPhone 11 Pro', '256GB', 600),
('iPhone 11 Pro', '512GB', 700),
('iPhone 11', '64GB', 450),
('iPhone 11', '128GB', 500),
('iPhone 11', '256GB', 550);
