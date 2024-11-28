import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, MinusCircle } from 'lucide-react'
import { Transaction } from "@/types/transactions"


interface TransactionListProps { 
    transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px]">
                    <ul className="space-y-4">
                        {transactions.map((transaction) => (
                            <li key={transaction.id} className="flex items-center justify-between p-2 border-b">
                                <div className="flex items-center">
                                    {transaction.category === "Entrada" ? (
                                        <PlusCircle className="text-green-500 mr-2" />
                                    ) : (
                                        <MinusCircle className="text-red-500 mr-2" />
                                    )}
                                    <div>
                                        <p className="font-medium">{transaction.description}</p>
                                        <p className="text-sm text-gray-500">{
                                            new Date(transaction.date ?? '').toLocaleString('pt-BR')
                                        }</p>
                                    </div>
                                </div>
                                <span className={`font-bold ${transaction.category === "Entrada" ? "text-green-500" : "text-red-500"
                                    }`}>
                                    R$ {transaction.amount.toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}