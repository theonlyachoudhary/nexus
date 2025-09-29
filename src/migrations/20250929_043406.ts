import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "products_key_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"product_acronym" varchar,
  	"one_sentence_description" varchar,
  	"full_description" varchar,
  	"card_color" varchar NOT NULL,
  	"flagship" boolean DEFAULT false,
  	"ranking" numeric,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"organization" varchar,
  	"testimonial" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "case_studies_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"metric" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_solutions_solutions_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_solutions_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_approach_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_solutions_solutions_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_solutions_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_approach_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_solutions_solutions_features" CASCADE;
  DROP TABLE "pages_blocks_solutions_solutions" CASCADE;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "pages_blocks_team_approach_stats" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_solutions_solutions_features" CASCADE;
  DROP TABLE "_pages_v_blocks_solutions_solutions" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_approach_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  ALTER TABLE "team_members" DROP CONSTRAINT "team_members_image_id_media_id_fk";
  
  DROP INDEX "team_members_image_idx";
  ALTER TABLE "pages_blocks_solutions" ALTER COLUMN "heading" SET DEFAULT 'Our Solutions';
  ALTER TABLE "pages_blocks_solutions" ALTER COLUMN "subheading" SET DEFAULT 'Explore our range of solutions designed to streamline your operations and drive success.';
  ALTER TABLE "_pages_v_blocks_solutions" ALTER COLUMN "heading" SET DEFAULT 'Our Solutions';
  ALTER TABLE "_pages_v_blocks_solutions" ALTER COLUMN "subheading" SET DEFAULT 'Explore our range of solutions designed to streamline your operations and drive success.';
  ALTER TABLE "team_members" ADD COLUMN "priority" numeric;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "case_studies_id" integer;
  ALTER TABLE "products_key_features" ADD CONSTRAINT "products_key_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_metrics" ADD CONSTRAINT "case_studies_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_key_features_order_idx" ON "products_key_features" USING btree ("_order");
  CREATE INDEX "products_key_features_parent_id_idx" ON "products_key_features" USING btree ("_parent_id");
  CREATE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "testimonials_slug_idx" ON "testimonials" USING btree ("slug");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "case_studies_metrics_order_idx" ON "case_studies_metrics" USING btree ("_order");
  CREATE INDEX "case_studies_metrics_parent_id_idx" ON "case_studies_metrics" USING btree ("_parent_id");
  CREATE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  ALTER TABLE "pages_blocks_solutions" DROP COLUMN "cta_text";
  ALTER TABLE "pages_blocks_solutions" DROP COLUMN "cta_link";
  ALTER TABLE "pages_blocks_solutions" DROP COLUMN "cta_show_c_t_a";
  ALTER TABLE "_pages_v_blocks_solutions" DROP COLUMN "cta_text";
  ALTER TABLE "_pages_v_blocks_solutions" DROP COLUMN "cta_link";
  ALTER TABLE "_pages_v_blocks_solutions" DROP COLUMN "cta_show_c_t_a";
  ALTER TABLE "team_members" DROP COLUMN "email";
  ALTER TABLE "team_members" DROP COLUMN "image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_solutions_solutions_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_solutions_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"card_color" varchar DEFAULT '#f5f5f5'
  );
  
  CREATE TABLE "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_team_approach_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Meet the Team',
  	"description" varchar DEFAULT 'Our experienced professionals bring decades of combined expertise in change management, process optimization, and strategic consulting.',
  	"approach_title" varchar DEFAULT 'Our Approach',
  	"approach_description" varchar DEFAULT 'We combine deep industry expertise with proven methodologies to deliver transformational results. Our team works collaboratively with your organization to ensure sustainable change and measurable improvement.',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_solutions_solutions_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_solutions_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"card_color" varchar DEFAULT '#f5f5f5',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_approach_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Meet the Team',
  	"description" varchar DEFAULT 'Our experienced professionals bring decades of combined expertise in change management, process optimization, and strategic consulting.',
  	"approach_title" varchar DEFAULT 'Our Approach',
  	"approach_description" varchar DEFAULT 'We combine deep industry expertise with proven methodologies to deliver transformational results. Our team works collaboratively with your organization to ensure sustainable change and measurable improvement.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "products_key_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_key_features" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "case_studies_metrics" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_case_studies_fk";
  
  DROP INDEX "payload_locked_documents_rels_products_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_case_studies_id_idx";
  ALTER TABLE "pages_blocks_solutions" ALTER COLUMN "heading" SET DEFAULT 'Explore Our Solutions';
  ALTER TABLE "pages_blocks_solutions" ALTER COLUMN "subheading" SET DEFAULT 'Holistic improvement of people, processes, and product alignment — with emphasis on workflow development and business process automation.';
  ALTER TABLE "_pages_v_blocks_solutions" ALTER COLUMN "heading" SET DEFAULT 'Explore Our Solutions';
  ALTER TABLE "_pages_v_blocks_solutions" ALTER COLUMN "subheading" SET DEFAULT 'Holistic improvement of people, processes, and product alignment — with emphasis on workflow development and business process automation.';
  ALTER TABLE "pages_blocks_solutions" ADD COLUMN "cta_text" varchar DEFAULT 'View All Solutions';
  ALTER TABLE "pages_blocks_solutions" ADD COLUMN "cta_link" varchar DEFAULT '/solutions';
  ALTER TABLE "pages_blocks_solutions" ADD COLUMN "cta_show_c_t_a" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_solutions" ADD COLUMN "cta_text" varchar DEFAULT 'View All Solutions';
  ALTER TABLE "_pages_v_blocks_solutions" ADD COLUMN "cta_link" varchar DEFAULT '/solutions';
  ALTER TABLE "_pages_v_blocks_solutions" ADD COLUMN "cta_show_c_t_a" boolean DEFAULT true;
  ALTER TABLE "team_members" ADD COLUMN "email" varchar;
  ALTER TABLE "team_members" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_solutions_solutions_features" ADD CONSTRAINT "pages_blocks_solutions_solutions_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_solutions_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_solutions_solutions" ADD CONSTRAINT "pages_blocks_solutions_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_approach_stats" ADD CONSTRAINT "pages_blocks_team_approach_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_solutions_solutions_features" ADD CONSTRAINT "_pages_v_blocks_solutions_solutions_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_solutions_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_solutions_solutions" ADD CONSTRAINT "_pages_v_blocks_solutions_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_approach_stats" ADD CONSTRAINT "_pages_v_blocks_team_approach_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_solutions_solutions_features_order_idx" ON "pages_blocks_solutions_solutions_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_solutions_solutions_features_parent_id_idx" ON "pages_blocks_solutions_solutions_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_solutions_solutions_order_idx" ON "pages_blocks_solutions_solutions" USING btree ("_order");
  CREATE INDEX "pages_blocks_solutions_solutions_parent_id_idx" ON "pages_blocks_solutions_solutions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_image_idx" ON "pages_blocks_team_members" USING btree ("image_id");
  CREATE INDEX "pages_blocks_team_approach_stats_order_idx" ON "pages_blocks_team_approach_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_approach_stats_parent_id_idx" ON "pages_blocks_team_approach_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_solutions_solutions_features_order_idx" ON "_pages_v_blocks_solutions_solutions_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_solutions_solutions_features_parent_id_idx" ON "_pages_v_blocks_solutions_solutions_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_solutions_solutions_order_idx" ON "_pages_v_blocks_solutions_solutions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_solutions_solutions_parent_id_idx" ON "_pages_v_blocks_solutions_solutions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_image_idx" ON "_pages_v_blocks_team_members" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_team_approach_stats_order_idx" ON "_pages_v_blocks_team_approach_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_approach_stats_parent_id_idx" ON "_pages_v_blocks_team_approach_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "team_members_image_idx" ON "team_members" USING btree ("image_id");
  ALTER TABLE "team_members" DROP COLUMN "priority";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "case_studies_id";`)
}
