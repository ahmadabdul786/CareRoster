"use client";

import { UserTypeSelection } from "@/components/auth/register/UserTypeSelection";
import { DoctorRegistrationForm } from "@/components/auth/register/DoctorRegistrationForm";
import { HospitalRegistrationForm } from "@/components/auth/register/HospitalRegistrationForm";
import { useState } from "react";

type UserType = "doctor" | "hospital" | null;

export default function RegisterPage() {
    const [selectedUserType, setSelectedUserType] = useState<UserType>(null);

    const handleUserTypeSelect = (type: UserType) => {
        setSelectedUserType(type);
    };

    return (
      <div className="w-full flex flex-col justify-center items-center">
        {/* Show user type selection or registration form based on selection */}
        {!selectedUserType ? (
          <UserTypeSelection onSelect={handleUserTypeSelect} />
        ) : selectedUserType === "doctor" ? (
          <DoctorRegistrationForm onBack={() => setSelectedUserType(null)} />
        ) : (
          <HospitalRegistrationForm onBack={() => setSelectedUserType(null)} />
        )}
      </div>
    )
}
