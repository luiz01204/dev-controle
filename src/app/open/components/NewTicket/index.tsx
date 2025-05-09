"use client"

import Container from "@/components/container";
import Input from "@/components/input"; 
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomerDataProps } from "../../page";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";

const schema = z.object({
    name: z.string().min(1,"O nome do chamado é obrigatório."),
    description: z.string().min(1,"Descreva seu problema.")
})

type FormaData =  z.infer<typeof schema>

interface NewTicketProps{
    customer: CustomerDataProps
}

export default function NewTicket({ customer }: NewTicketProps) {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    async function handleSubmiteTicket(data: FormaData){
        const response = await api.post("/api/ticket",{
            name: data.name,
            description: data.description,
            customerId: customer.id
        })

        await redirect("/open/ok")
    }

    return (
        <form 
            onSubmit={handleSubmit(handleSubmiteTicket)}
            className="bg-slate-200 mt-6 px-4 py-6 rounded border-2"
            >
            <label className="mb-1 font-medium text-lg">Título do chamado</label>
            <Input 
                name="name"
                placeholder="Digite o título..."
                type="text"
                register={register}
                error={errors.name?.message}
            />

            <label className="mb-1 font-medium text-lg">Descreva o problema</label>
            <textarea
                className="w-full border-2 rounded h-30 resize-none mb-2 px-2"
                placeholder="Descreva aqui..."
                id="description"
                {...register("description")}
            ></textarea>
            {errors.description?.message && <p className="text-red-500 my-1">{errors.description.message}</p>}

            <button className="bg-blue-500 rounded w-full h-11 px-2 text-white font-bold cursor-pointer">
                Cadastrar
            </button>
        </form>
    );
}
