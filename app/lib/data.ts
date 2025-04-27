import { sql } from "@vercel/postgres";
import { CartItem, UserAccount } from "./definitions";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ITEMS_PER_PAGE = 9;

export const fetchAllProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error(`Failed to fetch products, ${res.status}`);
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product, ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const fetchProductByCategory = async (category: string) => {
  try {
    const res = await fetch(`${API_URL}/products/category/${category}`);
    if (!res.ok)
      throw new Error(`Failed to fetch product by category, ${res.status}`);
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching product by category:", error);
    throw error;
  }
};

export const fetchCategoryList = async () => {
  try {
    const res = await fetch(`${API_URL}/products/category-list`);
    if (!res.ok)
      throw new Error(`Failed to fetch category list, ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching category list:", error);
    throw error;
  }
};

export const fetchProductsBySearch = async (search: string) => {
  try {
    const res = await fetch(`${API_URL}/products/search?q=${search}`);
    if (!res.ok)
      throw new Error(`Failed to fetch category list, ${res.status}`);
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching product by search:", error);
    throw error;
  }
};

export const fetchAccounts = async (query: string, currentPage: number) => {

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<UserAccount>`
            SELECT * 
            FROM accounts
            WHERE 
                name ILIKE ${`%${query}%`} OR
                username ILIKE ${`%${query}%`} OR
                email ILIKE ${`%${query}%`} OR
                address ILIKE ${`%${query}%`}
            ORDER BY name
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
    return data.rows;
  } catch (error) {
    console.error("Dtabase error:", error);
    throw new Error("Failed to fetch accounts");
  }
};

export const fetchAccountById = async (id: string) => {
  try {
    const data = await sql<UserAccount>`
      SELECT *
      FROM accounts
      WHERE id = ${id}
    `;
    return data.rows;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch account");
  }
};

// accounts pages
export const fetchAccountsPages = async () => {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM accounts
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch account pages");
  }
};

// fetch all cart items
export const fetchCart = async (id: string) => {
  try {
    const data = await sql<CartItem>`
      SELECT *
      FROM cart
      WHERE userid = ${id}
      ORDER BY date DESC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch cart");
  }
};

// fetch cart quantity
export const fetchCartQuantity = async () => {
  try {
    const data = await sql<{ count: number }>`
      SELECT COUNT(*) AS count
      FROM cart
    `;
    return data.rows[0].count;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch cart");
  }
};
