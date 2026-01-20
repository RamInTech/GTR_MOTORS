"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Package, Settings, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/admin/login");
        }
    }, [user, loading, router]);

    if (!mounted || loading || !user) {
        return null; // or a loading spinner
    }

    return (
        <div className="flex min-h-screen w-full relative">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-black/60 backdrop-blur-xl hidden md:block fixed h-full z-10">
                <div className="p-6">
                    <h2 className="text-2xl font-bold tracking-tight text-red-500">Admin Portal</h2>
                </div>
                <nav className="space-y-2 px-4">
                    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 hover:text-red-400">
                        <BarChart className="mr-2 h-4 w-4" /> Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10">
                        <Users className="mr-2 h-4 w-4" /> Users
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10">
                        <Package className="mr-2 h-4 w-4" /> Products
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                    </Button>
                </nav>
                <div className="absolute bottom-4 left-4 right-4">
                    <Button
                        variant="outline"
                        className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                        onClick={() => auth.signOut()}
                    >
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:ml-64 relative z-0">
                <div className="flex items-center justify-between space-y-2 mb-8 bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-lg">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
                    <div className="text-sm text-gray-400">
                        Logged in as <span className="text-white font-medium">{user.email}</span>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { title: "Total Revenue", value: "₹45,231.89", change: "+20.1% from last month", icon: null },
                        { title: "Subscriptions", value: "+2350", change: "+180.1% from last month", icon: null },
                        { title: "Sales", value: "+12,234", change: "+19% from last month", icon: null },
                        { title: "Active Now", value: "+573", change: "+201 since last hour", icon: null },
                    ].map((item, i) => (
                        <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-md text-white shadow-xl">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">{item.title}</CardTitle>
                                {item.icon}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{item.value}</div>
                                <p className="text-xs text-gray-500 mt-1">{item.change}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
