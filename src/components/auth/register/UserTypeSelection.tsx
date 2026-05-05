"use client";

import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { useState } from "react";
import { Hospital, Stethoscope } from "lucide-react";

type UserType = "doctor" | "hospital" | null;

interface UserTypeSelectionProps {
  onSelect: (type: UserType) => void;
}

export const UserTypeSelection = ({ onSelect }: UserTypeSelectionProps) => {
  const [selectedType, setSelectedType] = useState<UserType>('doctor');

  const handleSelection = (type: UserType) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto flex flex-col sm:p-12 gap-6">
      {/* Heading */}
      <Typography as="h1" size="h1" className="text-primary-dark text-center" weight="semibold">
        Create Your Account
      </Typography>

      {/* Doctor Option */}
      <button
        onClick={() => handleSelection("doctor")}
        className={`w-full p-3 rounded-2xl border transition-all duration-200 flex items-center gap-4 ${
          selectedType === "doctor"
            ? "bg-light-blue/30 border-none"
            : "bg-white border-light-gray "
        }`}
      >
        <div className={`w-[42px] h-[42px] rounded-full flex items-center justify-center ${
          selectedType === "doctor" ? "bg-white" : "bg-soft-gray"
        }`}>
          <Stethoscope className={selectedType === "doctor" ? "text-light-blue" : "text-primary-gray"} />
        </div>
        <div className="flex-1 text-left">
          <Typography as="h3" size="h3" weight="semibold" className={selectedType === "doctor" ? "text-light-blue" : "text-primary-dark"}>
            Doctor
          </Typography>
          <Typography as="p" size="md" className="text-primary-dark mt-1">
            Find and apply for locum shifts
          </Typography>
        </div>
      </button>

      {/* Hospital/Clinic Option */}
      <button
        onClick={() => handleSelection("hospital")}
        className={`w-full p-3 rounded-2xl border  transition-all duration-200 flex items-center gap-4 ${
          selectedType === "hospital"
            ? "bg-light-blue/30 border-none"
            : "bg-white border-light-gray "
        }`}
      >
        <div className={`w-[42px] h-[42px] rounded-full flex items-center justify-center ${
          selectedType === "hospital" ? "bg-white" : "bg-soft-gray"
        }`}>
          <Hospital className={selectedType === "hospital" ? "text-light-blue" : "text-primary-gray"} />
        </div>
        <div className="flex-1 text-left">
          <Typography as="h5" size="h5" weight="semibold" className={selectedType === "hospital" ? "text-light-blue" : "text-primary-dark"}>
            Hospital/Clinic
          </Typography>
          <Typography  size="h5" weight="normal" className="text-primary-dark mt-1">
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
