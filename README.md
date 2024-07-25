1.¿Qué es el filesystem (fs) en Node.js y para qué se utiliza?

El módulo `fs` en Node.js proporciona una API para interactuar con el sistema de archivos. Permite realizar operaciones como leer, escribir, actualizar y eliminar archivos, así como trabajar con directorios.

2.¿Qué es un middleware en Express y cuál es su propósito?

Un middleware en Express es una función que tiene acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de solicitud/respuesta de la aplicación. Su propósito es ejecutar código, modificar objetos de solicitud y respuesta, finalizar el ciclo de solicitud/respuesta y llamar a la siguiente función de middleware.

¿Qué es un endpoint en una API RESTful y cuál es su función?

Un endpoint en una API RESTful es una URL específica que representa un recurso al que se puede acceder mediante un verbo HTTP. La función de un endpoint es permitir la interacción con los datos a través de operaciones CRUD (crear, leer, actualizar, eliminar).

¿Qué son los verbos HTTP y cuáles son los más comunes?

Los verbos HTTP son métodos que indican la acción que se desea realizar sobre un recurso. Los más comunes son:
- GET: Recuperar datos.
- POST: Enviar datos para crear un nuevo recurso.
- PUT: Actualizar un recurso existente.
- DELETE: Eliminar un recurso.

¿Qué es JSON y por qué es utilizado en las API RESTful?

JSON (JavaScript Object Notation) es un formato de texto ligero para el intercambio de datos. Es utilizado en las API RESTful porque es fácil de leer y escribir tanto para humanos como para máquinas.


En lo que respecta al envío de datos a lo largo de los verbos http responde:

¿Qué es el body de una petición?
El body de una petición es la parte del mensaje que contiene los datos que se envían al servidor. Se utiliza principalmente con los verbos POST y PUT.


¿Qué es el body de una respuesta?
El body de una respuesta es la parte del mensaje que contiene los datos enviados desde el servidor al cliente.

¿Qué es el query de una petición?
El query de una petición es una cadena de texto que se envía en la URL y contiene pares clave-valor. Se utiliza para filtrar o modificar la solicitud.


¿Qué es el params de una petición?
Los params de una petición son parámetros que forman parte de la URL y se utilizan para identificar recursos específicos.

En lo que respecta al verbo POST responde:

¿Qué es un verbo POST y cuál es su propósito?
El verbo POST se utiliza para enviar datos al servidor para crear un nuevo recurso.

¿Cuándo se utiliza un verbo POST?
Se utiliza cuando se necesita crear un nuevo recurso en el servidor.

¿En qué se diferencia un verbo POST de los otros verbos HTTP como GET, PUT y DELETE?
- POST: Crea un nuevo recurso.
- GET: Recupera recursos.
- PUT: Actualiza recursos existentes.
- DELETE: Elimina recursos.

¿Cómo se envían datos en un verbo POST?
Los datos se envían en el body de la petición, generalmente en formato JSON.

En lo que respecta al verbo GET responde:

¿Qué es un verbo GET y cuál es su propósito?
El verbo GET se utiliza para recuperar datos del servidor.

¿Cuándo se utiliza un verbo GET?
Se utiliza cuando se necesita obtener información de un recurso.

¿En qué se diferencia un verbo GET de los otros verbos HTTP como POST, PUT y DELETE?
- GET: Recupera datos.
- POST: Crea datos.
- PUT: Actualiza datos.
- DELETE: Elimina datos.

En lo que respecta al verbo PUT responde:

¿Qué es un verbo PUT y cuál es su propósito?
El verbo PUT se utiliza para actualizar un recurso existente en el servidor.

¿Cuándo se utiliza un verbo PUT?
Se utiliza cuando se necesita actualizar la información de un recurso existente.

¿En qué se diferencia un verbo PUT de los otros verbos HTTP como POST, GET y DELETE?
- PUT: Actualiza un recurso.
- GET: Recupera un recurso.
- POST: Crea un recurso.
- DELETE: Elimina un recurso.

En lo que respecta al verbo DELETE responde:

¿Qué es un verbo DELETE y cuál es su propósito?
El verbo DELETE se utiliza para eliminar un recurso en el servidor.

¿Cuándo se utiliza un verbo DELETE?
Se utiliza cuando se necesita eliminar un recurso.

¿En qué se diferencia un verbo DELETE de los otros verbos HTTP como POST, GET y PUT?
- DELETE: Elimina un recurso.
- GET: Recupera un recurso.
- POST: Crea un recurso.
- PUT: Actualiza un recurso.

¿Qué es un status code y cuáles son los más comunes?

Un status code es un código numérico que indica el resultado de la solicitud HTTP. Los más comunes son:
- 200 OK: La solicitud fue exitosa.
- 201 Created: Un nuevo recurso fue creado exitosamente.
- 204 No Content: La solicitud fue exitosa pero no hay contenido que devolver.
- 400 Bad Request: La solicitud tiene un error de cliente.
- 401 Unauthorized: La autenticación es requerida y fallida.
- 403 Forbidden: El servidor entiende la solicitud pero se niega a autorizarla.
- 404 Not Found: El recurso solicitado no fue encontrado.
- 500 Internal Server Error: El servidor encontró un error.

¿Cuáles son los status code más comunes para el verbo POST?

- POST:
  - 201 Created
  - 400 Bad Request
  - 500 Internal Server Error

¿Cuáles son los status code más comunes para el verbo GET? 

- GET:
  - 200 OK
  - 404 Not Found
  - 500 Internal Server Error

¿Cuáles son los status code más comunes para el verbo PUT?
- PUT:
  - 200 OK
  - 204 No Content
  - 400 Bad Request
  - 404 Not Found
  - 500 Internal Server Error

¿Cuáles son los status code más comunes para el verbo DELETE?
- DELETE:
  - 200 OK
  - 204 No Content
  - 400 Bad Request
  - 404 Not Found
  - 500 Internal Server Error
