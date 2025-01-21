export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role?: "USER" | "ADMIN";
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
    active?: boolean;
    role?: "USER" | "ADMIN";
}

export interface LoginUserDTO {
    email: string;
    password: string;
}
