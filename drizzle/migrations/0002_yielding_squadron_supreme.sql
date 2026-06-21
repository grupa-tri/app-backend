ALTER TABLE "todos" DROP CONSTRAINT IF EXISTS "todos_tenant_id_tenants_id_fk";
--> statement-breakpoint
ALTER TABLE "todos" DROP COLUMN IF EXISTS "tenant_id";
--> statement-breakpoint
DROP TABLE IF EXISTS "tenants" CASCADE;
