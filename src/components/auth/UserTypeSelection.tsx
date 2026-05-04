"use client";

import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { useState } from "react";

type UserType = "doctor" | "hospital" | null;

interface UserTypeSelectionProps {
  onSelect: (type: UserType) => void;
}

export const UserTypeSelection = ({ onSelect }: UserTypeSelectionProps) => {
  const [selectedType, setSelectedType] = useState<UserType>(null);

  const handleSelection = (type: UserType) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto flex flex-col gap-6">
      {/* Doctor Option */}
      <button
        onClick={() => handleSelection("doctor")}
        className={`w-full p-3 rounded-2xl border transition-all duration-200 flex items-center gap-4 ${
          selectedType === "doctor"
            ? "bg-light-blue/10 border-light-blue"
            : "bg-white border-light-gray hover:border-light-blue/50"
        }`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          selectedType === "doctor" ? "bg-light-blue" : "bg-light-gray"
        }`}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C14.74 3 13.5 3.5 12 5C10.5 3.5 9.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.8 3.5 12.55 5 14L12 21L19 14Z"
              fill={selectedType === "doctor" ? "white" : "#9E9E9E"}
            />
            <path
              d="M12.88 5.05C13.4 4.55 14.02 4.24 14.75 4.07C15.13 4 15.53 3.95 15.95 3.95C16.7 3.95 17.42 4.16 18.04 4.54C17.38 5.5 16.5 6.35 15.47 7.04C14.74 7.53 13.94 7.92 13.09 8.19C12.95 7.59 12.88 6.97 12.88 6.34C12.88 5.9 12.88 5.47 12.88 5.05Z"
              fill={selectedType === "doctor" ? "white" : "#9E9E9E"}
            />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <Typography as="h3" size="h3" weight="semibold" className="text-primary-dark">
            Doctor
          </Typography>
          <Typography as="p" size="md" className="text-muted-gray mt-1">
            Find and apply for locum shifts
          </Typography>
        </div>
      </button>

      {/* Hospital/Clinic Option */}
      <button
        onClick={() => handleSelection("hospital")}
        className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
          selectedType === "hospital"
            ? "bg-light-blue/10 border-light-blue"
            : "bg-white border-light-gray hover:border-light-blue/50"
        }`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          selectedType === "hospital" ? "bg-light-blue" : "bg-light-gray"
        }`}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 21V9L12 3L21 9V21H14V14H10V21H3Z"
              fill={selectedType === "hospital" ? "white" : "#9E9E9E"}
            />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <Typography as="h3" size="h3" weight="semibold" className="text-primary-dark">
            Hospital/Clinic
          </Typography>
          <Typography as="p" size="md" className="text-muted-gray mt-1">
            Post shifts and hire doctors
          </Typography>
        </div>
      </button>

      {/* Continue Button */}
      <Button
        variant="primary"
        size="lg"
        disabled={!selectedType}
        onClick={handleContinue}
        className="mt-4"
      >
        Get Started as a {selectedType === "doctor" ? "Doctor" : selectedType === "hospital" ? "Hospital/Clinic" : "User"}
      </Button>

      {/* Sign In Link */}
      <div className="text-center">
        <Typography as="p" size="lg" className="text-muted-gray">
          Already have an account?{" "}
          <a href="/login" className="text-light-blue hover:underline font-semibold">
            Sign In
          </a>
        </Typography>
      </div>
    </div>
  );
};
