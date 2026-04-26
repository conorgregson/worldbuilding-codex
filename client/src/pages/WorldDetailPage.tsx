import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteWorld, getWorld, updateWorld } from "../features/worlds/worlds.api";
import { createEntity, getEntities } from "../features/entities/entities.api";
import {
  createEvent,
  deleteEvent,
  getWorldEvents,
  updateEvent,
} from "../features/events/events.api";
import {
  createRelationship,
  deleteRelationship,
  getEntityRelationships,
} from "../features/relationships/relationships.api";
import { WorldSummarySection } from "../features/world-detail/WorldSummarySection";
import { WorldEditSection } from "../features/world-detail/WorldEditSection";
import { EntityCreateSection } from "../features/world-detail/EntityCreateSection";
import { EntityListSection } from "../features/world-detail/EntityListSection";
import { EventFormSection } from "../features/world-detail/EventFormSection";
import { TimelineSection } from "../features/world-detail/TimelineSection";
import { RelationshipExplorerSection } from "../features/world-detail/RelationshipExplorerSection";
import type {
  EntityCreateValues,
  EventFormValues,
  RelationshipFormValues,
  WorldEditValues,
} from "../features/world-detail/types";
import type { EntityType } from "../features/entities/entities.types";
import type {
  CreateEventInput,
  Event,
  UpdateEventInput,
} from "../features/events/events.types";

