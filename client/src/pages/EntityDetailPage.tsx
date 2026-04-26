import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteEntity,
  getEntity,
  getEntities,
  updateEntity,
} from "../features/entities/entities.api";
import {
  createRelationship,
  deleteRelationship,
  getEntityRelationships,
} from "../features/relationships/relationships.api";
import { EntitySummarySection } from "../features/entity-detail/EntitySummarySection";
import { EntityEditSection } from "../features/entity-detail/EntityEditSection";
import { EntityRelationshipFormSection } from "../features/entity-detail/EntityRelationshipFormSection";
import { EntityRelationshipsSection } from "../features/entity-detail/EntityRelationshipsSection";
import type {
  EntityEditValues,
  EntityRelationshipFormValues,
} from "../features/entity-detail/types";
import type { EntityType } from "../features/entities/entities.types";

export default function EntityDetailPage() {
  const { entityId } = useParams();
  const resolvedEntityId = entityId ?? "";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [editValues, setEditValues] = useState<EntityEditValues>({
    type: "CHARACTER",
    name: "",
    summary: "",
    description: "",
    notes: "",
    tags: "",
  });

  const [hasInitializedEditValues, setHasInitializedEditValues] = useState(false);

  const [relationshipFormValues, setRelationshipFormValues] =
    useState<EntityRelationshipFormValues>({
      targetEntityId: "",
      relationshipType: "",
      note: "",
    });

  const [successMessage, setSuccessMessage] = useState("");
  const [relationshipSuccessMessage, setRelationshipSuccessMessage] = useState("");

  const entityQuery = useQuery({
    queryKey: ["entity", resolvedEntityId],
    queryFn: () => getEntity(resolvedEntityId),
    enabled: Boolean(entityId),
  });

  const entity = entityQuery.data;

  const worldEntitiesQuery = useQuery({
    queryKey: ["world", entity?.worldId, "entities", "for-relationships"],
    queryFn: () => getEntities(entity!.worldId),
    enabled: Boolean(entity?.worldId),
  });

  const relationshipsQuery = useQuery({
    queryKey: ["entity", resolvedEntityId, "relationships"],
    queryFn: () => getEntityRelationships(resolvedEntityId),
    enabled: Boolean(entityId),
  });

  const updateEntityMutation = useMutation({
    mutationFn: (input: {
      type?: EntityType;
      name?: string;
      summary?: string | null;
      description?: string | null;
      notes?: string | null;
      tags?: string[];
    }) => updateEntity(resolvedEntityId, input),
    onSuccess: async (updatedEntity) => {
      queryClient.setQueryData(["entity", resolvedEntityId], updatedEntity);
      await queryClient.invalidateQueries({
        queryKey: ["world", updatedEntity.worldId, "entities"],
      });

      setSuccessMessage("Entity updated successfully.");
    },
  });

  const deleteEntityMutation = useMutation({
    mutationFn: () => deleteEntity(resolvedEntityId),
    onSuccess: async () => {
      if (entity) {
        await queryClient.invalidateQueries({
          queryKey: ["world", entity.worldId, "entities"],
        });
        queryClient.removeQueries({ queryKey: ["entity", resolvedEntityId] });
        navigate(`/worlds/${entity.worldId}`);
      } else {
        navigate("/worlds");
      }
    },
  });

  const createRelationshipMutation = useMutation({
    mutationFn: (input: {
      sourceEntityId: string;
      targetEntityId: string;
      relationshipType: string;
      note?: string | null;
    }) => {
      if (!entity) {
        throw new Error("Entity not loaded");
      }

      return createRelationship(entity.worldId, input);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["entity", resolvedEntityId, "relationships"],
      });

      setRelationshipFormValues({
        targetEntityId: "",
        relationshipType: "",
        note: "",
      });
      setRelationshipSuccessMessage("Relationship created successfully.");
    },
  });

  const deleteRelationshipMutation = useMutation({
    mutationFn: (relationshipId: string) => deleteRelationship(relationshipId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["entity", resolvedEntityId, "relationships"],
      });
    },
  });

  function buildEditValuesFromEntity() {
    if (!entity) {
      return {
        type: "CHARACTER" as EntityType,
        name: "",
        summary: "",
        description: "",
        notes: "",
        tags: "",
      };
    }

    return {
      type: entity.type,
      name: entity.name,
      summary: entity.summary ?? "",
      description: entity.description ?? "",
      notes: entity.notes ?? "",
      tags: entity.tags.map((tag) => tag.tag).join(", "),
    };
  }

  if (entity && !hasInitializedEditValues) {
    setEditValues(buildEditValuesFromEntity());
    setHasInitializedEditValues(true);
  }

  async function handleEntitySubmit() {
    await updateEntityMutation.mutateAsync({
      type: editValues.type,
      name: editValues.name,
      summary: editValues.summary || null,
      description: editValues.description || null,
      notes: editValues.notes || null,
      tags: editValues.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  }

  function handleReset() {
    if (!entity) return;

    setEditValues(buildEditValuesFromEntity());
    setSuccessMessage("");
  }

  function handleDeleteEntity() {
    const confirmed = window.confirm("Delete this entity?");
    if (confirmed) {
      void deleteEntityMutation.mutateAsync();
    }
  }

  async function handleRelationshipSubmit() {
    if (!entity) return;

    await createRelationshipMutation.mutateAsync({
      sourceEntityId: entity.id,
      targetEntityId: relationshipFormValues.targetEntityId,
      relationshipType: relationshipFormValues.relationshipType,
      note: relationshipFormValues.note || null,
    });
  }

  function handleDeleteRelationship(relationshipId: string) {
    const confirmed = window.confirm("Delete this relationship?");
    if (confirmed) {
      void deleteRelationshipMutation.mutateAsync(relationshipId);
    }
  }

  if (!entityId) {
    return <p>Missing entity ID.</p>;
  }

  if (!entity) {
    return <p>Loading entity...</p>;
  }

  const currentTags = entity.tags.map((tag) => tag.tag).join(", ");

  const isDirty =
    editValues.type !== entity.type ||
    editValues.name !== entity.name ||
    editValues.summary !== (entity.summary ?? "") ||
    editValues.description !== (entity.description ?? "") ||
    editValues.notes !== (entity.notes ?? "") ||
    editValues.tags !== currentTags;

  return (
    <div className="page-shell">
      <EntitySummarySection
        entity={entity}
        isDeleting={deleteEntityMutation.isPending}
        onBackToWorld={() => navigate(`/worlds/${entity.worldId}`)}
        onDelete={handleDeleteEntity}
      />

      <EntityEditSection
        values={editValues}
        isDirty={isDirty}
        isSaving={updateEntityMutation.isPending}
        successMessage={successMessage}
        errorMessage={
          updateEntityMutation.error instanceof Error
            ? updateEntityMutation.error.message
            : undefined
        }
        onChange={(next: EntityEditValues) => {
          setEditValues(next);
          setSuccessMessage("");
        }}
        onSubmit={handleEntitySubmit}
        onReset={handleReset}
      />

      <EntityRelationshipFormSection
        currentEntity={entity}
        entities={worldEntitiesQuery.data ?? []}
        values={relationshipFormValues}
        isCreating={createRelationshipMutation.isPending}
        successMessage={relationshipSuccessMessage}
        errorMessage={
          createRelationshipMutation.error instanceof Error
            ? createRelationshipMutation.error.message
            : undefined
        }
        onChange={(next: EntityRelationshipFormValues) => {
          setRelationshipFormValues(next);
          setRelationshipSuccessMessage("");
        }}
        onSubmit={handleRelationshipSubmit}
      />

      <EntityRelationshipsSection
        currentEntity={entity}
        relationships={relationshipsQuery.data}
        isLoading={relationshipsQuery.isLoading}
        errorMessage={
          relationshipsQuery.error instanceof Error
            ? relationshipsQuery.error.message
            : undefined
        }
        isDeleting={deleteRelationshipMutation.isPending}
        onDeleteRelationship={handleDeleteRelationship}
      />
    </div>
  );
}