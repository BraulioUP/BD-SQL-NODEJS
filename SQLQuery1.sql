create database ECOMMERCE;
GO

USE ECOMMERCE;
GO
select * from Usuarios;
select * from Regiones;
select * from Idiomas;
select * from Vehiculos;
select * from Productos;
go 
INSERT INTO Regiones (Nombre) VALUES
('África'),
('Antártida'),
('Asia'),
('Europa'),
('América del Norte'),
('Oceanía'),
('América Latina y el Caribe'),
('Medio Oriente'),
('Asia Central'),
('Sureste Asiático'),
('Europa del Este'),
('Escandinavia'),
('África Subsahariana'),
('Asia del Sur'),
('Asia Oriental');
GO

INSERT INTO Idiomas (Nombre, Codigo) VALUES
('Español', 'ES'),
('Inglés', 'EN'),
('Francés', 'FR'),
('Alemán', 'DE'),
('Chino', 'ZH'),
('Ruso', 'RU'),
('Árabe', 'AR'),
('Portugués', 'PT'),
('Hindi', 'HI'),
('Bengalí', 'BN'),
('Japonés', 'JA'),
('Panyabí', 'PA'),
('Javanés', 'JV'),
('Coreano', 'KO'),
('Vietnamita', 'VI'),
('Turco', 'TR'),
('Italiano', 'IT'),
('Tailandés', 'TH'),
('Persa', 'FA'),
('Griego', 'EL'),
('Danés', 'DA'),
('Finlandés', 'FI'),
('Noruego', 'NO'),
('Sueco', 'SV'),
('Holandés', 'NL'),
('Polaco', 'PL'),
('Húngaro', 'HU'),
('Checo', 'CS'),
('Eslovaco', 'SK'),
('Rumano', 'RO'),
('Búlgaro', 'BG'),
('Serbio', 'SR'),
('Croata', 'HR'),
('Esloveno', 'SL'),
('Maltés', 'MT'),
('Estonio', 'ET'),
('Letón', 'LV'),
('Lituano', 'LT'),
('Ucraniano', 'UK'),
('Bielorruso', 'BE'),
('Georgiano', 'KA'),
('Armenio', 'HY'),
('Azerbaiyano', 'AZ'),
('Kazajo', 'KK'),
('Uzbeko', 'UZ'),
('Turcomano', 'TK'),
('Kirguís', 'KY'),
('Tayiko', 'TG'),
('Mongol', 'MN'),
('Pashto', 'PS'),
('Kurdo', 'KU'),
('Hebreo', 'HE'),
('Urdu', 'UR'),
('Árabe Egipcio', 'ARZ'),
('Maratí', 'MR'),
('Telugu', 'TE'),
('Tamil', 'TA'),
('Canarés', 'KN'),
('Gujarati', 'GU'),
('Malayalam', 'ML'),
('Oriya', 'OR'),
('Punjabi Occidental', 'PBN'),
('Sindhi', 'SD'),
('Sinhala', 'SI'),
('Birmano', 'MY'),
('Jemer', 'KM'),
('Lao', 'LO'),
('Nepalí', 'NE'),
('Dzongkha', 'DZ'),
('Butanés', 'BT'),
('Amhárico', 'AM'),
('Somalí', 'SO'),
('Suajili', 'SW'),
('Zulú', 'ZU'),
('Xhosa', 'XH'),
('Hausa', 'HA'),
('Yoruba', 'YO'),
('Igbo', 'IG');
GO


USE master;
GO
EXEC xp_readerrorlog 0, 1;
GO
DELETE FROM Productos;


INSERT INTO Usuarios (RegionID, IdiomaID, Nombre, Apellido, Correo, ContrasenaHash) VALUES
(1, 1, 'Juan', 'Perez', 'juan.perez@email.com', 'fadsf'),
(2, 1, 'Carlos', 'Martinez', 'carlos.martinez@email.com', 'braul'),
(2, 3, 'Sofia', 'Lopez', 'sofia.lopez@email.com', 'fadsf'),
(3, 2, 'Ana', 'Gonzalez', 'ana.gonzalez@email.com', 'hla');

