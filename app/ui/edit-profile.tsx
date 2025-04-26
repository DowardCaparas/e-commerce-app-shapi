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
  const [state, formAction] = useActionState(
    updateAccountById,
    initialState
  );
  const [isEditing, setIsEditing] = useState(false);
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
  }, [isEditing, isPending, state.errors, state.message]);

  const handleCloseSuccess = () => {
    setShowSuccessMessage(false);
  };

  return (
    <>
      {/* edit button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsEditing(true)}
          className={`bg-white p-2 rounded-lg flex items-center gap-4
                  active:scale-100 ${
                    isEditing
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:scale-105 cursor-pointer"
                  }`}
          disabled={isEditing}
        >
          Edit <Image src="/pen.svg" alt="pen icon" width={25} height={25} />
        </button>
      </div>

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
                className={`border bg-white p-2 w-full ${
                  !isEditing ? "cursor-not-allowed opacity-70" : ""
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

        {/* Show only if the user choose to edit their information */}
        {isEditing && (
          <div className="flex justify-center gap-4 w-full mt-10">
            <button
              type="submit"
              onClick={() => {
                setIsEditing(false);
                setShowSuccessMessage(false);
              }}
              className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-4 py-2
                    rounded-lg font-medium cursor-pointer transition-colors duration-75 ease-in"
            >
              Cancel
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-2
                    rounded-lg font-medium cursor-pointer transition-colors duration-75 ease-in"
            >
              {isPending ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}
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
