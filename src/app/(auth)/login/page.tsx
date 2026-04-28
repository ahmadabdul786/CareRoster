"use client";

import { useState } from "react";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-[420px]">
            {/* Card */}
            <div className="bg-secondary-dark border border-divider-gray rounded-2xl px-8 py-10 flex flex-col gap-6">
                {/* Heading */}
                <div className="flex flex-col gap-1">
                    <Typography as="h1" size="h3" weight="bold">
                        <span className="text-primary-gold">Hello</span>{" "}
                        <span className="text-white">Welcome back!</span>
                    </Typography>
                    <Typography size="sm" weight="normal" className="text-muted-gray">
                        Credentials provided by admin on account creation
                    </Typography>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">
                            <Typography size="sm" weight="medium" className="text-light-gray">
                                Email
                            </Typography>
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                autoComplete="email"
                                className="w-full bg-tertiary-dark border border-divider-gray rounded-xl px-4 py-3 text-white placeholder:text-muted-gray text-md focus:outline-none focus:border-primary-gold transition-colors pr-11"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-gray pointer-events-none">
                                <MailIcon />
                            </span>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">
                            <Typography size="sm" weight="medium" className="text-light-gray">
                                Password
                            </Typography>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="w-full bg-tertiary-dark border border-divider-gray rounded-xl px-4 py-3 text-white placeholder:text-muted-gray text-md focus:outline-none focus:border-primary-gold transition-colors pr-11"
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-gray hover:text-light-gray transition-colors"
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <a href="#" className="text-muted-gray hover:text-primary-gold text-sm transition-colors">
                                Forgot Password?
                            </a>
                        </div>
                    </div>

                    {/* Submit */}
                    <Button type="submit" size="default">
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}

/* ── Inline SVG icons ── */

function MailIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" x2="22" y1="2" y2="22" />
        </svg>
    );
}
