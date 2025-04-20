"use client";

import { useActionState, useTransition } from "react";
import { AddUserFormState, CreateUser } from "../lib/actions";

const CreateAccount = () => {
  const initialState: AddUserFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(CreateUser, initialState);
  const [isPending, setTransition] = useTransition();

  return (
    <div className="lg:px-16 md:px-8 px-4 py-28">
      <div
        className="mx-auto bg-white xl:w-[50%] md:w-[70%] w-full flex flex-col items-center gap-6 py-6
  rounded-lg shadow-sm"
      >
        <>
          <span className="md:text-2xl text-xl font-medium">
            Create an account
          </span>
          <form
            action={(formData) => setTransition(() => formAction(formData))}
            className="w-full flex flex-col gap-8 md:p-14 sm:p-12 p-10"
          >
            <div className="inline-grid">
              <label htmlFor="firstname">First name</label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                defaultValue={state.values?.firstname ?? ""}
                className="bg-gray-100 h-10 pl-2 mt-2 shadow-sm"
                aria-describedby="firstname_error"
              />
            </div>
            <div id="firstname_error" aria-live="polite" aria-atomic="true">
              {state.errors?.firstname &&
                state.errors.firstname.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            <div className="inline-grid">
              <label htmlFor="lastname">Last name</label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                defaultValue={state.values?.lastname ?? ""}
                className="bg-gray-100 h-10 pl-2 mt-2 shadow-sm"
                aria-describedby="lastname_error"
              />
            </div>
            <div id="lastname_error" aria-live="polite" aria-atomic="true">
              {state.errors?.lastname &&
                state.errors.lastname.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            <div className="inline-grid">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                defaultValue={state.values?.username ?? ""}
                className="bg-gray-100 h-10 pl-2 mt-2 shadow-sm"
                aria-describedby="username_error"
              />
            </div>
            <div id="username_error" aria-live="polite" aria-atomic="true">
              {state.errors?.username &&
                state.errors.username.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            <div className="inline-grid">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                name="email"
                defaultValue={state.values?.email ?? ""}
                className="bg-gray-100 h-10 pl-2 mt-2 shadow-sm"
                aria-describedby="email_error"
              />
            </div>
            <div id="email_error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            <div className="inline-grid">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                className="bg-gray-100 h-10 pl-2 mt-2 shadow-sm"
                aria-describedby="password_error"
              />
            </div>
            <div id="password_error" aria-live="polite" aria-atomic="true">
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            <div className="inline-grid">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                id="confirm_password"
                type="password"
                name="confirm_password"
                className="bg-gray-100 h-10 pl-2 mt-2 shadow-sm"
                aria-describedby="confirm_password_error"
              />
            </div>
            <div
              id="confirm_password_error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.confirm_password &&
                state.errors.confirm_password.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            <fieldset className="inline-grid" aria-describedby="role_error">
              <legend className="font-medium">Role:</legend>
              <div className="flex items-center gap-2 py-3">
                <input
                  id="user"
                  type="radio" 
                  name="role"
                  value="user" 
                  defaultChecked={state.values?.role === "user"}
                  className="cursor-pointer"
                />
                <label htmlFor="user">Shopper</label>
              </div>
              <div className="flex items-center gap-2 py-3">
                <input
                  id="admin"
                  type="radio"
                  name="role"
                  value="admin"
                  defaultChecked={state.values?.role === "admin"}
                  className="cursor-pointer"
                />
                <label htmlFor="admin">Admin</label>
              </div>
            </fieldset>
            <div id="role_error" aria-live="polite" aria-atomic="true">
              {state.errors?.role &&
                state.errors.role.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            <button
              type="submit"
              className="py-2 px-6 text-white text-xl font-medium rounded-lg shadow-md
      cursor-pointer bg-orange-600 hover:bg-orange-500 active:bg-orange-600"
            >
              {isPending ? "Creating..." : "Create"}
            </button>
          </form>
        </>
      </div>
    </div>
  );
};

export default CreateAccount;
