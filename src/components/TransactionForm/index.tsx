import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Transaction, TransactionType } from "@/types/transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { api } from "@/lib/api";


export function TransactionForm() {

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState<TransactionType>('Entrada');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const transaction: Transaction = {
            amount: Number(amount),
            category,
            description
        }

        await api.post('/transaction', transaction);

        setDescription('');
        setAmount('');
        setCategory('Entrada');

        window.location.reload();
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Nova Transação</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="amount">Valor</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <RadioGroup value={category} onValueChange={(value: TransactionType) => setCategory(value)}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Entrada" id="entrada" />
                            <Label htmlFor="entrada">Entrada</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Saída" id="saida" />
                            <Label htmlFor="saida">Saída</Label>
                        </div>
                    </RadioGroup>
                    <Button type="submit">Adicionar Transação</Button>
                </form>
            </CardContent>
        </Card>
    )
}