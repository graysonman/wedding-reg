-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lego" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "piece" INTEGER NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Lego_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RSVP" (
    "name" TEXT NOT NULL,
    "pplCount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Registry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "famBought" TEXT NOT NULL,
    "bought" BOOLEAN NOT NULL,

    CONSTRAINT "Registry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lego_id_key" ON "Lego"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RSVP_name_key" ON "RSVP"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Registry_img_key" ON "Registry"("img");

-- CreateIndex
CREATE UNIQUE INDEX "Registry_link_key" ON "Registry"("link");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
