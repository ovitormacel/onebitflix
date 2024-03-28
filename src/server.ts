import { adminJs, adminJsRouter } from "./adminjs";
import { sequelize } from "./database";

const express = require("express");

const app = express();

app.use(express.static("public"));

//Utiliza as rotas do AdminJs. /admin
app.use(adminJs.options.rootPath, adminJsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log("DB conectado com sucesso.")
    })
    console.log(`Servidor iniciado na porta ${PORT}`);
});