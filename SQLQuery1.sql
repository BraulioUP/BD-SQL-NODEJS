create database ECOMMERCE;
GO

USE ECOMMERCE;
GO
select * from Usuarios;
select * from Regiones;
select * from Idiomas;
select * from Vehiculos;
go
INSERT INTO Regiones (Nombre) VALUES
('�frica'),
('Ant�rtida'),
('Asia'),
('Europa'),
('Am�rica del Norte'),
('Ocean�a'),
('Am�rica Latina y el Caribe'),
('Medio Oriente'),
('Asia Central'),
('Sureste Asi�tico'),
('Europa del Este'),
('Escandinavia'),
('�frica Subsahariana'),
('Asia del Sur'),
('Asia Oriental');
GO

INSERT INTO Idiomas (Nombre, Codigo) VALUES
('Espa�ol', 'ES'),
('Ingl�s', 'EN'),
('Franc�s', 'FR'),
('Alem�n', 'DE'),
('Chino', 'ZH'),
('Ruso', 'RU'),
('�rabe', 'AR'),
('Portugu�s', 'PT'),
('Hindi', 'HI'),
('Bengal�', 'BN'),
('Japon�s', 'JA'),
('Panyab�', 'PA'),
('Javan�s', 'JV'),
('Coreano', 'KO'),
('Vietnamita', 'VI'),
('Turco', 'TR'),
('Italiano', 'IT'),
('Tailand�s', 'TH'),
('Persa', 'FA'),
('Griego', 'EL'),
('Dan�s', 'DA'),
('Finland�s', 'FI'),
('Noruego', 'NO'),
('Sueco', 'SV'),
('Holand�s', 'NL'),
('Polaco', 'PL'),
('H�ngaro', 'HU'),
('Checo', 'CS'),
('Eslovaco', 'SK'),
('Rumano', 'RO'),
('B�lgaro', 'BG'),
('Serbio', 'SR'),
('Croata', 'HR'),
('Esloveno', 'SL'),
('Malt�s', 'MT'),
('Estonio', 'ET'),
('Let�n', 'LV'),
('Lituano', 'LT'),
('Ucraniano', 'UK'),
('Bielorruso', 'BE'),
('Georgiano', 'KA'),
('Armenio', 'HY'),
('Azerbaiyano', 'AZ'),
('Kazajo', 'KK'),
('Uzbeko', 'UZ'),
('Turcomano', 'TK'),
('Kirgu�s', 'KY'),
('Tayiko', 'TG'),
('Mongol', 'MN'),
('Pashto', 'PS'),
('Kurdo', 'KU'),
('Hebreo', 'HE'),
('Urdu', 'UR'),
('�rabe Egipcio', 'ARZ'),
('Marat�', 'MR'),
('Telugu', 'TE'),
('Tamil', 'TA'),
('Canar�s', 'KN'),
('Gujarati', 'GU'),
('Malayalam', 'ML'),
('Oriya', 'OR'),
('Punjabi Occidental', 'PBN'),
('Sindhi', 'SD'),
('Sinhala', 'SI'),
('Birmano', 'MY'),
('Jemer', 'KM'),
('Lao', 'LO'),
('Nepal�', 'NE'),
('Dzongkha', 'DZ'),
('Butan�s', 'BT'),
('Amh�rico', 'AM'),
('Somal�', 'SO'),
('Suajili', 'SW'),
('Zul�', 'ZU'),
('Xhosa', 'XH'),
('Hausa', 'HA'),
('Yoruba', 'YO'),
('Igbo', 'IG');
GO


