"use client";

import Link from "next/link";
import {
    FaHouse,
    FaListCheck,
    FaCheck,
    FaClipboardList,
} from "react-icons/fa6";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const navLinks = [
    { href: "/", label: "All Tasks", icon: FaHouse },
    { href: "/completed", label: "Completed", icon: FaListCheck },
    { href: "/important", label: "Important", icon: FaCheck },
    { href: "/incomplete", label: "Incomplete", icon: FaClipboardList },
];

export default function Sidebar() {
    const pathName = usePathname();
    const { user } = useUser();

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const displayName = user?.firstName
        ? `${user.firstName} ${user.lastName ?? ""}`.trim()
        : (user?.username ?? "");

    return (
        <aside className="bg-surface border-border flex w-[15rem] flex-col justify-between rounded-xl border p-[2rem]">
            <div>
                <div className="mb-8 flex items-center gap-3">
                    <UserButton />
                    <p className="truncate font-medium capitalize">
                        {displayName}
                    </p>
                </div>

                <nav>
                    <ul className="flex flex-col gap-1">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`hover:bg-nav-hover flex items-center gap-3 rounded-lg px-3 py-2 transition ${
                                        pathName === href ? "bg-nav-active" : ""
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span>{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Theme toggle va aquí */}
            {mounted && (
                <button
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="hover:bg-nav-hover text-muted flex items-center gap-3 rounded-lg px-3 py-2 transition hover:cursor-pointer"
                >
                    {theme === "dark" ? (
                        <MdLightMode size={18} />
                    ) : (
                        <MdDarkMode size={18} />
                    )}
                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </button>
            )}
        </aside>
    );
}