INSERT INTO Usuarios (RegionID, IdiomaID, Nombre, Apellido, Correo, ContrasenaHash) VALUES
(1, 1, 'Juan', 'Perez', 'juan.perez@email.com', 'fadsf'),
(1, 2, 'Laura', 'Garcia', 'laura.garcia@email.com', '123456'),
(2, 1, 'Carlos', 'Martinez', 'carlos.martinez@email.com', 'braul'),
(2, 3, 'Sofia', 'Lopez', 'sofia.lopez@email.com', 'fadsf'),
(3, 2, 'Ana', 'Gonzalez', 'ana.gonzalez@email.com', 'hla'),
GO

INSERT INTO Vehiculos (
    Modelo, Ano, Tipo, Autonomia, TiempoDeCarga, Potencia, 
    Traccion, CapacidadDeBateria, NumeroDeAsientos, Precio, 
    ColorExterior, ColorInterior, OpcionesDeRuedas, PaqueteDeAutopiloto, 
    TechoSolar, ConexionInternet, SistemaDeSonidoPremium, ModoDeConduccion
)
VALUES 
    ('Model 3', 2022, 'Sedán', 500, 6, 450, 'Tracción trasera', 75, 5, 46990.00, 'Blanco', 'Negro', '18" Aero', 1, 0, 1, 1, 'Estándar'),
    ('Model X', 2023, 'SUV', 547, 7.5, 670, 'Tracción total', 100, 7, 89990.00, 'Rojo', 'Blanco', '20" Plata', 1, 1, 1, 1, 'Deportivo'),
    ('Model Y', 2023, 'SUV', 525, 5.5, 480, 'Tracción total', 82, 5, 59990.00, 'Azul', 'Negro', '19" Sport', 1, 0, 1, 0, 'Eco'),
    ('Cybertruck', 2022, 'Pickup', 800, 10, 800, 'Tracción total', 200, 6, 69990.00, 'Plata', 'Negro', '20" Off-road', 1, 1, 1, 1, 'Deportivo'),
    ('Roadster', 2022, 'Deportivo', 1000, 12, 1000, 'Tracción total', 200, 4, 200000.00, 'Rojo', 'Blanco', '22" Performance', 1, 1, 1, 1, 'Deportivo'),
    ('Model S Plaid', 2023, 'Sedán', 628, 8, 1020, 'Tracción total', 100, 5, 129990.00, 'Negro', 'Rojo', '21" Arachnid', 1, 1, 1, 1, 'Plaid'),
    ('Model 3 Standard', 2024, 'Sedán', 423, 6.5, 283, 'Tracción trasera', 60, 5, 39990.00, 'Blanco', 'Negro', '18" Aero', 0, 0, 1, 0, 'Estándar'),
    ('Model Y Long Range', 2024, 'SUV', 568, 6, 346, 'Tracción total', 75, 5, 65990.00, 'Negro', 'Blanco', '19" Sport', 1, 0, 1, 0, 'Eco'),
    ('Model X Plaid', 2023, 'SUV', 547, 7.5, 1020, 'Tracción total', 100, 6, 119990.00, 'Azul Medianoche', 'Blanco', '22" Turbine', 1, 1, 1, 1, 'Plaid'),
    ('Cybertruck Dual Motor', 2023, 'Pickup', 610, 8, 690, 'Tracción total', 150, 6, 49990.00, 'Plata', 'Negro', '20" Off-road', 1, 0, 1, 0, 'Estándar');



INSERT INTO Productos (NombreProducto, Descripcion, Precio, Stock, Categoria)
VALUES 
    ('Camiseta con Logo', 'Camiseta de algodón con el logo de la marca estampado', 19.99, 100, 'Ropa'),
    ('Taza de Cerámica', 'Taza de cerámica con diseño exclusivo', 9.99, 200, 'Utensilios'),
    ('Gorra Bordada', 'Gorra ajustable con bordado del nombre de la marca', 14.99, 150, 'Accesorios');

