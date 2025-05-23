"use client";

import { useState, useEffect, useActionState, useTransition } from "react";
import { UserAccount } from "../lib/definitions";
import Image from "next/image";
import { AccountFormState, updateAccount } from "../lib/actions";
import React from "react";

const EditProfile = ({ id, name, username, email, address }: UserAccount) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
  });
  const initialState: AccountFormState = { message: null, errors: {} };
  const updateAccountById = updateAccount.bind(null, id);
  const [state, formAction] = useActionState(updateAccountById, initialState);
  const [isEditing, setIsEditing] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Sync props into state on mount or when props change
  useEffect(() => {
    setFormData({ name, username, email, address: address || "" });
  }, [name, username, email, address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Object to safely access original props
  const originalData = { name, username, email, address: address || "" };

  // for success message
  useEffect(() => {
    if (!isEditing && !isPending && !state.errors && state.message) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // Adjust the timeout as needed
      return () => clearTimeout(timer); // Cleanup the timeout
    } else {
      setShowSuccessMessage(false);
    }
  }, [isPending, state.errors, state.message]);

  const handleCloseSuccess = () => {
    setShowSuccessMessage(false);
  };

  return (
    <>
      {/* form */}
      <form
        action={(formData) =>
          startTransition(() => {
            formAction(formData);
            setIsEditing(false);
          })
        }
      >
        {["name", "email", "username", "address"].map((field) => (
          <div
            key={field}
            className="grid grid-cols-1 md:grid-cols-2 items-center py-6"
          >
            <label htmlFor={field} className="font-semibold capitalize mb-2">
              {field}
            </label>
            <div className="relative">
              <input
                id={field}
                type="text"
                value={
                  isEditing
                    ? formData[field as keyof typeof formData]
                    : originalData[field as keyof typeof originalData]
                }
                name={field}
                onChange={handleChange}
                disabled={!isEditing}
                className={`p-2 w-full font-medium
                  ${
                    !isEditing
                      ? "bg-gray-100 cursor-not-allowed"
                      : "opacity-70 ring-2 ring-orange-600 bg-white"
                      
                  }`}
              />
              {/* form field error */}
              <div
                className="pl-2 mt-1 absolute"
                aria-live="polite"
                aria-atomic="true"
              >
                {(
                  state.errors?.[field as keyof AccountFormState["errors"]] as
                    | string[]
                    | undefined
                )?.map((error) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Save changes button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-2
                    rounded-lg font-medium cursor-pointer transition-colors duration-75 ease-in"
        >
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </form>

      {/* show when successfully updated */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 flex flex-col items-center gap-4 rounded-xl shadow-2xl w-80">
            <Image
              src="/check.svg"
              alt="check icon"
              width={70}
              height={70}
              className="bg-green-300 rounded-full p-5"
            />
            <span className="mb-4 text-center text-black text-lg font-semibold">
              Account updated!
            </span>
            <button
              onClick={handleCloseSuccess}
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-2
                    rounded-lg font-medium cursor-pointer transition-colors duration-75 ease-in"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
