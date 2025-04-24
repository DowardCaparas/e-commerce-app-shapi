"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const AddAccountFormSchema = z.object({
  name: z.string().min(1, { message: " name is required." }),
  username: z.string().min(1, { message: "Email is required." }),
  email: z
    .string({ message: "Please enter a valid email address" })
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must end with @gmail.com",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  confirm_password: z.string(),
  role: z.enum(["user", "admin"], { message: "Role is required." }),
}).refine((data) => data.password === data.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords do not match.",
});

export type AddAccountFormState = {
  errors?: {
    name?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
    confirm_password?: string[];
    role?: string[];
  };
  values?: {
    name?: string;
    username?: string;
    email?: string;
    role?: string;
  };
  message?: string | null;
};

export async function addAccount(
  prevState: AddAccountFormState,
  formData: FormData
): Promise<AddAccountFormState> {
  // add this user server directive for our useActionState

  const validatedFields = AddAccountFormSchema.safeParse({
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

  const { name, username, email, password, role } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO accounts (name, username, email, password, role)
      VALUES (${name}, ${username}, ${email}, ${hashedPassword}, ${role})
      ON CONFLICT (id) DO NOTHING
    `;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error: Failed to add account");
  }

  revalidatePath("/dashboard/users");
  redirect("/login");
}
