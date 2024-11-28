import { transaction } from "@prisma/client";
import prisma from "@/lib/db";

function calculateBalance(transactions: transaction[]) :Number {
    let balance = 0;

    transactions.forEach(transaction => {
        if (transaction.category === "Entrada") {
            balance += transaction.amount;
        } else {
            balance -= transaction.amount;
        }
    });

    return balance;
}


export async function GET() {
    const transactions = await prisma.transaction.findMany();

    const balance = {
        "balance": calculateBalance(transactions)
    }



    return Response.json(
        balance
    )

}