INSERT INTO Productos (NombreProducto, Descripcion, Precio, Stock, Categoria)
VALUES 
    ('Sudadera con Capucha', 'Sudadera de alta calidad con capucha y bolsillo canguro', 39.99, 80, 'Ropa'),
    ('Botella de Agua Reutilizable', 'Botella de agua de acero inoxidable con tapa hermética', 12.99, 150, 'Utensilios'),
    ('Mochila Estampada', 'Mochila resistente con estampado personalizado', 29.99, 100, 'Accesorios'),
    ('Bufanda de Lana', 'Bufanda suave y abrigada de lana con patrón a cuadros', 17.99, 120, 'Ropa'),
    ('Llavero de Cuero', 'Llavero de cuero genuino con grabado personalizado', 7.99, 200, 'Accesorios'),
    ('Calcetines Divertidos', 'Calcetines de algodón con diseños únicos y coloridos', 6.99, 300, 'Ropa'),
    ('Paraguas Plegable', 'Paraguas resistente y compacto con apertura automática', 19.99, 80, 'Accesorios'),
    ('Bolígrafo Metálico', 'Bolígrafo de tinta gel con cuerpo metálico y diseño elegante', 8.99, 250, 'Papelería'),
    ('Parche Bordado', 'Parche bordado con diseño exclusivo para personalizar tu ropa', 3.99, 400, 'Accesorios'),
    ('Libreta de Notas', 'Libreta de tapa dura con papel de alta calidad y diseño moderno', 14.99, 150, 'Papelería');

DECLARE @Password NVARCHAR(50);
SET @Password = 'fdaf';
SELECT HASHBYTES('SHA2_256', @Password);



CREATE TABLE Regiones (
    RegionID INT PRIMARY KEY IDENTITY,
    Nombre VARCHAR(255) NOT NULL
);
GO

CREATE TABLE Idiomas (
    IdiomaID INT PRIMARY KEY IDENTITY,
    Nombre VARCHAR(255) NOT NULL,
    Codigo VARCHAR(10) NOT NULL
);
GO

CREATE TABLE Usuarios (
    UsuarioID INT PRIMARY KEY IDENTITY,
    RegionID INT,
    IdiomaID INT,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Correo VARCHAR(255) NOT NULL UNIQUE,
    ContrasenaHash VARCHAR(255) NOT NULL,
	Telefono NVARCHAR(50) NULL,
	Direccion VARCHAR(255) NULL,	
    FechaRegistro DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (RegionID) REFERENCES Regiones(RegionID),
    FOREIGN KEY (IdiomaID) REFERENCES Idiomas(IdiomaID)
);
GO
CREATE TABLE Vehiculos (
    VehiculoID INT PRIMARY KEY IDENTITY(1,1),
    Modelo VARCHAR(50),
    Ano INT,
    Tipo VARCHAR(50), -- Por ejemplo, Sedán, SUV, Coupé, etc.
    Autonomia INT, -- Kilómetros que puede recorrer con una carga completa
    TiempoDeCarga DECIMAL(5, 2), -- Horas para cargar completamente
    Potencia DECIMAL(10, 2), -- kW o caballos de fuerza
    Traccion VARCHAR(50), -- Por ejemplo, Tracción trasera, Tracción delantera, Tracción total
    CapacidadDeBateria DECIMAL(10, 2), -- En kWh
    NumeroDeAsientos INT,
    Precio DECIMAL(10, 2),
    ColorExterior VARCHAR(50),
    ColorInterior VARCHAR(50),
    OpcionesDeRuedas VARCHAR(50), -- Por ejemplo, 18" Plata, 19" Deportivas, etc.
    PaqueteDeAutopiloto BIT, -- 0 para No, 1 para Sí
    TechoSolar BIT, -- 0 para No, 1 para Sí
    ConexionInternet BIT, -- 0 para No, 1 para Sí, considerando conectividad LTE o 5G
    SistemaDeSonidoPremium BIT, -- 0 para No, 1 para Sí
    ModoDeConduccion VARCHAR(50), -- Por ejemplo, Estándar, Eco, Deportivo, etc.
	Imagen VARBINARY(MAX),
	CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
);

