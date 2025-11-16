# **Full-Stack Challenge: E-commerce con AWS**

Eres responsable de desarrollar una pequeña aplicación de e-commerce que permita a los usuarios listar productos, ver detalles, y simular un carrito de compras. La aplicación debe ser **full-stack**, usando **React en el frontend**, **Node.js con TypeScript en el backend**, y **servicios de AWS** para almacenamiento, autenticación y base de datos.

---

### **Requerimientos del Frontend**

1. Usar **React** y **TypeScript**.
2. Crear al menos dos vistas:

   * **Listado de productos** (con paginación).
   * **Detalle del producto** (nombre, descripción, precio, imagen).
3. Consumir una API REST creada en Node.js.
4. Integrar **AWS Cognito** para autenticación de usuarios.
5. Guardar imágenes de productos en **AWS S3**.
6. Opcional: Usar **AWS CloudFront** para servir contenido estático.

---

### **Requerimientos del Backend**

1. Usar **Node.js con TypeScript** y **Express**.
2. Crear una API REST con endpoints:

   * `GET /products` → Listado de productos.
   * `GET /products/:id` → Detalle de producto.
   * `POST /products` → Crear producto (requiere autenticación).
3. Guardar datos en **AWS DynamoDB** o **RDS (PostgreSQL/MySQL)**.
4. Manejar autenticación y autorización usando **AWS Cognito JWT tokens**.
5. Guardar logs y métricas usando **AWS CloudWatch**.
6. Opcional: Usar **AWS Lambda** para procesar tareas asincrónicas (por ejemplo, thumbnails de imágenes).

---

### **Desafíos Técnicos**

* Implementar el manejo de **archivos estáticos en S3** y servirlos a través de la API.
* Validar tokens JWT emitidos por Cognito en el backend.
* Configurar paginación en DynamoDB o RDS.
* Escribir **TypeScript correctamente tipado** en frontend y backend.
* Usar **hooks en React** para manejar estado y efectos de forma limpia.
* Manejar errores y mostrar mensajes amigables al usuario.

---

### **Criterios de Evaluación**

1. **Funcionalidad:** Todos los endpoints y vistas funcionan correctamente.
2. **Calidad del código:** Buen uso de TypeScript, separación de responsabilidades, limpieza y modularidad.
3. **AWS Integration:** Uso adecuado de servicios AWS (S3, Cognito, DynamoDB/RDS, CloudWatch).
4. **UI/UX:** Experiencia básica de usuario, interfaz clara y responsiva.
5. **Documentación:** README con instrucciones para desplegar y probar la aplicación.
