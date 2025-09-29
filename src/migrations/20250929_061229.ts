import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_testimonials_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_testimonials_fk";
  
  DROP INDEX "pages_rels_testimonials_id_idx";
  DROP INDEX "_pages_v_rels_testimonials_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "testimonials_id";`)
}