CREATE TABLE Productos (
    ProductoID INT PRIMARY KEY IDENTITY,
    NombreProducto NVARCHAR(100),
    Descripcion NVARCHAR(255),
    Precio DECIMAL(10, 2),
    Stock INT,
	Categoria NVARCHAR(255),
	CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),

);

CREATE TABLE Ordenes (
    OrdenID INT PRIMARY KEY IDENTITY,
    ClienteID INT,
    FechaOrden DATETIME,
    TotalOrden DECIMAL(10, 2),
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID)
);

CREATE TABLE DetallesOrden (
    DetalleOrdenID INT PRIMARY KEY IDENTITY,
    OrdenID INT,
    ProductoID INT,
    Cantidad INT,
    PrecioUnitario DECIMAL(10, 2),
    FOREIGN KEY (OrdenID) REFERENCES Ordenes(OrdenID),
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID)
);
CREATE TABLE Clientes (
    ClienteID INT PRIMARY KEY IDENTITY,
    UsuarioID INT,  -- Columna para la relación con Usuarios
    Nombre NVARCHAR(50),
    Apellido NVARCHAR(50),
    CorreoElectronico NVARCHAR(100),
    Telefono NVARCHAR(15),
    Direccion NVARCHAR(255),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)  -- Clave foránea para la relación
);

/*AÑADIR DATOS EN TABLAS YA CREADAS*/
ALTER TABLE Productos
ADD Categoria NVARCHAR(255);
ALTER TABLE Productos
ADD createdAt DATETIME NOT NULL DEFAULT GETDATE();

/* procedimientos almacenados para registro e inicio de sesión */
CREATE PROCEDURE RegistrarUsuario
    @RegionID INT,
    @IdiomaID INT,
    @Nombre NVARCHAR(100),
    @Apellido NVARCHAR(100),
    @Correo NVARCHAR(255),
    @ContrasenaHash VARBINARY(256)
AS
BEGIN
    INSERT INTO Usuarios (RegionID, IdiomaID, Nombre, Apellido, Correo, ContrasenaHash)
    VALUES (@RegionID, @IdiomaID, @Nombre, @Apellido, @Correo, @ContrasenaHash);
END;
GO

/* procedimiento almacenado que verifica el correo y la contraseña hash: */
CREATE PROCEDURE IniciarSesion
    @Correo NVARCHAR(255),
    @ContrasenaHash VARBINARY(256)
AS
BEGIN
    SELECT UsuarioID, Nombre, Apellido
    FROM Usuarios
    WHERE Correo = @Correo AND ContrasenaHash = @ContrasenaHash;
END;
GO


/*crear una view es como un objeto XD*/
CREATE VIEW VistaDetallesUsuario AS
SELECT 
    U.UsuarioID,
    U.Nombre,
    U.Apellido,
    U.Correo,
    R.Nombre AS Region,
    I.Nombre AS Idioma,
    U.FechaRegistro
FROM 
    Usuarios U
    INNER JOIN Regiones R ON U.RegionID = R.RegionID
    INNER JOIN Idiomas I ON U.IdiomaID = I.IdiomaID;
select * from VistaDetallesUsuario;
SELECT * FROM sys.views WHERE name = 'VistaDetallesUsuario'

	/*NOTA: PUEDE AYUDAMER PARA LA CREACION DE LAS VIEW PARA MOSTRAR AL USUAIRIO AUTOS.*/








































	/*PERMISOS AL USUARIOS*/
	GRANT SELECT ON VistaDetallesUsuario TO ejemplo;
GRANT INSERT, UPDATE, DELETE ON VistaDetallesUsuario TO ejemplo;
GRANT ALL ON VistaDetallesUsuario TO ejemplo;