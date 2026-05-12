"use client";
import AuthLayout from "./(auth)/layout";
import LoginPage from "./(auth)/login/page";

export default function Home() {
  return (
    <AuthLayout>
    <LoginPage />
    </AuthLayout>
  );
}
