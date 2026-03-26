
import { Router } from "express";
import * as associatesController from "../controllers/associates";

const router = Router();

// GET /associates/associate/:project_id - Get associates by project ID
router.get("/associate/:id", associatesController.getAssociatesByProjectId);

// GET /associates/project/:associate_id - Get projects by associate ID
router.get("/project/:id", associatesController.getProjectsByAssociateId);

// POST /associates - Create a new associate project relationship
router.post("/", associatesController.createAssociate);

// DELETE /associates/:id - Delete an associate project relationship by ID
router.delete("/:id", associatesController.deleteAssociateById);

export default router;
