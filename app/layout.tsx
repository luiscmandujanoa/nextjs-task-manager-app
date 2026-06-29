import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Syne } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const syne = Syne({
    variable: "--font-syne",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Task Manager",
    description: "Manage your tasks efficiently",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${syne.variable} antialiased`}
            suppressHydrationWarning
        >
            <body className="bg-background text-foreground flex min-h-screen gap-[2.5rem] p-[2.5rem]">
                <ThemeProvider>
                    <ClerkProvider>
                        <Sidebar />
                        <Toaster position="bottom-right" />
                        <main className="bg-surface border-border flex-1 rounded-xl border-2 p-[2rem]">
                            {children}
                        </main>
                    </ClerkProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
