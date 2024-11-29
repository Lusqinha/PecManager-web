"use client"

import { TransactionList } from '@/components/TransactionList';
import { TransactionForm } from '@/components/TransactionForm';
import { BalanceSummary } from '@/components/BalaceSummary';
import { useState, useEffect } from "react";
import { api } from '@/lib/api';


import './styles.css';


export default function MovimentacaoPage() { 

    const [current_balance, setBalance] = useState(0);

    useEffect(() => {
        async function fetchBalance() {

            const { data: { balance } } = await api.get('/balance');

            setBalance(balance);
        }

        fetchBalance();
    }, []);

    return (
        <div className=" w-full h-screen justify-center items-center movimentacao">
            <section className="max-w-4xl mx-auto p-4 h-full">
                <h1 className="text-2xl font-bold">Movimentação</h1>
                <div className="grid gap-6 md:grid-cols-2">
                    <TransactionForm />
                    <BalanceSummary balance={current_balance} />
                </div>

                <div className="mt-6">
                    <TransactionList />
                </div>
            </section>
        </div>
    )
}