"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SignOut = () => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <div className="relative w-full mb-28">
      {/* Sign out button in bottom right */}
      <div className="absolute">
        <button
          onClick={() => setShowConfirm(true)}
          className="p-3 bg-red-500 text-white rounded shadow-md
          hover:bg-red-600 active:scale-95 cursor-pointer"
          aria-label="Signing out the account"
        >
          Sign out
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-80">
            <p className="mb-4 text-center text-lg font-semibold">
              Are you sure you want to sign out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSignOut}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600
                active:scale-95 cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400
                active:scale-95 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignOut;
