-- CreateEnum
CREATE TYPE "WorkshopStatus" AS ENUM ('proximo', 'agotado', 'finalizado');

-- CreateEnum
CREATE TYPE "ReservationType" AS ENUM ('internal', 'external');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('confirmed', 'cancelled');

-- CreateTable
CREATE TABLE "Workshop" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dateLabel" TEXT,
    "durationLabel" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,
    "locationAddress" TEXT,
    "capacity" INTEGER NOT NULL,
    "spotsLeft" INTEGER NOT NULL,
    "coverImage" TEXT NOT NULL,
    "gallery" TEXT[],
    "reservationType" "ReservationType" NOT NULL DEFAULT 'internal',
    "whatsappMessage" TEXT,
    "instagramHandle" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "WorkshopStatus" NOT NULL DEFAULT 'proximo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'confirmed',
    "workshopId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workshop_slug_key" ON "Workshop"("slug");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
