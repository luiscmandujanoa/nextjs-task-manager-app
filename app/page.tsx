import Link from "next/link";
import { FaListCheck, FaFilter, FaMoon } from "react-icons/fa6";
import { SignInButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DemoModal } from "@/components/DemoModal";

const features = [
    { icon: FaListCheck, label: "Create & manage tasks" },
    { icon: FaFilter, label: "Filter by status" },
    { icon: FaMoon, label: "Dark & light mode" },
];

export default async function Home() {
    const { userId } = await auth();

    if (userId) {
        redirect("/tasks");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-8">
            <ThemeToggle />
            <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="font-display text-5xl font-bold">
                    Task Manager
                </h1>
                <p className="text-muted max-w-md text-lg">
                    Organize your tasks, your way. Simple, fast and intuitive.
                </p>
            </div>

            <div className="flex gap-4">
                <SignInButton mode="modal">
                    <button className="bg-accent hover:bg-accent-hover rounded-lg px-6 py-3 font-medium text-white transition">
                        Sign In
                    </button>
                </SignInButton>

                <DemoModal />
            </div>

            <div className="flex gap-8">
                {features.map(({ icon: Icon, label }) => (
                    <div
                        key={label}
                        className="text-muted flex flex-col items-center gap-2 text-sm"
                    >
                        <Icon size={20} />
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </main>
    );
}
