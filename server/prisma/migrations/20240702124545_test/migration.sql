-- CreateTable
CREATE TABLE "Student" (
    "StudentID" SERIAL NOT NULL,
    "StudentName" TEXT NOT NULL,
    "Class" TEXT NOT NULL,
    "Age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("StudentID")
);
