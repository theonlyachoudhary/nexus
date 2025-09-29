import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_testimonials" CASCADE;
  ALTER TABLE "pages_blocks_testimonials" RENAME COLUMN "heading" TO "title";
  ALTER TABLE "pages_blocks_testimonials" RENAME COLUMN "subheading" TO "description";
  ALTER TABLE "_pages_v_blocks_testimonials" RENAME COLUMN "heading" TO "title";
  ALTER TABLE "_pages_v_blocks_testimonials" RENAME COLUMN "subheading" TO "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"company" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"company" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_testimonials" RENAME COLUMN "title" TO "heading";
  ALTER TABLE "pages_blocks_testimonials" RENAME COLUMN "description" TO "subheading";
  ALTER TABLE "_pages_v_blocks_testimonials" RENAME COLUMN "title" TO "heading";
  ALTER TABLE "_pages_v_blocks_testimonials" RENAME COLUMN "description" TO "subheading";
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_testimonials_testimonials_order_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_testimonials_parent_id_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_order_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_parent_id");`)
}
