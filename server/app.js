const express = require("express");
const studentRoutes = require("./Routes/routes.js");
const dotenv = require("dotenv");
const cors = require("cors");
const prisma = require("./prisma/prismaClient.js");

dotenv.config({ path: ".env" });

const app = express();
const PORT = process.env.PORT || 4001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", studentRoutes);

try {
  prisma.$connect();
  console.log("Connection to the database established");

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (error) {
  prisma.$disconnect();
  console.error("Failed to connect to the database: ", error);
  process.exit(1);
}
