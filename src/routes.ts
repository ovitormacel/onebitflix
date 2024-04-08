import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
import { authController } from "./controllers/authController";
import { ensureAuth, ensureAuthInQuery } from "./middlewares/auth";
import { favoriteController } from "./controllers/favoriteController";

const router = express.Router();

// Users
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Categories
router.get("/categories", ensureAuth, categoriesController.index);
router.get("/categories/:id", ensureAuth, categoriesController.show);

// Couses
router.get("/courses/featured", ensureAuth, coursesController.featured);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/search", ensureAuth, coursesController.search);
// Rotas dinâmicas abaixo
router.get("/courses/:id", ensureAuth, coursesController.show);

// Episodes
router.get("/episodes/stream", ensureAuthInQuery, episodesController.stream);

// Favorites
router.post("/favorites", ensureAuth, favoriteController.save);

export {router};