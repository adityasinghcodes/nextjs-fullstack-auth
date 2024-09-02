"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInSchema } from "@/lib/zod";
import LoadingButton from "@/components/loading-button";
import {
    handleCredentialsSignin,
    handleGithubSignin,
} from "@/app/actions/authActions";
import { useState } from "react";
import ErrorMessage from "@/components/error-message";
import { Button } from "@/components/ui/button";

export default function SignIn() {
    const [globalError, setGlobalError] = useState<string>("");
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
            const result = await handleCredentialsSignin(values);
            if (result?.message) {
                setGlobalError(result.message);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Welcome Back
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {globalError && <ErrorMessage error={globalError} />}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email address"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit button will go here */}
                            <LoadingButton
                                pending={form.formState.isSubmitting}
                            />
                        </form>
                    </Form>

                    <span className="text-sm text-gray-500 text-center block my-2">
                        or
                    </span>
                    <form className="w-full" action={handleGithubSignin}>
                        <Button
                            variant="outline"
                            className="w-full"
                            type="submit"
                        >
                            <GitHubLogoIcon className="h-4 w-4 mr-2" />
                            Sign in with GitHub
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
