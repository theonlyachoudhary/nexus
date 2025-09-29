import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_testimonials" RENAME COLUMN "title" TO "heading";
  ALTER TABLE "pages_blocks_testimonials" RENAME COLUMN "description" TO "subheading";
  ALTER TABLE "_pages_v_blocks_testimonials" RENAME COLUMN "title" TO "heading";
  ALTER TABLE "_pages_v_blocks_testimonials" RENAME COLUMN "description" TO "subheading";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_testimonials" RENAME COLUMN "heading" TO "title";
  ALTER TABLE "pages_blocks_testimonials" RENAME COLUMN "subheading" TO "description";
  ALTER TABLE "_pages_v_blocks_testimonials" RENAME COLUMN "heading" TO "title";
  ALTER TABLE "_pages_v_blocks_testimonials" RENAME COLUMN "subheading" TO "description";`)
}
