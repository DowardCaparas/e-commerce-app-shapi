import bcrypt from "bcryptjs";
import { db } from "@vercel/postgres";
import { accounts } from "../lib/placeholder-data";

const client = await db.connect();

async function seedAccounts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS accounts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      address TEXT NULL,
      role TEXT NOT NULL
    );
  `;

  const insertedAccounts = await Promise.all(
    accounts.map(async (account) => {
      const hashedPassword = await bcrypt.hash(account.password, 10);
      return client.sql`
        INSERT INTO accounts (name, username, email, password, address, role)
        VALUES (
          ${account.name},
          ${account.username},
          ${account.email},
          ${hashedPassword},
          ${account.address},
          ${account.role}
        )
        ON CONFLICT (email) DO NOTHING;
      `;
    })
  );

  return insertedAccounts;
}


export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedAccounts();
    await client.sql`COMMIT`;
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error: String(error) }, { status: 500 });
  }
}

//==========================================================================
//=======================DROPPING TABLE=====================================
//==========================================================================

// export async function dropAccountsTable() {
//   const client = await db.connect();

//   try {
//     await client.sql`DROP TABLE IF EXISTS accounts`;
//     console.log("Accounts table dropped successfully.");
//     return Response.json({ message: "accounts table dropped successfully" });
//   } catch (error) {
//     console.error("Error dropping accounts table:", error);
//     return Response.json({ error: "Error dropping accounts table" }, { status: 500 });
//   } finally {
//     client.release(); // Release the client to the connection pool
//   }
// }

// export async function GET() {
//   try {
//     const result = await dropAccountsTable();
//     return result;
//   } catch (error) {
//     console.error("Error handling GET request:", error);
//     return Response.json({ error: "Error handling GET request" }, { status: 500 });
//   }
// }