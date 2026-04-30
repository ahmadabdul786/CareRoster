"use client";

import { TextInputField } from "@/components/shared/text-input-field";
import { PasswordInputField } from "@/components/shared/password-input-field";

export default function LoginPage() {
    return (
        <div className="auth-container">
            {/* Form Container */}
            <div className="auth-form-container">
                {/* Heading */}
                <h1 className="auth-heading">
                    Sign in to your account
                </h1>

                {/* Form */}
                <form className="flex flex-col gap-3 sm:gap-4 lg:gap-6" onSubmit={(e) => e.preventDefault()}>
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
                            <a href="#" className="auth-link">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="auth-button mt-1 sm:mt-2">
                        Sign in now
                    </button>

                    {/* Register Link */}
                    <div className="w-full py-2 sm:py-3 lg:py-4 text-center">
                        <p className="auth-register-text">
                            Don&apos;t have an account? <a href="#" className="underline hover:no-underline transition-all">Register today!</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}


