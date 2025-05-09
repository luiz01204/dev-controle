"use client"

import Container from "@/components/container";
import Input from "@/components/input"; 
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi"
import { useState } from "react";
import NewTicket from "./components/NewTicket";
import { api } from "@/lib/api";

const schema = z.object({
    email: z.string().email("Digite um e-mail valido.")
})

type FormaData = z.infer<typeof schema>

export interface CustomerDataProps{
    id: string,
    name: string
}

export default function OpenTicket() {

    const { register,handleSubmit, setValue, setError, formState: { errors } } = useForm<FormaData>({
        resolver: zodResolver(schema)
    })
    const [customer, setCustomer] = useState<CustomerDataProps | null>(null);

    function handleClearCustomer(){
        setCustomer(null);
        setValue("email","");
    }

    async function handleSearchCustomer(data: FormaData){
        const response = await api.get("/api/customer",{
            params:{
                email: data.email
            }
        })

        if(response.data === null){
            setError("email",{type: "custom", message: "Cliente não encontrado."});
            return;
        }

        setCustomer({
            id: response.data.id,
            name: response.data.name
        })
    }

    return (
        <Container>
            <div className="w-full max-w-2xl mx-auto px-2">
                <h1 className="text-2xl md:text-4xl font-bold text-center mt-24">Abrir chamado</h1>
            </div>

            <main className="flex flex-col mt-4 mb-2">
                {customer ? (
                    <div className="bg-slate-200 py-6 px-4 flex gap-3 justify-between items-center rounded border-2">
                        <p className="text-xl"><strong>Cliente: </strong>{customer.name}</p>
                        <button 
                            className="bg-red-500 rounded text-white h-11 px-2 flex items-center cursor-pointer"
                            onClick={handleClearCustomer}
                            >
                            <FiX size={24} />
                        </button>
                    </div>
                ): (
                    <form onSubmit={handleSubmit(handleSearchCustomer)}>
                        <div className="flex flex-col gap-3">
                            <Input 
                                name="email"
                                placeholder="Digite e-mail do cliente..."
                                type="email"    
                                error={errors.email?.message}
                                register={register}
                            />

                            <button 
                            className="flex gap-1 bg-blue-500 px-2 h-11 text-white font-bold rounded cursor-pointer border-2 border-black justify-center items-center"
                            type="submit"
                            >
                                Procurar Cliente
                                <FiSearch size={24} />
                            </button>
                        </div>
                    </form>
                )}

                {customer !== null &&(
                    <NewTicket customer={customer} />
                )}

            </main>
        </Container>
    );
}
