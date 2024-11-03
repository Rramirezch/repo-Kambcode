Para ejecutar este proyecto, nos ubicamos en la carpeta Tarea-8_Rodrigo, abrimos una terminal
y ejecutamos el comando "npm run start:dev", aqui la aplicacion nos conecta a la base de datos
"Tarea_8", creando dos tablas (Artists y Songs), aqui podresmos insertar datos en ambas tablas 
a travez del postman, atravez del comando post, luego podremos consultar los datos insertados, 
a travez del comando get, ya sea solicitando los datos de toda la tabla, o por C/U de los registros
 a travez de su id, tambien podremos modificar los registros atravez del comando put e identificando 
 el registro por su id, tambien podremos eliminar registros con el comando DELETE, tambien identifi
 cando el registro por su id. Se dejo el sync force: false, para que persistan los datos en postgres.