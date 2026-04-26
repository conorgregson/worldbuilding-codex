import type { Entity, EntityType } from "../entities/entities.types";
import type { Event, EventParticipantInput } from "../events/events.types";
import type {
  EntityRelationshipsResponse,
} from "../relationships/relationships.types";
import type { World } from "../worlds/worlds.types";

export type WorldEditValues = {
  title: string;
  genre: string;
  description: string;
};

export type EntityCreateValues = {
  type: EntityType;
  name: string;
  summary: string;
  description: string;
  notes: string;
  tags: string;
};

export type EventFormValues = {
  editingEventId: string | null;
  title: string;
  dateLabel: string;
  sortYear: string;
  sortIndex: string;
  summary: string;
  description: string;
  participants: EventParticipantInput[];
};

export type RelationshipFormValues = {
  selectedEntityId: string;
  targetEntityId: string;
  relationshipType: string;
  note: string;
};

export type WorldSummarySectionProps = {
  world: World;
  isDeleting: boolean;
  onBackToWorlds: () => void;
  onLoadIntoEditForm: () => void;
  onDelete: () => void;
};

export type WorldEditSectionProps = {
  values: WorldEditValues;
  isSaving: boolean;
  errorMessage?: string;
  onChange: (next: WorldEditValues) => void;
  onSubmit: () => void;
};

export type EntityCreateSectionProps = {
  values: EntityCreateValues;
  isCreating: boolean;
  errorMessage?: string;
  onChange: (next: EntityCreateValues) => void;
  onSubmit: () => void;
};

export type EntityListSectionProps = {
  entities: Entity[];
  isLoading: boolean;
  errorMessage?: string;
};

export type EventFormSectionProps = {
  values: EventFormValues;
  entities: Entity[];
  isSaving: boolean;
  successMessage?: string;
  errorMessage?: string;
  onChange: (next: EventFormValues) => void;
  onSubmit: () => void;
  onCancelEdit: () => void;
  onAddParticipant: () => void;
  onRemoveParticipant: (index: number) => void;
  onUpdateParticipant: (
    index: number,
    key: "entityId" | "roleLabel",
    value: string
  ) => void;
};

export type TimelineSectionProps = {
  events: Event[];
  isLoading: boolean;
  errorMessage?: string;
  isDeleting: boolean;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
};

export type RelationshipExplorerSectionProps = {
  entities: Entity[];
  relationships?: EntityRelationshipsResponse;
  isRelationshipsLoading: boolean;
  relationshipsErrorMessage?: string;
  values: RelationshipFormValues;
  successMessage?: string;
  errorMessage?: string;
  isCreating: boolean;
  isDeleting: boolean;
  onChange: (next: RelationshipFormValues) => void;
  onSubmit: () => void;
  onDeleteRelationship: (relationshipId: string) => void;
};