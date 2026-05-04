"use client";

import { Typography } from "@/components/shared/typography";
import { UserTypeSelection } from "@/components/auth/UserTypeSelection";
import { useState } from "react";

type UserType = "doctor" | "hospital" | null;

export default function RegisterPage() {
    const [selectedUserType, setSelectedUserType] = useState<UserType>(null);

    const handleUserTypeSelect = (type: UserType) => {
        setSelectedUserType(type);
    };

    return (
      <div className="w-full flex flex-col justify-center items-center gap-[26px]">
        {/* Heading */}
        <Typography as="h1" size="h1" className="text-primary-dark" weight={"semibold"}>
           Create Your Account
        </Typography>

        {/* Show user type selection or registration form based on selection */}
        {!selectedUserType ? (
          <UserTypeSelection onSelect={handleUserTypeSelect} />
        ) : (
          <div className="w-full max-w-[600px] mx-auto">
            <Typography as="p" size="lg" className="text-muted-gray text-center">
              Registration form for {selectedUserType === "doctor" ? "Doctor" : "Hospital/Clinic"} will go here
            </Typography>
            <button 
              onClick={() => setSelectedUserType(null)}
              className="mt-4 text-light-blue hover:underline"
            >
              ← Back to selection
            </button>
          </div>
        )}
      </div>
    )
}