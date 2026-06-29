import { Router } from "express";
import * as projectsController from "../controllers/projects";

const router = Router();

// GET all projects
router.get("/", projectsController.getAllProjects);

// GET project by id
router.get("/:id", projectsController.getProjectById);

// CREATE project
router.post("/", projectsController.createProject);

// UPDATE project
router.put("/:id", projectsController.updateProject);

// DELETE project
router.delete("/:id", projectsController.deleteProject);

export default router;
