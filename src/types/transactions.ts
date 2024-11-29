

export type TransactionType = 'Entrada' | 'Saída'


export interface POSTTransaction {
    category: TransactionType
    description: string
    amount: number
}

export interface GETTransaction {
    id: string
    category: TransactionType
    description: string
    amount: number
    date?: string
}

