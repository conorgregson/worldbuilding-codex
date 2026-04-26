export type World = {
    id: string;
    userId: string;
    title: string;
    genre: string | null;
    description: string | null;
    visibility: "PRIVATE" | "PUBLIC" | "UNLISTED";
    createdAt: string;
    updatedAt: string;
};

export type CreateWorldInput = {
    title: string;
    genre?: string | null;
    description?: string | null;
}