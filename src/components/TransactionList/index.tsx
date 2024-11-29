import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, MinusCircle, TrashIcon } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { GETTransaction } from "@/types/transactions"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"

interface TransactionListProps { 
    className?: string,
    editable?: boolean
}

export function TransactionList({className, editable }: TransactionListProps) {

    const [transactions, setTransactions] = useState([] as GETTransaction[]);

    function getTransactions() {
        api.get('/transaction')
            .then(response => setTransactions(response.data))
            .catch(error => console.error(error));
    }
    
    useEffect(() => {
        getTransactions()
    }, []);
    

    const handleDelete = (id: string) => {
        
        const to_delete = {
            id: id
        }

        api.delete('/transaction', { data: to_delete })
            .then(response => {
                console.log(response)
                getTransactions()
            })
            .catch(error => {
                console.error(error)
            });          
    }



    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className={cn("h-[300px]", className)}>
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
                                {editable && (
                                    <button className="text-red-500 mx-4" onClick={() => handleDelete(transaction.id)}><TrashIcon /></button>
                                )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}