"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useState, useTransition } from "react";
import { start } from "repl";
import { toast } from "sonner";

export default function VerifyRequest() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [emailPending, startTransition] = useTransition();
    const params = useSearchParams();
    const email = params.get("email") as string;
    const isOtpComplete = otp.length === 6;

    function verifyOTP() {
        startTransition(async () => {
            await authClient.signIn.emailOtp({
            email: email,
            otp: otp,
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Successfully verified OTP!");
                    router.push("/");
                },
                onError: () => {
                    toast.error("Invalid OTP. Please try again.");
                }
            }  
        });
    }
)}
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-col items-center space-y-2 text-xl">Check your email</CardTitle>
                <CardDescription className="text-center">
                    We have sent a verification link to your email address. Please check your inbox and click on the link to proceed.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <InputOTP value={otp} onChange={(value) => setOtp(value)} maxLength={6} className="gap-2">
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email</p>
                </div>
                <Button onClick={verifyOTP} disabled={emailPending || !isOtpComplete} className="w-50">
                    {emailPending ? (
                        <>
                        <Loader2 className="size-4 animate-spin"/>
                        <span className="ml-2">Loading...</span>
                        </>
                    ) : (
                        "Verify Account"
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}