USE master;
GO
EXEC xp_readerrorlog 0, 1;
GO

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
    Modelo, A�o, Tipo, Autonomia, TiempoDeCarga, Potencia, 
    Traccion, CapacidadDeBateria, NumeroDeAsientos, Precio, 
    ColorExterior, ColorInterior, OpcionesDeRuedas, PaqueteDeAutopiloto, 
    TechoSolar, ConexionInternet, SistemaDeSonidoPremium, ModoDeConduccion
)
VALUES 
    ('Model 3', 2022, 'Sed�n', 500, 6, 450, 'Tracci�n trasera', 75, 5, 46990.00, 'Blanco', 'Negro', '18" Aero', 1, 0, 1, 1, 'Est�ndar'),
    ('Model X', 2023, 'SUV', 547, 7.5, 670, 'Tracci�n total', 100, 7, 89990.00, 'Rojo', 'Blanco', '20" Plata', 1, 1, 1, 1, 'Deportivo'),
    ('Model Y', 2023, 'SUV', 525, 5.5, 480, 'Tracci�n total', 82, 5, 59990.00, 'Azul', 'Negro', '19" Sport', 1, 0, 1, 0, 'Eco'),
    ('Cybertruck', 2022, 'Pickup', 800, 10, 800, 'Tracci�n total', 200, 6, 69990.00, 'Plata', 'Negro', '20" Off-road', 1, 1, 1, 1, 'Deportivo'),
    ('Roadster', 2022, 'Deportivo', 1000, 12, 1000, 'Tracci�n total', 200, 4, 200000.00, 'Rojo', 'Blanco', '22" Performance', 1, 1, 1, 1, 'Deportivo'),
    ('Model S Plaid', 2023, 'Sed�n', 628, 8, 1020, 'Tracci�n total', 100, 5, 129990.00, 'Negro', 'Rojo', '21" Arachnid', 1, 1, 1, 1, 'Plaid'),
    ('Model 3 Standard', 2024, 'Sed�n', 423, 6.5, 283, 'Tracci�n trasera', 60, 5, 39990.00, 'Blanco', 'Negro', '18" Aero', 0, 0, 1, 0, 'Est�ndar'),
    ('Model Y Long Range', 2024, 'SUV', 568, 6, 346, 'Tracci�n total', 75, 5, 65990.00, 'Negro', 'Blanco', '19" Sport', 1, 0, 1, 0, 'Eco'),
    ('Model X Plaid', 2023, 'SUV', 547, 7.5, 1020, 'Tracci�n total', 100, 6, 119990.00, 'Azul Medianoche', 'Blanco', '22" Turbine', 1, 1, 1, 1, 'Plaid'),
    ('Cybertruck Dual Motor', 2023, 'Pickup', 610, 8, 690, 'Tracci�n total', 150, 6, 49990.00, 'Plata', 'Negro', '20" Off-road', 1, 0, 1, 0, 'Est�ndar');


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
    Tipo VARCHAR(50), -- Por ejemplo, Sed�n, SUV, Coup�, etc.
    Autonomia INT, -- Kil�metros que puede recorrer con una carga completa
    TiempoDeCarga DECIMAL(5, 2), -- Horas para cargar completamente
    Potencia DECIMAL(10, 2), -- kW o caballos de fuerza
    Traccion VARCHAR(50), -- Por ejemplo, Tracci�n trasera, Tracci�n delantera, Tracci�n total
    CapacidadDeBateria DECIMAL(10, 2), -- En kWh
    NumeroDeAsientos INT,
    Precio DECIMAL(10, 2),
    ColorExterior VARCHAR(50),
    ColorInterior VARCHAR(50),
    OpcionesDeRuedas VARCHAR(50), -- Por ejemplo, 18" Plata, 19" Deportivas, etc.
    PaqueteDeAutopiloto BIT, -- 0 para No, 1 para S�
    TechoSolar BIT, -- 0 para No, 1 para S�
    ConexionInternet BIT, -- 0 para No, 1 para S�, considerando conectividad LTE o 5G
    SistemaDeSonidoPremium BIT, -- 0 para No, 1 para S�
    ModoDeConduccion VARCHAR(50), -- Por ejemplo, Est�ndar, Eco, Deportivo, etc.
	Imagen VARBINARY(MAX)
);



/*A�ADIR DATOS EN TABLAS YA CREADAS*/
ALTER TABLE Usuarios
ADD Telefono NVARCHAR(50) NULL;
ALTER TABLE Vehiculos
ADD Imagen VARBINARY(MAX);

/* procedimientos almacenados para registro e inicio de sesi�n */
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

/* procedimiento almacenado que verifica el correo y la contrase�a hash: */
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