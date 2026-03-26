import { Request, Response } from "express";
import { supabase } from "../app";

// GET /user/:id - Get user by ID
export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
    if (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ error: "Failed to fetch user" });
    }
    return res.json(data);
};

// GET /user/all - Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    const { data, error } = await supabase
        .from("users")
        .select("*");
    if (error) {
        console.error("Error fetching all users:", error);
        return res.status(500).json({ error: "Failed to fetch users" });
    }
    return res.json(data);
};

// POST /user - Create a new user
export const createUser = async (req: Request, res: Response) => {
    const { user_name, user_grad_year, user_tcg_status, user_email } = req.body;
    const userData = {
        ...(user_name !== undefined && { user_name }),
        ...(user_grad_year !== undefined && { user_grad_year }),
        ...(user_tcg_status !== undefined && { user_tcg_status }),
        ...(user_email !== undefined && { user_email }),
    };
    const { data, error } = await supabase
        .from("users")
        .insert(userData)
        .select("*")
        .single();
    if (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Failed to create user" });
    }
    return res.status(201).json(data);
};

// PUT /user/:id - Update a user by ID
export const updateUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { user_name, user_grad_year, user_tcg_status, user_email } = req.body;
    const userData = {
        ...(user_name !== undefined && { user_name }),
        ...(user_grad_year !== undefined && { user_grad_year }),
        ...(user_tcg_status !== undefined && { user_tcg_status }),
        ...(user_email !== undefined && { user_email }),
    };
    const { data, error } = await supabase
        .from("users")
        .update(userData)
        .eq("id", userId)
        .select("*")
        .single();
    if (error) {
        console.error("Error updating user by ID:", error);
        return res.status(500).json({ error: "Failed to update user" });
    }
    return res.json(data);
};

// DELETE /user/:id - Delete a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", userId)
        .select("*")
        .single();
    if (error) {
        console.error("Error deleting user by ID:", error);
        return res.status(500).json({ error: "Failed to delete user" });
    }
    return res.json(data);
};