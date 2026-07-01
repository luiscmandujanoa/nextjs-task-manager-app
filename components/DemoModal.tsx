"use client";

import { useRef, useState } from "react";
import { MdClose, MdContentCopy, MdCheck } from "react-icons/md";

export function DemoModal() {
    const ref = useRef<HTMLDialogElement>(null);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);

    const copy = (text: string, type: "email" | "password") => {
        navigator.clipboard.writeText(text);
        if (type === "email") {
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        } else {
            setCopiedPassword(true);
            setTimeout(() => setCopiedPassword(false), 2000);
        }
    };

    return (
        <>
            <button
                onClick={() => ref.current?.showModal()}
                className="border-border text-muted hover:bg-nav-hover rounded-lg border px-6 py-3 font-medium transition"
            >
                Try Demo
            </button>

            <dialog
                ref={ref}
                className="bg-surface text-foreground w-full max-w-sm rounded-xl p-6 shadow-xl backdrop:bg-black/60"
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold">
                        Demo Credentials
                    </h2>
                    <button
                        onClick={() => ref.current?.close()}
                        className="text-muted hover:text-foreground transition"
                        aria-label="Close"
                    >
                        <MdClose size={20} />
                    </button>
                </div>

                <p className="text-muted mb-6 text-sm">
                    Use these credentials to sign in and explore the app.
                </p>

                <div className="flex flex-col gap-3">
                    <div className="bg-muted-bg flex items-center justify-between rounded-lg px-4 py-3">
                        <div>
                            <p className="text-muted text-xs">Email</p>
                            <p className="text-sm font-medium">
                                demo@taskmanager.com
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                copy("demo@taskmanager.com", "email")
                            }
                            className="text-muted hover:text-foreground transition"
                            aria-label="Copy email"
                        >
                            {copiedEmail ? (
                                <MdCheck size={18} className="text-green-400" />
                            ) : (
                                <MdContentCopy size={18} />
                            )}
                        </button>
                    </div>

                    <div className="bg-muted-bg flex items-center justify-between rounded-lg px-4 py-3">
                        <div>
                            <p className="text-muted text-xs">Password</p>
                            <p className="text-sm font-medium">
                                TaskManager2026!
                            </p>
                        </div>
                        <button
                            onClick={() => copy("TaskManager2026!", "password")}
                            className="text-muted hover:text-foreground transition"
                            aria-label="Copy password"
                        >
                            {copiedPassword ? (
                                <MdCheck size={18} className="text-green-400" />
                            ) : (
                                <MdContentCopy size={18} />
                            )}
                        </button>
                    </div>
                </div>

                <p className="text-muted mt-4 text-center text-xs">
                    Then click Sign In to access the demo
                </p>
            </dialog>
        </>
    );
}
