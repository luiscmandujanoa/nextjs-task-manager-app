"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted hover:text-foreground absolute top-6 right-6 transition"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
        </button>
    );
}