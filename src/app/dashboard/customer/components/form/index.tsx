"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "@/components/input";
import { api } from "@/lib/api"
import { redirect } from "next/navigation"

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório."),
    email: z.string().email("Digite um e-mail valido.").min(1,"e-mail é obrigatório."),
    phone: z.string().refine((value) =>{
        return /^\(\d{2}\) \d{5}-\d{4}$/.test(value) || /^\(\d{2}\) \d{4}-\d{4}$/.test(value)
    }, {
        message: "O número deve ser prenchido dessa forma (DD) 99999-9999."
    }),
    address: z.string().min(1, "Endereço obrigatório.")
});

type FormData = z.infer<typeof schema>

export default function FormClient({ userId }: { userId: string | undefined }) {
    
    const {register, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    async function handleRegisterCustomer(data: FormData){
        const response = await api.post("/api/customer", {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            userId: userId
        })

        redirect("/dashboard/customer");
    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="font-semibold">Nome completo</label>
            <Input 
                type="text"
                placeholder="digite nome do cliente..."
                name="name"
                error={errors.name?.message}
                register={register}
            />

            <div className="flex gap-2">
                <div className="flex-1">
                    <label className="font-semibold">E-mail</label>
                    <Input 
                        type="email"
                        placeholder="exemplo@exemplo.com"
                        name="email"
                        error={errors.email?.message}
                        register={register}
                    />
                </div>
                <div className="flex-1">
                    <label className="font-semibold">Telefone</label>
                    <Input 
                        type="phone"
                        placeholder="(DD) 99999-9999"
                        name="phone"
                        error={errors.phone?.message}
                        register={register}
                    />
                </div>
            </div>
            
            <label className="font-semibold">Endereço</label>
            <Input 
                type="text"
                placeholder="Digite endereço..."
                name="address"
                error={errors.address?.message}
                register={register}
            />

            <button 
                type="submit" 
                className="bg-blue-500 rounded p-2 text-white font-bold my-4 cursor-pointer border-2 border-black">
                Cadastrar
            </button>
        </form>
    );
}
