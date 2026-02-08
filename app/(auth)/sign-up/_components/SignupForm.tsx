"use client";
/*
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const signupSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
})

type SignupSchema = z.infer<typeof signupSchema>;

export function SignupForm() {

    const router = useRouter();
    const [emailPending, startEmailTransition] = useTransition();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const form = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: SignupSchema) => {
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Create a new account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="example@gmail.com" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" type="text" placeholder="First Name" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" type="text" placeholder="Last Name" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
*/

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { startTransition, useTransition } from "react";
import { Loader2 } from "lucide-react";

// تم تعديل الـ Schema للتأكد من تطابق كلمة المرور
const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupSchema = z.infer<typeof signupSchema>;

export function SignupForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: SignupSchema) => {
        startTransition(async () => {
            await authClient.signUp.email({
                email: data.email,
                password: data.password,
                // دمج الاسم الأول والأخير لأن السيرفر يتوقع حقل name واحد
                name: `${data.firstName} ${data.lastName}`,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Account created successfully!");
                        router.push("/login");
                    },
                    onError: (ctx) => {
                        // هنا سيظهر لك سبب الـ 400 بالتفصيل لو حدثت ثانية
                        toast.error(ctx.error.message || "Failed to sign up");
                    },
                },
            });
        });
    };

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>Create a new account to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2 mt-4">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" {...form.register("firstName")} placeholder="John" />
                                {form.formState.errors.firstName && <p className="text-xs text-destructive">{form.formState.errors.firstName.message}</p>}
                            </div>
                            <div className="grid gap-2 mt-4">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" {...form.register("lastName")} placeholder="Doe" />
                                {form.formState.errors.lastName && <p className="text-xs text-destructive">{form.formState.errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label htmlFor="email-signup">Email</Label>
                            <Input id="email-signup" type="email" {...form.register("email")} placeholder="example@gmail.com" />
                            {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label htmlFor="password-signup">Password</Label>
                            <Input id="password-signup" type="password" placeholder="**********" {...form.register("password")} />
                            {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" placeholder="**********" {...form.register("confirmPassword")} />
                            {form.formState.errors.confirmPassword && <p className="text-xs text-destructive">{form.formState.errors.confirmPassword.message}</p>}
                        </div>

                        <Button type="submit" className="w-full mt-4" disabled={isPending} >
                            {isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                            Register
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}