export default function WorldDetailPage() {
  const { worldId } = useParams();
  const resolvedWorldId = worldId ?? "";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const worldEditRef = useRef<HTMLDivElement | null>(null);
  const eventFormRef = useRef<HTMLDivElement | null>(null);

  const [worldEditValues, setWorldEditValues] = useState<WorldEditValues>({
    title: "",
    genre: "",
    description: "",
  });

  const [entityCreateValues, setEntityCreateValues] = useState<EntityCreateValues>({
    type: "CHARACTER",
    name: "",
    summary: "",
    description: "",
    notes: "",
    tags: "",
  });

  const [eventFormValues, setEventFormValues] = useState<EventFormValues>({
    editingEventId: null,
    title: "",
    dateLabel: "",
    sortYear: "",
    sortIndex: "",
    summary: "",
    description: "",
    participants: [],
  });

  const [relationshipFormValues, setRelationshipFormValues] =
    useState<RelationshipFormValues>({
      selectedEntityId: "",
      targetEntityId: "",
      relationshipType: "",
      note: "",
    });

  const [eventSuccessMessage, setEventSuccessMessage] = useState("");
  const [relationshipSuccessMessage, setRelationshipSuccessMessage] = useState("");

  const worldQuery = useQuery({
    queryKey: ["world", resolvedWorldId],
    queryFn: () => getWorld(resolvedWorldId),
    enabled: Boolean(worldId),
  });

  const entitiesQuery = useQuery({
    queryKey: ["world", resolvedWorldId, "entities"],
    queryFn: () => getEntities(resolvedWorldId),
    enabled: Boolean(worldId),
  });

  const eventsQuery = useQuery({
    queryKey: ["world", resolvedWorldId, "events"],
    queryFn: () => getWorldEvents(resolvedWorldId),
    enabled: Boolean(worldId),
  });

  const relationshipsQuery = useQuery({
    queryKey: ["entity", relationshipFormValues.selectedEntityId, "relationships"],
    queryFn: () => getEntityRelationships(relationshipFormValues.selectedEntityId),
    enabled: Boolean(relationshipFormValues.selectedEntityId),
  });

  const updateWorldMutation = useMutation({
    mutationFn: (input: {
      title?: string;
      genre?: string | null;
      description?: string | null;
    }) => updateWorld(resolvedWorldId, input),
    onSuccess: (updatedWorld) => {
      queryClient.setQueryData(["world", resolvedWorldId], updatedWorld);
      void queryClient.invalidateQueries({ queryKey: ["worlds"] });
    },
  });

  const deleteWorldMutation = useMutation({
    mutationFn: () => deleteWorld(resolvedWorldId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["worlds"] });
      navigate("/worlds");
    },
  });

  const createEntityMutation = useMutation({
    mutationFn: (input: {
      type: EntityType;
      name: string;
      summary?: string | null;
      description?: string | null;
      notes?: string | null;
      tags?: string[];
    }) => createEntity(resolvedWorldId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["world", resolvedWorldId, "entities"],
      });

      setEntityCreateValues({
        type: "CHARACTER",
        name: "",
        summary: "",
        description: "",
        notes: "",
        tags: "",
      });
    },
  });

  const createEventMutation = useMutation({
    mutationFn: (input: CreateEventInput) => createEvent(resolvedWorldId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["world", resolvedWorldId, "events"],
      });

      setEventFormValues({
        editingEventId: null,
        title: "",
        dateLabel: "",
        sortYear: "",
        sortIndex: "",
        summary: "",
        description: "",
        participants: [],
      });
      setEventSuccessMessage("Event created successfully.");
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: ({
      eventId,
      input,
    }: {
      eventId: string;
      input: UpdateEventInput;
    }) => updateEvent(eventId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["world", resolvedWorldId, "events"],
      });

      setEventFormValues({
        editingEventId: null,
        title: "",
        dateLabel: "",
        sortYear: "",
        sortIndex: "",
        summary: "",
        description: "",
        participants: [],
      });
      setEventSuccessMessage("Event updated successfully.");
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: (eventId: string) => deleteEvent(eventId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["world", resolvedWorldId, "events"],
      });
    },
  });

  const createRelationshipMutation = useMutation({
    mutationFn: (input: {
      sourceEntityId: string;
      targetEntityId: string;
      relationshipType: string;
      note?: string | null;
    }) => createRelationship(resolvedWorldId, input),
    onSuccess: async () => {
      if (relationshipFormValues.selectedEntityId) {
        await queryClient.invalidateQueries({
          queryKey: ["entity", relationshipFormValues.selectedEntityId, "relationships"],
        });
      }

      setRelationshipFormValues((current) => ({
        ...current,
        targetEntityId: "",
        relationshipType: "",
        note: "",
      }));
      setRelationshipSuccessMessage("Relationship created successfully.");
    },
  });

  const deleteRelationshipMutation = useMutation({
    mutationFn: (relationshipId: string) => deleteRelationship(relationshipId),
    onSuccess: async () => {
      if (relationshipFormValues.selectedEntityId) {
        await queryClient.invalidateQueries({
          queryKey: ["entity", relationshipFormValues.selectedEntityId, "relationships"],
        });
      }
    },
  });

  function loadWorldIntoForm() {
    if (!worldQuery.data) return;

    setWorldEditValues({
      title: worldQuery.data.title,
      genre: worldQuery.data.genre ?? "",
      description: worldQuery.data.description ?? "",
    });

    requestAnimationFrame(() => {
      worldEditRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  async function handleWorldUpdate() {
    await updateWorldMutation.mutateAsync({
      title: worldEditValues.title,
      genre: worldEditValues.genre || null,
      description: worldEditValues.description || null,
    });
  }

  async function handleEntityCreate() {
    await createEntityMutation.mutateAsync({
      type: entityCreateValues.type,
      name: entityCreateValues.name,
      summary: entityCreateValues.summary || null,
      description: entityCreateValues.description || null,
      notes: entityCreateValues.notes || null,
      tags: entityCreateValues.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  }

  function loadEventIntoForm(event: Event) {
    setEventFormValues({
      editingEventId: event.id,
      title: event.title,
      dateLabel: event.dateLabel ?? "",
      sortYear: event.sortYear?.toString() ?? "",
      sortIndex: event.sortIndex?.toString() ?? "",
      summary: event.summary ?? "",
      description: event.description ?? "",
      participants: event.participants.map((participant) => ({
        entityId: participant.entityId,
        roleLabel: participant.roleLabel ?? "",
      })),
    });
    setEventSuccessMessage("");

    requestAnimationFrame(() => {
      eventFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  async function handleEventSubmit() {
    const payload: CreateEventInput = {
      title: eventFormValues.title,
      dateLabel: eventFormValues.dateLabel || null,
      sortYear: eventFormValues.sortYear ? Number(eventFormValues.sortYear) : null,
      sortIndex: eventFormValues.sortIndex ? Number(eventFormValues.sortIndex) : null,
      summary: eventFormValues.summary || null,
      description: eventFormValues.description || null,
      participants: eventFormValues.participants
        .filter((participant) => participant.entityId)
        .map((participant) => ({
          entityId: participant.entityId,
          roleLabel: participant.roleLabel || null,
        })),
    };

    if (eventFormValues.editingEventId) {
      await updateEventMutation.mutateAsync({
        eventId: eventFormValues.editingEventId,
        input: payload,
      });
    } else {
      await createEventMutation.mutateAsync(payload);
    }
  }

  function handleDeleteEvent(eventId: string) {
    const confirmed = window.confirm("Delete this event?");
    if (confirmed) {
      void deleteEventMutation.mutateAsync(eventId);
    }
  }

  function handleDeleteWorld() {
    const confirmed = window.confirm("Delete this world?");
    if (confirmed) {
      void deleteWorldMutation.mutateAsync();
    }
  }

  async function handleRelationshipSubmit() {
    if (!relationshipFormValues.selectedEntityId) return;

    await createRelationshipMutation.mutateAsync({
      sourceEntityId: relationshipFormValues.selectedEntityId,
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

  if (!worldId) {
    return <p>Missing world ID.</p>;
  }

  if (!worldQuery.data) {
    return <p>Loading world...</p>;
  }

  return (
    <div className="page-shell">
      <WorldSummarySection
        world={worldQuery.data}
        isDeleting={deleteWorldMutation.isPending}
        onBackToWorlds={() => navigate("/worlds")}
        onLoadIntoEditForm={loadWorldIntoForm}
        onDelete={handleDeleteWorld}
      />

      <WorldEditSection
        ref={worldEditRef}
        values={worldEditValues}
        isSaving={updateWorldMutation.isPending}
        errorMessage={
          updateWorldMutation.error instanceof Error
            ? updateWorldMutation.error.message
            : undefined
        }
        onChange={setWorldEditValues}
        onSubmit={handleWorldUpdate}
      />

      <EntityCreateSection
        values={entityCreateValues}
        isCreating={createEntityMutation.isPending}
        errorMessage={
          createEntityMutation.error instanceof Error
            ? createEntityMutation.error.message
            : undefined
        }
        onChange={setEntityCreateValues}
        onSubmit={handleEntityCreate}
      />

      <EntityListSection
        entities={entitiesQuery.data ?? []}
        isLoading={entitiesQuery.isLoading}
        errorMessage={
          entitiesQuery.error instanceof Error ? entitiesQuery.error.message : undefined
        }
      />

      <EventFormSection
        ref={eventFormRef}
        values={eventFormValues}
        entities={entitiesQuery.data ?? []}
        isSaving={createEventMutation.isPending || updateEventMutation.isPending}
        successMessage={eventSuccessMessage}
        errorMessage={
          createEventMutation.error instanceof Error
            ? createEventMutation.error.message
            : updateEventMutation.error instanceof Error
              ? updateEventMutation.error.message
              : undefined
        }
        onChange={setEventFormValues}
        onSubmit={handleEventSubmit}
        onCancelEdit={() =>
          setEventFormValues({
            editingEventId: null,
            title: "",
            dateLabel: "",
            sortYear: "",
            sortIndex: "",
            summary: "",
            description: "",
            participants: [],
          })
        }
        onAddParticipant={() =>
          setEventFormValues((current) => ({
            ...current,
            participants: [...current.participants, { entityId: "", roleLabel: "" }],
          }))
        }
        onRemoveParticipant={(index) =>
          setEventFormValues((current) => ({
            ...current,
            participants: current.participants.filter((_, i) => i !== index),
          }))
        }
        onUpdateParticipant={(index, key, value) =>
          setEventFormValues((current) => ({
            ...current,
            participants: current.participants.map((participant, i) =>
              i === index ? { ...participant, [key]: value } : participant
            ),
          }))
        }
      />

      <TimelineSection
        events={eventsQuery.data ?? []}
        isLoading={eventsQuery.isLoading}
        errorMessage={eventsQuery.error instanceof Error ? eventsQuery.error.message : undefined}
        isDeleting={deleteEventMutation.isPending}
        onEdit={loadEventIntoForm}
        onDelete={handleDeleteEvent}
      />

      <RelationshipExplorerSection
        entities={entitiesQuery.data ?? []}
        relationships={relationshipsQuery.data}
        isRelationshipsLoading={relationshipsQuery.isLoading}
        relationshipsErrorMessage={
          relationshipsQuery.error instanceof Error
            ? relationshipsQuery.error.message
            : undefined
        }
        values={relationshipFormValues}
        successMessage={relationshipSuccessMessage}
        errorMessage={
          createRelationshipMutation.error instanceof Error
            ? createRelationshipMutation.error.message
            : undefined
        }
        isCreating={createRelationshipMutation.isPending}
        isDeleting={deleteRelationshipMutation.isPending}
        onChange={setRelationshipFormValues}
        onSubmit={handleRelationshipSubmit}
        onDeleteRelationship={handleDeleteRelationship}
      />
    </div>
  );
}