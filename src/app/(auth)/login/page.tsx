"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { TextInputField } from "@/components/shared/text-input-field";
import { PasswordInputField } from "@/components/shared/password-input-field";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        console.log("Login data:", data);
    };

    return (
        <div className="w-full flex flex-col justify-center  items-center gap-4">
            {/* Form Container */}
                {/* Heading */}
                <Typography as="h1" size="h1" className="text-primary-dark  " weight={"semibold"}>
                    Sign in to your account
                </Typography>

                {/* Form */}
                <form className="flex flex-col gap-4 sm:gap-4 lg:gap-6 text-primary-dark w-full " onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <div>
                        <TextInputField
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <Typography as="p" size="sm" className="text-alert-red mt-1">
                                {errors.email.message}
                            </Typography>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                        <div>
                            <PasswordInputField
                                id="password"
                                label="Password"
                                placeholder="Password"
                                autoComplete="current-password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <Typography as="p" size="sm" className="text-alert-red mt-1">
                                    {errors.password.message}
                                </Typography>
                            )}
                        </div>
                        
                        {/* Forgot Password */}
                        <div className="w-full flex items-center mt-1 sm:mt-1.5">
                            <Typography as="p" size="lg" className="text-light-blue hover:underline transition-all cursor-pointer" href="/forgot-password">
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
                            Don&apos;t have an account? <a href="/register" className="underline transition-all">Register today!</a>
                        </Typography>
                    </div>
                </form>
            
        </div>
    );
}
