import { NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    const transactions = await prisma.transaction.findMany();

    return Response.json(
        transactions
    )
}

export async function POST(req: NextRequest) {

    const { amount, category, description } = await req.json();

    const transaction = await prisma.transaction.create({
        data: {
            amount,
            category,
            description
        }
    });

    return Response.json(
        transaction
    )
    
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    const transaction = await prisma.transaction.delete({
        where: {
            id: id
        }
    });

    return Response.json(
        transaction
    )
}

export async function PUT(req: NextRequest) {
    const { id, amount, category, description } = await req.json();

    const transaction = await prisma.transaction.update({
        where: {
            id: id
        },
        data: {
            amount,
            category,
            description
        }
    });

    return Response.json(
        transaction
    )
}