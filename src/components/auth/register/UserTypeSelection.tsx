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
    <div className="w-full max-w-[474px] mx-auto flex flex-col">
      {/* Heading */}
      <Typography as="h1" size="h1" className="text-primary-dark text-center mb-[26px]" weight="semibold">
        Create Your Account
      </Typography>

      {/* Selection Buttons Container with 26px gap */}
      <div className="flex flex-col gap-[26px] mb-6">
        {/* Doctor Option - 474x67 with 16px gap, 16px border-radius, 12px padding */}
        <button
          onClick={() => handleSelection("doctor")}
          className={`w-full h-[67px] p-3 rounded-2xl border transition-all duration-200 flex items-center gap-4 ${
            selectedType === "doctor"
              ? "bg-light-blue/30 border-none"
              : "bg-white border-soft-gray "
          }`}
        >
          <div className={`w-[42px] h-[42px] rounded-full flex items-center justify-center ${
            selectedType === "doctor" ? "bg-white" : "bg-soft-gray/30"
          }`}>
            <Stethoscope className={selectedType === "doctor" ? "text-light-blue" : "text-primary-gray"} />
          </div>
          <div className="flex-1 text-left">
            <Typography as="span" className={`text-[16px] font-medium leading-[23px] ${selectedType === "doctor" ? "text-light-blue" : "text-primary-dark"}`}>
              Doctor
            </Typography>
            <Typography as="p" className="text-[16px] font-normal leading-[20px] text-primary-dark mt-1">
              Find and apply for locum shifts
            </Typography>
          </div>
        </button>

        {/* Hospital/Clinic Option - 474x67 with 16px gap, 16px border-radius, 12px padding */}
        <button
          onClick={() => handleSelection("hospital")}
          className={`w-full h-[67px] p-3 rounded-2xl border transition-all duration-200 flex items-center gap-4 ${
            selectedType === "hospital"
              ? "bg-light-blue/30 border-none"
              : "bg-white border-soft-gray "
          }`}
        >
          <div className={`w-[42px] h-[42px] rounded-full flex items-center justify-center ${
            selectedType === "hospital" ? "bg-white" : "bg-soft-gray/30"
          }`}>
            <Hospital className={selectedType === "hospital" ? "text-light-blue" : "text-primary-gray"} />
          </div>
          <div className="flex-1 text-left">
            <Typography as="span" className={`text-[16px] font-medium leading-[23px] ${selectedType === "hospital" ? "text-light-blue" : "text-primary-dark"}`}>
              Hospital/Clinic
            </Typography>
            <Typography as="p" className="text-[16px] font-normal leading-[20px] text-primary-dark mt-1">
              Post shifts and hire doctors
            </Typography>
          </div>
        </button>
      </div>

      {/* Continue Button - 24px gap from selection buttons */}
      <Button
        variant="primary"
        size="lg"
        disabled={!selectedType}
        onClick={handleContinue}
        className="mb-[35px]"
        style={{ textTransform: "none" }}
      >
        Get Started as a {selectedType === "doctor" ? "Doctor" : selectedType === "hospital" ? "Hospital/Clinic" : "User"}
      </Button>

      {/* Sign In Link - 35px gap from button */}
      <div className="text-center">
        <Typography as="p" size="lg" className="text-light-blue">
          Already have an account?{" "}
          <a href="/login" className="text-light-blue underline ">
            Sign In
          </a>
        </Typography>
      </div>
    </div>
  );
};
