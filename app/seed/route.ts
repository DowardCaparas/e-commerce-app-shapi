// import bcrypt from "bcryptjs";
import { db } from "@vercel/postgres";
import { cart } from "../lib/placeholder-data";

const client = await db.connect();

// async function seedAccounts() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS accounts (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       username TEXT NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL,
//       address TEXT NULL,
//       role TEXT NOT NULL
//     );
//   `;

//   const insertedAccounts = await Promise.all(
//     accounts.map(async (account) => {
//       const hashedPassword = await bcrypt.hash(account.password, 10);
//       return client.sql`
//         INSERT INTO accounts (name, username, email, password, address, role)
//         VALUES (
//           ${account.name},
//           ${account.username},
//           ${account.email},
//           ${hashedPassword},
//           ${account.address},
//           ${account.role}
//         )
//         ON CONFLICT (email) DO NOTHING;
//       `;
//     })
//   );

//   return insertedAccounts;
// }

// export async function GET() {
//   try {
//     await client.sql`BEGIN`;
//     await seedAccounts();
//     await client.sql`COMMIT`;
//     return Response.json({ message: "Database seeded successfully" });
//   } catch (error) {
//     console.error("Seed error:", error);
//     await client.sql`ROLLBACK`;
//     return Response.json({ error: String(error) }, { status: 500 });
//   }
// }

// ================================================================================
// -===============================================================================

async function seedCart() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS cart (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      userId TEXT NOT NULL,
      productId INTEGER NOT NULL,
      name VARCHAR(255) NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      discount NUMERIC(10,2) NOT NULL,
      thumbnail TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      date DATE NOT NULL
    );
  `;

  const insertedCart = await Promise.all(
    cart.map((crt) => {
      return client.sql`
        INSERT INTO cart (userId, productId, name, price, discount, thumbnail, quantity, date)
        VALUES (${crt.userId}, ${crt.productId}, ${crt.name}, ${crt.price}, 
        ${crt.discountPercentage}, ${crt.thumbnail}, ${crt.quantity}, ${crt.date})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedCart;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedCart();
    await client.sql`COMMIT`;
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    await client.sql`ROLLBACK`;
    return Response.json({ error: String(error) }, { status: 500 });
  }
}

//==========================================================================
//=======================DROPPING TABLE=====================================
//==========================================================================

// export async function dropCartTable() {
//   const client = await db.connect();

//   try {
//     await client.sql`DROP TABLE IF EXISTS cart`;
//     console.log("cart table dropped successfully.");
//     return Response.json({ message: "cart table dropped successfully" });
//   } catch (error) {
//     console.error("Error dropping cart table:", error);
//     return Response.json({ error: "Error dropping cart table" }, { status: 500 });
//   } finally {
//     client.release(); // Release the client to the connection pool
//   }
// }

// export async function GET() {
//   try {
//     const result = await dropCartTable();
//     return result;
//   } catch (error) {
//     console.error("Error handling GET request:", error);
//     return Response.json({ error: "Error handling GET request" }, { status: 500 });
//   }
// }
