import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BalanceSummaryProps {
    balance: number
}

export function BalanceSummary({ balance }: BalanceSummaryProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">
                    Saldo Atual: R$ {balance.toFixed(2)}
                </p>
            </CardContent>
        </Card>
    )
}
