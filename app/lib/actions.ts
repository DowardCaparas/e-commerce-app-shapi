"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const AccountFormSchema = z
  .object({
    username: z.string().min(3, { message: "Email is required." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirm_password: z.string(),
    role: z.enum(["user", "admin"], { message: "Role is required." }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
  });

const UpdateAccountFormSchema = z.object({
  name: z.string().min(3, { message: "Name is required." }),
  username: z.string().min(3, { message: "Email is required." }),
  email: z
    .string({ message: "Please enter a valid email address" })
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must end with @gmail.com",
    }),
  address: z.string().min(5, { message: "Address is required." }),
});

export type AccountFormState = {
  errors?: {
    name?: string[];
    username?: string[];
    email?: string[];
    address?: string[];
    password?: string[];
    confirm_password?: string[];
    role?: string[];
  };
  values?: {
    name?: string;
    username?: string;
    email?: string;
    address?: string;
    role?: string;
  };
  message?: string | null;
};

export async function addAccount(
  prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const validatedFields = AccountFormSchema.safeParse({
    name: formData.get("name")?.toString().trim(),
    username: formData.get("username")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    password: formData.get("password")?.toString().trim(),
    confirm_password: formData.get("confirm_password")?.toString().trim(),
    role: formData.get("role")?.toString() as "user" | "admin",
  });

  if (!validatedFields.success) {
    const formattedErrors = Object.fromEntries(
      Object.entries(validatedFields.error.flatten().fieldErrors)
    );

    return {
      errors: formattedErrors,
      values: {
        name: formData.get("name")?.toString(),
        username: formData.get("username")?.toString(),
        email: formData.get("email")?.toString(),
        role: formData.get("role")?.toString(),
      },
      message: "Validation failed.",
    };
  }

  const { username, password, role } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO accounts (username, password, role)
      VALUES (${username}, ${hashedPassword}, ${role})
      ON CONFLICT (id) DO NOTHING
    `;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error: Failed to add account");
  }

  redirect("/login");
}

export const updateAccount = async (
  id: string,
  prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> => {
  const validatedFields = UpdateAccountFormSchema.safeParse({
    name: formData.get("name")?.toString().trim(),
    username: formData.get("username")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    address: formData.get("address")?.toString().trim(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to Update book.",
    };
  }

  const { name, username, email, address } = validatedFields.data;
  try {
    await sql`
      UPDATE accounts
      SET name = ${name}, username = ${username}, email = ${email}, address = ${address}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log("Database Error:", error);
    return {
      message: "Database Error: Failed to Update Book.",
    };
  }

  revalidatePath(`/dashboard/account/${id}`);
  return {
    message: "Account updated successfully.",
  };
};
