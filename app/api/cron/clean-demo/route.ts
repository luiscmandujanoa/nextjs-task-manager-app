import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

const DEMO_USER_ID = process.env.DEMO_USER_ID!;

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.task.deleteMany({
        where: { userId: DEMO_USER_ID },
    });

    return Response.json({ success: true, message: "Demo tasks cleaned" });
}
