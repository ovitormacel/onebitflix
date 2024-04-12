import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
import { authController } from "./controllers/authController";
import { ensureAuth, ensureAuthInQuery } from "./middlewares/auth";
import { favoriteController } from "./controllers/favoriteController";
import { likeController } from "./controllers/likeController";
import { usersController } from "./controllers/usersController";

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
router.get('/courses/popular', ensureAuth, coursesController.popular);

// Rotas dinâmicas abaixo
router.get("/courses/:id", ensureAuth, coursesController.show);

// Episodes
router.get("/episodes/stream", ensureAuthInQuery, episodesController.stream);
router.get("/episodes/:id/watchTime", ensureAuth, episodesController.getWatchTime);
router.post("/episodes/:id/watchTime", ensureAuth, episodesController.setWatchTime);

// Favorites
router.post("/favorites", ensureAuth, favoriteController.save);
router.get("/favorites", ensureAuth, favoriteController.index);
router.delete("/favorites/:id", ensureAuth, favoriteController.delete);

// Likes
router.post("/likes", ensureAuth, likeController.save);
router.delete("/likes/:id", ensureAuth, likeController.remove);

// Users
router.get("/account", ensureAuth, usersController.show);
router.put("/account", ensureAuth, usersController.update);
router.put("/account/password", ensureAuth, usersController.updatePassword);
router.get("/users/current/watching", ensureAuth, usersController.watching);

export {router};