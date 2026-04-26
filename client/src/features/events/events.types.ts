import type { EntityType } from "../entities/entities.types";

export type EventParticipant = {
    id: string;
    eventId: string;
    entityId: string;
    roleLabel: string | null;
    entity: {
        id: string;
        name: string;
        type: EntityType;
        worldId: string;
    };
};

export type Event = {
    id: string;
    worldId: string;
    title: string;
    dateLabel: string | null;
    sortYear: number | null;
    sortIndex: number | null;
    summary: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    participants: EventParticipant[];
};

export type EventParticipantInput = {
    entityId: string;
    roleLabel?: string | null;
};

export type CreateEventInput = {
    title: string;
    dateLabel?: string | null;
    sortYear?: number | null;
    sortIndex?: number | null;
    summary?: string | null;
    description?: string | null;
    participants?: EventParticipantInput[];
};

export type UpdateEventInput = Partial<CreateEventInput>;