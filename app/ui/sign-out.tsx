"use client";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const SignOut = () => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignOut = () => {
    setShowConfirm(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    router.push("/login");
    // Refresh the page to reload components using localStorage
    setTimeout(() => {
      window.location.reload();
    }, 20); // slight delay to allow navigation
    
  };

  return (
    <Fragment>
      {/* Sign out button in bottom right */}
      <button
          onClick={() => setShowConfirm(true)}
          className="bg-white text-orange-600 px-4 py-1 rounded-md font-medium 
                hover:bg-orange-100 active:scale-95 cursor-pointer"
          aria-label="Signing out the account"
        >
          Sign out
        </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-80">
            <p className="mb-4 text-center text-black text-lg font-semibold">
              Are you sure you want to sign out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSignOut}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600
                active:scale-95 cursor-pointer"
              >
                <span className="font-medium">Yes</span>
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500
                active:scale-95 cursor-pointer"
              >
                <span className="font-medium">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SignOut;
