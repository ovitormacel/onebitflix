import { adminJs, adminJsRouter } from "./adminjs";
import cors from 'cors';
import { sequelize } from "./database";
import express from "express";
import { router } from "./routes";

const app = express();

app.use(cors());

app.use(express.static("public"));
app.use(express.json());

//Utiliza as rotas do AdminJs. /admin
app.use(adminJs.options.rootPath, adminJsRouter);

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log("DB conectado com sucesso.")
    })
    console.log(`Servidor iniciado na porta ${PORT}`);
});