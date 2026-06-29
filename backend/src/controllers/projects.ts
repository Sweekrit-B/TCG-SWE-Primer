import { Request, Response } from "express";
import { supabase } from "../app";

// Check section 1-2 in the README for more details on how to create this controller.

// Get project by ID
export const getProjectById = async (req: Request, res: Response) => {
    const projectId = req.params.id;
  
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();
  
    if (error) {
      console.error("Error fetching project by ID:", error);
      return res.status(500).json({ error: "Failed to fetch project" });
    }
  
    return res.json(data);
  };

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
    const { data, error } = await supabase
      .from("projects")
      .select("*");
  
    if (error) {
      console.error("Error fetching all projects:", error);
      return res.status(500).json({ error: "Failed to fetch projects" });
    }
  
    return res.json(data);
  };

// Create a new project
export const createProject = async (req: Request, res: Response) => {
    const {project_name, project_manager_id, project_description} = req.body;
  
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          project_name: project_name,
          project_manager_id: project_manager_id,
          project_description: project_description,
        },
      ])
      .select()
      .single();
  
    if (error) {
      console.error("Error creating project:", error);
      return res.status(500).json({ error: "Failed to create project" });
    }
  
    return res.status(201).json(data);
  };

// Update a project
export const updateProject = async (req: Request, res: Response) => {
    const projectId = req.params.id;
    const { name, managerId, description } = req.body;
  
    const { data, error } = await supabase
      .from("projects")
      .update({
        project_name: name,
        project_manager_id: managerId,
        project_description: description,
      })
      .eq("id", projectId)
      .select()
      .single();
  
    if (error) {
      console.error("Error updating project:", error);
      return res.status(500).json({ error: "Failed to update project" });
    }
  
    return res.json(data);
  };

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
    const projectId = req.params.id;
  
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);
  
    if (error) {
      console.error("Error deleting project:", error);
      return res.status(500).json({ error: "Failed to delete project" });
    }
  
    return res.json({ message: "Project deleted successfully" });
  };