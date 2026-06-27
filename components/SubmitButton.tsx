"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-lg bg-zinc-500 py-2 text-sm font-medium transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {pending ? "Saving..." : label}
        </button>
    );
}
