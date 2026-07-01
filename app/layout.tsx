import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Syne } from "next/font/google";
import "./globals.css";
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
            <body className="bg-background text-foreground min-h-screen">
                <ThemeProvider>
                    <ClerkProvider
                        signInFallbackRedirectUrl="/tasks"
                        signUpFallbackRedirectUrl="/tasks"
                    >
                        <Toaster position="bottom-right" />
                        {children}
                    </ClerkProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
