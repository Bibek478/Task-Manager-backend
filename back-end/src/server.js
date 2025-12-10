require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/database");
const seedAdmin = require("./seed/adminSeed");
const seedUsers = require("./seed/userSeed"); 
const seedTasks = require("./seed/taskSeed");

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();

    await seedAdmin();
    await seedUsers();
    await seedTasks();

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.log(`failed to start server`, error.message);
    process.exit(1);
  }
};
startServer();
