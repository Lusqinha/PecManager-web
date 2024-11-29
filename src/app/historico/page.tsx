"use client"

import { TransactionList } from "@/components/TransactionList";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function HistoricoPage() {

  return (
    <div className="h-full w-1/2 mx-auto flex justify-center items-center">
        <TransactionList className="h-3/4" editable />
    </div>
  );
}