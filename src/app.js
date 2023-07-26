// Importaciones
import express from 'express';
import indexRoutes from './routes/index.routes'
import authRoutes from "./routes/auth.routes"
import exphbs from 'express-handlebars'
import path from 'path'
import { createRoles } from './libs/initialSetup';
import { create } from 'express-handlebars';
import morgan from "morgan"


// Inicializo APP 
const app = express();
createRoles()

// Set Babel
app.set('views', path.join(__dirname, '/views'));

var hbs = create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    defaultLayout: "main",
    extname: ".hbs",
})

app.engine(".hbs",hbs.engine);

app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev")) // Ver Peticiones
app.use(express.urlencoded({extended: false})) // Permite usar elementos del req.body 
app.use(express.json()) // Analizar el cuerpo de la solicitud en formato JSON

// Rutas
app.use(indexRoutes)
app.use("/auth", authRoutes)

// Archivos estaticos

app.use(express.static(path.join(__dirname,"public")))
 
export default app;

