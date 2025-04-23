import { db } from "@vercel/postgres";

const client = await db.connect();

async function listAccounts() {
    const data = await client.sql`
        SELECT *
        FROM accounts;
    `;
    return data.rows;
}

export async function GET(){
    try {
        return Response.json(await listAccounts());
    } catch (error) {
        console.error("Query error:", error); // ✅ Add this
        return Response.json({error}, {status: 500});
    }
}