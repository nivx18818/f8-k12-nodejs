require("module-alias/register");
const db = require("@/configs/db");
const { faker } = require("@faker-js/faker");
const slugify = require("slugify");

// User seeding function
async function seedUsers(count = 50) {
  try {
    console.log("Starting users seeder...");

    const records = count;
    let values = [];
    let placeholders = [];

    // Track usernames, emails and phones to ensure uniqueness
    const usernames = new Set();
    const emails = new Set();
    const phones = new Set();

    for (let i = 0; i < records; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const name = `${firstName} ${lastName}`;

      // Generate unique username
      let username;
      do {
        username = faker.internet
          .username({ firstName, lastName })
          .toLowerCase();
        if (username.length > 45) username = username.substring(0, 45);
      } while (usernames.has(username));
      usernames.add(username);

      // Generate unique email
      let email;
      do {
        email = faker.internet.email({ firstName, lastName }).toLowerCase();
      } while (emails.has(email));
      emails.add(email);

      // Generate unique phone (70% chance to have a phone)
      let phone = null;
      if (Math.random() > 0.3) {
        do {
          phone = faker.phone.number("+84##########").substring(0, 15);
        } while (phones.has(phone));
        phones.add(phone);
      }

      const password =
        "$2a$10$9hEJgB6Wzlzq./j9bTrJvePJR6XoHjFd1Ozq.Fw9zkPoNHBt8Ksvu"; // Default: 'password'

      // Generate other optional fields
      const birthday =
        Math.random() > 0.3
          ? faker.date.birthdate({ min: 18, max: 65, mode: "age" })
          : null;
      const avatar = Math.random() > 0.4 ? faker.image.avatar() : null;
      const genders = ["male", "female", "other"];
      const gender =
        Math.random() > 0.2
          ? genders[Math.floor(Math.random() * genders.length)]
          : null;
      const address =
        Math.random() > 0.4 ? faker.location.streetAddress() : null;

      const createdAt = faker.date.between({
        from: "2022-01-01T00:00:00.000Z",
        to: "2024-05-13T00:00:00.000Z",
      });

      const updatedAt = createdAt;

      values.push(
        name,
        username,
        password,
        email,
        phone,
        birthday ? formatDate(birthday, true) : null,
        avatar,
        gender,
        address,
        formatDate(createdAt),
        formatDate(updatedAt)
      );

      placeholders.push("(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    }

    const query = `
      INSERT INTO users (
        name, username, password, email, phone,
        birthday, avatar, gender, address, created_at, updated_at
      )
      VALUES ${placeholders.join(", ")}
    `;

    const result = await db.query(query, values);
    console.log(`Successfully seeded ${result[0].affectedRows} users`);

    return true;
  } catch (error) {
    console.error("Error seeding users:", error);
    return false;
  }
}

// Post seeding function
async function seedPosts() {
  try {
    console.log("Starting posts seeder...");

    const [usersResult] = await db.query("SELECT id FROM users");
    if (!usersResult.length) {
      console.error("No users found in database. Please seed users first.");
      return;
    }
    const userIds = usersResult.map((user) => user.id);

    const records = 200;
    let values = [];
    let placeholders = [];

    for (let i = 0; i < records; i++) {
      const title = faker.lorem
        .sentence(Math.floor(Math.random() * 5) + 3)
        .replace(/\.$/, "");

      const baseSlug = slugify(title, {
        lower: true,
        strict: true,
      });
      let slug = `${baseSlug}-${faker.string.alphanumeric(6)}`;

      // Ensure slug doesn't exceed 45 chars
      if (slug.length > 45) {
        let truncatedBaseSlug = baseSlug.substring(0, 38);
        slug = `${truncatedBaseSlug}-${faker.string.alphanumeric(6)}`;
      }

      const randomUserIndex = Math.floor(Math.random() * userIds.length);
      const userId = userIds[randomUserIndex];

      const description =
        Math.random() > 0.2
          ? faker.lorem.paragraph(Math.floor(Math.random() * 3) + 1)
          : null;
      const content = faker.lorem.paragraphs(
        Math.floor(Math.random() * 8) + 3,
        "<br/>\n"
      );

      const publishedAt =
        Math.random() > 0.2
          ? faker.date.between({
              from: "2023-01-01T00:00:00.000Z",
              to: "2025-05-13T00:00:00.000Z",
            })
          : null;

      const createdAt = faker.date.between({
        from: "2022-01-01T00:00:00.000Z",
        to: "2025-05-13T00:00:00.000Z",
      });

      const updatedAt =
        Math.random() > 0.7
          ? faker.date.between({
              from: createdAt,
              to: "2025-05-13T00:00:00.000Z",
            })
          : createdAt;

      values.push(
        userId,
        title,
        slug,
        description,
        content,
        publishedAt ? formatDate(publishedAt) : null,
        formatDate(createdAt),
        formatDate(updatedAt)
      );

      placeholders.push("(?, ?, ?, ?, ?, ?, ?, ?)");
    }

    const query = `
      INSERT INTO posts (
        user_id, title, slug, description, content,
        published_at, created_at, updated_at
      )
      VALUES ${placeholders.join(", ")}
    `;

    const result = await db.query(query, values);
    console.log(`Successfully seeded ${result.affectedRows} posts`);
  } catch (error) {
    console.error("Error seeding posts:", error);
  }
}

// Helper function to format date for MySQL
function formatDate(date, dateOnly = false) {
  if (!date) return null;
  return dateOnly
    ? date.toISOString().slice(0, 10)
    : date.toISOString().slice(0, 19).replace("T", " ");
}

// Main function to run seeders
async function run() {
  const args = process.argv.slice(2);
  const seedType = args[0] || "all";

  try {
    if (seedType === "users" || seedType === "all") {
      await seedUsers();
    }

    if (seedType === "posts" || seedType === "all") {
      await seedPosts();
    }
  } catch (error) {
    console.error("Error in seeder:", error);
  } finally {
    process.exit(0);
  }
}

run();
