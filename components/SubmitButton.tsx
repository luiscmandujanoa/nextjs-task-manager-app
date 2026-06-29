"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-accent hover:bg-accent-hover mt-2 rounded-lg py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
        >
            {pending ? "Saving..." : label}
        </button>
    );
}
