export interface CreateQuizDTO {
    title: string;
    description: string;
    duration: number;
    createdBy: string; // User ID of the admin
    questions?: string[]; // Optional list of question IDs
}

export interface UpdateQuizDTO {
    title?: string;
    description?: string;
    duration?: number;
    isActive?: boolean;
}
