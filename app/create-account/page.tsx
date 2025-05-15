"use client";

import { useActionState, useTransition } from "react";
import { addAccount, AccountFormState } from "../lib/actions";
import Link from "next/link";
import React from "react";
import NavBar from "../ui/navbar";

const CreateAccountPage = () => {
  const initialState: AccountFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(addAccount, initialState);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <NavBar />
      <div className="lg:px-16 md:px-8 px-4 pb-28 pt-32">
        <div
          className="mx-auto bg-white xl:w-[50%] md:w-[70%] w-full flex flex-col items-center py-6
  rounded-lg shadow-sm"
        >
          <>
            <span className="md:text-2xl text-xl font-medium">
              Create your account
            </span>
            <form
              action={(formData) => startTransition(() => formAction(formData))}
              className="w-full flex flex-col gap-8 md:p-14 sm:p-12 p-10"
            >

              <div className="inline-grid">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  defaultValue={state.values?.username ?? ""}
                  className="border border-orange-500 h-10 pl-2 mt-2"
                  aria-describedby="username_error"
                />
              </div>
              <div
                className="-mt-5"
                id="username_error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.username &&
                  state.errors.username.map((error: string) => (
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
                  className="border border-orange-500 h-10 pl-2 mt-2"
                  aria-describedby="password_error"
                />
              </div>
              <div
                className="-mt-5"
                id="password_error"
                aria-live="polite"
                aria-atomic="true"
              >
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
                  className="border border-orange-500 h-10 pl-2 mt-2"
                  aria-describedby="confirm_password_error"
                />
              </div>
              <div
                className="-mt-5"
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

              <button
                type="submit"
                disabled={isPending}
                className="py-2 px-6 text-white text-xl font-medium rounded-lg shadow-md
              cursor-pointer bg-orange-600 hover:bg-orange-500 active:bg-orange-600 
              disabled:cursor-not-allowed"
              >
                {isPending ? "Creating..." : "Create"}
              </button>
            </form>
          </>
          <div className="flex items-center gap-2">
            <span>Have an account?</span>
            <Link
              href="/login"
              className="font-medium text-blue-700 hover:underline active:scale-95"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateAccountPage;
