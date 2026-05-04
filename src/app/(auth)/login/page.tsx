"use client";

import { TextInputField } from "@/components/shared/text-input-field";
import { PasswordInputField } from "@/components/shared/password-input-field";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import AuthLayout from "../layout";

export default function LoginPage() {
    return (
        <div className="w-full flex flex-col justify-center  items-center gap-4">
            {/* Form Container */}
                {/* Heading */}
                <Typography as="h1" size="h1" className="text-primary-dark" weight={"semibold"}>
                    Sign in to your account
                </Typography>

                {/* Form */}
                <form className="flex flex-col gap-3 sm:gap-4 lg:gap-6 text-primary-dark w-full p-5" onSubmit={(e) => e.preventDefault()}>
                    {/* Email Field */}
                    <TextInputField
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        autoComplete="email"
                    />

                    {/* Password Field */}
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                        <PasswordInputField
                            id="password"
                            label="Password"
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                        
                        {/* Forgot Password */}
                        <div className="w-full flex items-center mt-1 sm:mt-1.5">
                            <Typography as="a" size="lg" className="text-light-blue hover:underline transition-all cursor-pointer">
                                Forgot password?
                            </Typography>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button variant="primary" size="default" type="submit" className="bg-dark-blue">
                        Sign in now 
                    </Button>

                    {/* Register Link */}
                    <div className="w-full py-2 sm:py-3 lg:py-4 text-center text-light-blue">
                        <Typography as="p" size="lg" className="auth-register-text">
                            Don&apos;t have an account? <a href="#" className="hover:underline transition-all">Register today!</a>
                        </Typography>
                    </div>
                </form>
            
        </div>
    );
}


