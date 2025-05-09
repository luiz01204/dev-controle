"use client";

import { customerProsps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation"

export default function Card({ customer }: { customer: customerProsps }) {

    const route = useRouter();

    async function hadleDeleteCostumer(){
        try{
            const response = await api.delete("/api/customer",{
                params: {
                    id: customer.id
                }
            })
    
            await route.refresh();

        }catch(error){
            console.log("ocorreu um erro: " + error)
        }
    }

    return (
        <article className="flex flex-col border-2 border-slate-400 bg-slate-200 p-4 rounded hover:scale-105 duration-300">
            <h2>
                <span className="font-bold">Nome:</span> {customer.name}
            </h2>

            <p>
                <span className="font-bold">E-mail:</span> {customer.email}
            </p>

            <p>
                <span className="font-bold">Telefone:</span> {customer.phone}
            </p>

            <p>
                <span className="font-bold">Endereço:</span> {customer.address}
            </p>

            <button 
                className="bg-red-500 rounded text-white mt-2 p-2 self-start cursor-pointer"
                onClick={hadleDeleteCostumer}>
                Excluir
            </button>
        </article>
    );
}
