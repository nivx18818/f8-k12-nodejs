const fs = require("fs").promises;

const DB_FILE = "./db.json";

(async () => {
  try {
    await fs.access(DB_FILE);
  } catch (error) {
    if (error.code === "ENOENT") {
      try {
        const initialDb = {};
        await fs.writeFile(DB_FILE, JSON.stringify(initialDb, null, 2));
        console.log(`Initialized ${DB_FILE}`);
      } catch (writeError) {
        console.error(`Error creating ${DB_FILE}:`, writeError);
      }
    } else {
      console.error(`Error checking ${DB_FILE}:`, error);
    }
  }
})();

const readDb = (resource, defaultValue = null) => {
  return async () => {
    try {
      const jsonDb = await fs.readFile(DB_FILE, "utf-8");
      return JSON.parse(jsonDb)[resource] ?? defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  };
};

const writeDb = (resource) => {
  return async (data) => {
    try {
      const jsonDb = await fs.readFile(DB_FILE, "utf-8");
      const db = JSON.parse(jsonDb);
      db[resource] = data;
      await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
    } catch (error) {
      console.error(error);
    }
  };
};

module.exports = {
  readDb,
  writeDb,
};
