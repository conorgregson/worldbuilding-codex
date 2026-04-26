import { useState, type SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorld, deleteWorld, getWorlds, updateWorld } from "../features/worlds/worlds.api";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { StatusMessage } from "../components/ui/StatusMessage";
import type { World } from "../features/worlds/worlds.types";

export default function WorldsPage() {
  const queryClient = useQueryClient();

  const worldsQuery = useQuery({
    queryKey: ["worlds"],
    queryFn: getWorlds,
  });

  const createWorldMutation = useMutation({
    mutationFn: createWorld,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["worlds"] });
    },
  });

  const updateWorldMutation = useMutation({
    mutationFn: ({ worldId, input }: { worldId: string; input: Partial<World> }) =>
      updateWorld(worldId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["worlds"] });
    },
  });

  const deleteWorldMutation = useMutation({
    mutationFn: deleteWorld,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["worlds"] });
    },
  });

  const [editingWorldId, setEditingWorldId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  const worlds = Array.isArray(worldsQuery.data) ? worldsQuery.data : [];

  function loadWorldIntoForm(world: World) {
    setEditingWorldId(world.id);
    setTitle(world.title);
    setGenre(world.genre ?? "");
    setDescription(world.description ?? "");
  }

  function resetForm() {
    setEditingWorldId(null);
    setTitle("");
    setGenre("");
    setDescription("");
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (editingWorldId) {
        await updateWorldMutation.mutateAsync({
          worldId: editingWorldId,
          input: {
            title,
            genre: genre || null,
            description: description || null,
          },
        });
      } else {
        await createWorldMutation.mutateAsync({
          title,
          genre: genre || null,
          description: description || null,
        });
      }

      resetForm();
    } catch {
      // handled below
    }
  }

  function handleDeleteWorld(worldId: string) {
    const confirmed = window.confirm("Delete this world?");
    if (confirmed) {
      void deleteWorldMutation.mutateAsync(worldId);
    }
  }

  return (
    <div className="page-shell">
      <div className="section-heading">
        <h1>My Worlds</h1>
        <p>Create and manage your fictional worlds.</p>
      </div>

      <Card>
        <div className="section-heading">
          <h2>{editingWorldId ? "Edit World" : "Create World"}</h2>
          <p>
            {editingWorldId
              ? "Update the selected world’s core details."
              : "Create a new fictional world to start building its lore."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="page-subsection-stack">
          <Input
            placeholder="World title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            placeholder="Genre"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          {createWorldMutation.isError || updateWorldMutation.isError ? (
            <StatusMessage variant="error">
              {createWorldMutation.error instanceof Error
                ? createWorldMutation.error.message
                : updateWorldMutation.error instanceof Error
                  ? updateWorldMutation.error.message
                  : "Failed to save world"}
            </StatusMessage>
          ) : null}

          <div className="card-actions">
            <Button
              type="submit"
              disabled={createWorldMutation.isPending || updateWorldMutation.isPending}
            >
              {createWorldMutation.isPending || updateWorldMutation.isPending
                ? "Saving..."
                : editingWorldId
                  ? "Save Changes"
                  : "Create World"}
            </Button>

            {editingWorldId ? (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel Edit
              </Button>
            ) : null}
          </div>
        </form>
      </Card>

      <div className="page-section-stack">
        {worldsQuery.isLoading ? (
          <StatusMessage variant="muted">Loading worlds...</StatusMessage>
        ) : null}

        {worldsQuery.isError ? (
          <StatusMessage variant="error">
            {worldsQuery.error instanceof Error
              ? worldsQuery.error.message
              : "Failed to load worlds"}
          </StatusMessage>
        ) : null}

        {!worldsQuery.isLoading && !worldsQuery.isError && worlds.length === 0 ? (
          <StatusMessage variant="muted">
            No worlds yet. Create your first world to begin building connected lore.
          </StatusMessage>
        ) : null}

        {worlds.map((world) => (
          <Card key={world.id} className="surface-card">
            <div className="card-content-stack">
              <h3 className="text-reset">{world.title}</h3>
              <p className="muted-text-reset">{world.genre ?? "No genre set"}</p>
              <p className="text-reset">{world.description ?? "No description yet."}</p>
            </div>

            <div className="card-actions">
              <Link to={`/worlds/${world.id}`} style={{ textDecoration: "none" }}>
                <Button type="button" variant="secondary">
                  Open World
                </Button>
              </Link>

              <Button
                type="button"
                variant="secondary"
                onClick={() => loadWorldIntoForm(world)}
              >
                Edit
              </Button>

              <Button
                type="button"
                variant="danger"
                onClick={() => handleDeleteWorld(world.id)}
                disabled={deleteWorldMutation.isPending}
              >
                {deleteWorldMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}