"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInputField } from "@/components/shared/text-input-field";
import { PasswordInputField } from "@/components/shared/password-input-field";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import Link from "next/link";

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
        <div className="w-full flex flex-col justify-center  items-center ">
            {/* Form Container */}
                {/* Heading */}
                <Typography as="h1" size="h1" className="text-primary-dark mb-6  " weight={"semibold"}>
                    Sign in to your account
                </Typography>

                {/* Form */}
                <form className="flex flex-col gap-6 text-primary-dark w-full" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <TextInputField
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        error={errors.email?.message}
                        {...register("email")}
                    />

                    {/* Password Field */}
                    <div className="flex flex-col gap-0.5 sm:gap-1 ">
                        <PasswordInputField
                            id="password"
                            label="Password"
                            placeholder="Password"
                            autoComplete="current-password"
                            error={errors.password?.message}
                            {...register("password")}
                        />

                        {/* Forgot Password */}
                        <div className="w-full flex items-center mt-6">
                            <Link
                                href="/forgot-password"
                                className="text-light-blue hover:underline transition-all cursor-pointer"
                            >
                                <Typography as="span" size="lg">
                                    Forgot password?
                                </Typography>
                            </Link>
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
