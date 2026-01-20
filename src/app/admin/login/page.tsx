"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // In a real app, you would check for admin claims or roles here
            toast({
                title: "Admin Access Granted",
                description: "Welcome back, Administrator.",
            });
            router.push("/admin/dashboard");
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Access Denied",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container flex h-[calc(100vh-8rem)] w-full flex-col items-center justify-center">
            <Card className="w-full max-w-sm border-destructive/50 bg-destructive/5 backdrop-blur-xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-destructive">Admin Portal</CardTitle>
                    <CardDescription>
                        Restricted access. Authorized personnel only.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Admin Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@gtr-motors.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-destructive/20 focus-visible:ring-destructive"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-destructive/20 focus-visible:ring-destructive"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                            disabled={loading}
                        >
                            {loading ? "Authenticating..." : "Access Dashboard"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-muted-foreground text-center w-full">
                        Secure Connection • IP Logged
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
