import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShieldX } from "lucide-react";
import Link from "next/link";

export default function NotAdminRoute() {
    return <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
            <CardHeader className="text-center">
                <div className="bg-destructive/10 rounded-full p-4 w-fit mx-auto">
                    <ShieldX className="size-16 text-destructive" />
                </div>
                <CardTitle className="text-2xl mt-3"> Access Restricted </CardTitle>
                <CardDescription> Hey! You are not an admin , you can`t create course</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Link href="/" className={buttonVariants()}>
                    <ArrowLeft className="mr-1 size-4" />
                    Back to Home
                </Link>
            </CardContent>
        </Card>
    </div>
}