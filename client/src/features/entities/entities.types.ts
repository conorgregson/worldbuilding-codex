export type EntityType = 
    | "CHARACTER"
    | "LOCATION"
    | "FACTION"
    | "SPECIES"
    | "RELIGION"
    | "LANGUAGE"
    | "ARTIFACT"
    | "ORGANIZATION"
    | "CULTURE"
    | "OTHER";

export type EntityTag = {
    id: string;
    entityId: string;
    tag: string;
    createdAt: string;
};

export type Entity = {
    id: string;
    worldId: string;
    type: EntityType;
    name: string;
    summary: string | null;
    description: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    tags: EntityTag[];
};

export type CreateEntityInput = {
    type: EntityType;
    name: string;
    summary?: string | null;
    description?: string | null;
    notes?: string | null;
    tags?: string[];
};