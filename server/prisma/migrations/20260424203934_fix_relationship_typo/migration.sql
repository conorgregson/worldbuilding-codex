-- CreateIndex
CREATE INDEX "Relationship_worldId_idx" ON "Relationship"("worldId");

-- CreateIndex
CREATE INDEX "Relationship_sourceEntityId_idx" ON "Relationship"("sourceEntityId");

-- CreateIndex
CREATE INDEX "Relationship_targetEntityId_idx" ON "Relationship"("targetEntityId");

-- CreateIndex
CREATE INDEX "Relationship_worldId_relationshipType_idx" ON "Relationship"("worldId", "relationshipType");
