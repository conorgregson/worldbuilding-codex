import type { EntityType } from "../entities/entities.types";
import type { Entity } from "../entities/entities.types";
import type { EntityRelationshipsResponse } from "../relationships/relationships.types";

export type EntityEditValues = {
  type: EntityType;
  name: string;
  summary: string;
  description: string;
  notes: string;
  tags: string;
};

export type EntityRelationshipFormValues = {
  targetEntityId: string;
  relationshipType: string;
  note: string;
};

export type EntitySummarySectionProps = {
  entity: Entity;
  isDeleting: boolean;
  onBackToWorld: () => void;
  onDelete: () => void;
};

export type EntityEditSectionProps = {
  values: EntityEditValues;
  isDirty: boolean;
  isSaving: boolean;
  successMessage?: string;
  errorMessage?: string;
  onChange: (next: EntityEditValues) => void;
  onSubmit: () => void;
  onReset: () => void;
};

export type EntityRelationshipFormSectionProps = {
  currentEntity: Entity;
  entities: Entity[];
  values: EntityRelationshipFormValues;
  isCreating: boolean;
  successMessage?: string;
  errorMessage?: string;
  onChange: (next: EntityRelationshipFormValues) => void;
  onSubmit: () => void;
};

export type EntityRelationshipsSectionProps = {
  currentEntity: Entity;
  relationships?: EntityRelationshipsResponse;
  isLoading: boolean;
  errorMessage?: string;
  isDeleting: boolean;
  onDeleteRelationship: (relationshipId: string) => void;
};