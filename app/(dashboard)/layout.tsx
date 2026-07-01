import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen gap-[2.5rem] p-[2.5rem]">
            <Sidebar />
            <main className="bg-surface border-border flex-1 rounded-xl border-2 p-[2rem]">
                {children}
            </main>
        </div>
    );
}
