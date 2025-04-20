import { z } from "zod";

const AddUserFormSchema = z
  .object({
    firstname: z.string().min(1, { message: "First name is required." }),
    lastname: z.string().min(1, { message: "Last name is required." }),
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
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
  });

export type AddUserFormState = {
  errors?: {
    firstname?: string[];
    lastname?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
    confirm_password?: string;
    role?: string[];
  };
  values?: {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    role?: string;
  }
  message?: string | null;
};

export const CreateUser = async (
  prevState: AddUserFormState,
  formData: FormData
) => {
  try {
    const form = {
      firstname: formData.get("firstname")?.toString().trim() || "",
      lastname: formData.get("lastname")?.toString().trim() || "",
      username: formData.get("username")?.toString().trim() || "",
      password: formData.get("password")?.toString() || "",
      confirm_password: formData.get("confirm_password")?.toString() || "",
      email: formData.get("email")?.toString().trim() || "",
      role: formData.get("role")?.toString() as "user" | "admin",
    };

    const validated = AddUserFormSchema.safeParse(form);

    if (!validated.success) {
      const formattedErrors = Object.fromEntries(
        Object.entries(validated.error.flatten().fieldErrors)
      );

      return {
        errors: formattedErrors,
        values: {
            firstname: formData.get("firstname")?.toString(),
            lastname: formData.get("lastname")?.toString(),
            username: formData.get("username")?.toString(),
            email: formData.get("email")?.toString(),
            role: formData.get("role")?.toString(),
        },
        message: "Validation failed.",
      };
    }

    const res = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.firstname,
        lastName: form.lastname,
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
      }),
    });

    if (!res.ok) throw new Error(`Failed to add user, ${res.status}`);

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error createing user:", error);
    throw error;
  }
};
