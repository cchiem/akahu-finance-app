"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import AkahuLink from "./AkahuLink";
import { authFormSchema } from "@/lib/utils";

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);
        try {
            // SIGNUP WITH APPWRITE & AKAHU LINK TOKEN

            if (type === "sign-up") {
                const newUser = await signUp(data);
                if (newUser) {
                    setUser(newUser);
                    router.push("/");
                } else {
                    setError("Email already exists. Please sign in.");
                }
            }

            if (type === "sign-in") {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                });

                console.log(response);

                if (response) {
                    router.push("/");
                } else {
                    setError(
                        "Invalid credentials. Please check the email and password."
                    );
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="auth-form">
            {error && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-w-sm p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-red-600">
                            Authentication Error
                        </h2>
                        <p className="mt-2 text-gray-700">{error}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setError("")}
                                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <header className="flex flex-col gap-5 md:gap-8">
                <Link
                    href="/"
                    className="flex cursor-pointer items-center gap-1"
                >
                    <Image
                        src="/icons/logo.svg"
                        alt="logo"
                        width={34}
                        height={34}
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        Horizon
                    </h1>
                </Link>

                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-35 font-semibold text-grey-900">
                        {user
                            ? "Link Account"
                            : type === "sign-in"
                            ? "Sign In"
                            : "Sign Up"}
                        <p className="text-16 font-normal text-grey-600">
                            {user
                                ? "Link your account to get started"
                                : "Please enter your details"}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    <AkahuLink user={user} variant="primary" />
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {type === "sign-up" && (
                                <>
                                    <div className="flex gap-4">
                                        <CustomInput
                                            control={form.control}
                                            name="firstName"
                                            label="First Name"
                                            placeholder="Ex: John"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name="lastName"
                                            label="Last Name"
                                            placeholder="Ex: Doe"
                                        />
                                    </div>
                                    <CustomInput
                                        control={form.control}
                                        name="address1"
                                        label="Address"
                                        placeholder="Enter your specific address"
                                    />
                                    <div className="flex gap-4">
                                        <CustomInput
                                            control={form.control}
                                            name="city"
                                            label="City"
                                            placeholder="Ex: AUCKLAND"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name="postalCode"
                                            label="Postal Code"
                                            placeholder="Ex: 1010"
                                        />
                                    </div>
                                    <CustomInput
                                        control={form.control}
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        placeholder="YYYY-MM-DD"
                                    />
                                </>
                            )}
                            {/* EMAIL */}
                            <CustomInput
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                            />

                            {/* PASSWORD */}
                            <CustomInput
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                            />

                            {/* SUBMIT BUTTON */}
                            <div className="flex flex-col gap-4">
                                <Button type="submit" className="form-btn">
                                    {isLoading ? (
                                        <>
                                            <Loader2
                                                size={16}
                                                className="animate-spin"
                                            />{" "}
                                            &nbsp; Loading...
                                        </>
                                    ) : type === "sign-in" ? (
                                        "Sign In"
                                    ) : (
                                        "Sign Up"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-grey-600">
                            {type === "sign-in"
                                ? "Don't have an account?"
                                : "Already have an account?"}{" "}
                            <Link
                                href={
                                    type === "sign-in" ? "/sign-up" : "/sign-in"
                                }
                                className="form-link"
                            >
                                {type === "sign-in" ? "Sign Up" : "Sign In"}
                            </Link>
                        </p>
                    </footer>
                </>
            )}
        </section>
    );
};

export default AuthForm;
