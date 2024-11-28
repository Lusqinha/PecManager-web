

export type TransactionType = 'Entrada' | 'Saída'


export interface Transaction {
    id?: string
    category: TransactionType
    description: string
    amount: number
    date?: string
}

