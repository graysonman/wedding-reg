-- CreateTable
CREATE TABLE "Lego" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "piece" INTEGER NOT NULL,
    "img" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Lego_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RSVP" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pplCount" INTEGER NOT NULL,

    CONSTRAINT "RSVP_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Lego_id_key" ON "Lego"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Registry_img_key" ON "Registry"("img");

-- CreateIndex
CREATE UNIQUE INDEX "Registry_link_key" ON "Registry"("link");
