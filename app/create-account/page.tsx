"use client";

import { useActionState, useState, useTransition } from "react";
import { addAccount, AccountFormState } from "../lib/actions";
import Link from "next/link";
import React from "react";
import NavBar from "../ui/navbar";
import Image from "next/image";

const CreateAccountPage = () => {
  const initialState: AccountFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(addAccount, initialState);
  const [isPending, startTransition] = useTransition();
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  return (
    <>
      <NavBar />
      <div className="lg:px-16 md:px-8 px-4 pb-28 pt-32">
        <div
          className="mx-auto bg-white w-full flex flex-col 
        items-center py-6 rounded-lg shadow-sm relative max-w-xl"
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
                className="-mt-5 h-2"
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
                  type={isPasswordHidden ? "text" : "password"}
                  name="password"
                  className="border border-orange-500 h-10 pl-2 mt-2"
                  aria-describedby="password_error"
                />
              </div>
              <div
                className="-mt-5 h-2"
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
                  type={isPasswordHidden ? "text" : "password"}
                  name="confirm_password"
                  className="border border-orange-500 h-10 pl-2 mt-2"
                  aria-describedby="confirm_password_error"
                />
              </div>
              <div
                className="-mt-5 h-2"
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

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="showpass"
                  id="showpass"
                  checked={isPasswordHidden}
                  onChange={() => setIsPasswordHidden((prev) => !prev)}
                />
                <label htmlFor="showpass">Show password</label>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="py-2 px-6 text-white text-xl font-medium rounded-lg shadow-md 
                            cursor-pointer bg-green-400 hover:bg-green-500 active:bg-green-400
                            disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Image
                      src="/loader.svg"
                      alt="check icon"
                      width={25}
                      height={25}
                      className="animate-spin"
                    />
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
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
