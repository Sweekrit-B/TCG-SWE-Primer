export type User = {
    id: number;
    user_name: string;
    user_grad_year: number;
    user_tcg_status: string;
    user_email: string;
};

// GET /user/:id - Get user by ID
export const getUserById = async (id: number): Promise<User> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch user with ID ${id}`);
    }
    const data = await response.json() as User;
    return data;
};

// GET /user/all - Get all users
export const getAllUsers = async (): Promise<User[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all`);
    if (!response.ok) {
        throw new Error("Failed to fetch all users");
    }
    const data = (await response.json()) as User[];
    return data;
};

// POST /user - Create a new user
export const createUser = async (user: Omit<User, "id">): Promise<User> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error("Failed to create user");
    }
    const data = await response.json() as User;
    return data;
};

// PUT /user/:id - Update a user by ID
export const updateUserById = async (id: number, user: Partial<Omit<User, "id">>): Promise<User> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error(`Failed to update user with ID ${id}`);
    }
    const data = await response.json() as User;
    return data;
};

// DELETE /user/:id - Delete a user by ID
export const deleteUserById = async (id: number): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Failed to delete user with ID ${id}`);
    }
};