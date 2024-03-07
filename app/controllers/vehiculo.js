const Vehiculo = require("../models/Vehiculo"); // Asegúrate de actualizar la ruta al modelo

async function insertarVehiculo() {
  try {
    const nuevoVehiculo = await Vehiculo.create({
      Modelo: "Model S",
      Ano: 2022,
      Tipo: "Sedán",
      Autonomia: 650,
      TiempoDeCarga: 8.5,
      Potencia: 670,
      Traccion: "Tracción total",
      CapacidadDeBateria: 100,
      NumeroDeAsientos: 5,
      Precio: 79990.0,
      ColorExterior: "Negro",
      ColorInterior: "Blanco",
      OpcionesDeRuedas: '19" Plata',
      PaqueteDeAutopiloto: true,
      TechoSolar: true,
      ConexionInternet: true,
      SistemaDeSonidoPremium: true,
      ModoDeConduccion: "Deportivo",
      // Imagen: Aquí iría el buffer de la imagen si decides guardarla en la base de datos
    });
    console.log("Vehículo insertado:", nuevoVehiculo.toJSON());
  } catch (error) {
    console.error("Error al insertar el vehículo:", error);
  }
}

insertarVehiculo();
