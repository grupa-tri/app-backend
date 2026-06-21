CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "tenant_id" uuid;
--> statement-breakpoint
INSERT INTO "tenants" ("id", "name")
SELECT '11111111-1111-4111-8111-111111111111', 'Migrated Tenant'
WHERE EXISTS (SELECT 1 FROM "todos");
--> statement-breakpoint
UPDATE "todos"
SET "tenant_id" = '11111111-1111-4111-8111-111111111111'
WHERE "tenant_id" IS NULL;
--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "tenant_id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
