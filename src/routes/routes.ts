import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { AuthUserMiddleware } from "../middlewares/auth-user.middleware";
import { ProfilesController } from "../controllers/profiles.controller";
import { upload } from "../multer/config";
import { ProjectsController } from "../controllers/projects.controller";

export const router: Router = Router();

// users
router.post("/users/signup", new UsersController().create);
router.post("/users/signin", new UsersController().auth);

// profiles
router.post(
  "/profiles/create",
  new AuthUserMiddleware().handler,
  new ProfilesController().create
);
router.put(
  "/profiles/update/:id",
  new AuthUserMiddleware().handler,
  new ProfilesController().update
);

// projects
router.post(
  "/projects/register",
  new AuthUserMiddleware().handler,
  upload.single("file"),
  new ProjectsController().create
);
router.get(
  "/projects/download/:id",
  new AuthUserMiddleware().handler,
  new ProjectsController().download
);
