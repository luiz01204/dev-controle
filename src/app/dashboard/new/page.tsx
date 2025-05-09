import Container from '@/components/container';
import  { auth } from "@/lib/auth"
import Link from 'next/link';
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma";


export default async function NewDashboardPage() {
    const session = await auth();
    
    if(!session || !session.user){
        redirect("/");
    }

    const customers = await prisma.customer.findMany({
        where: {
            userId: session.user.id
        }
    });

    async function handleRegisterTicket(formaData: FormData){
        "use server"

        const name = formaData.get("name");
        const description = formaData.get("description");
        const customer = formaData.get("customer")

        if(!name || !description || !customer){
            return;
        }

        await prisma.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                customerId: customer as string,
                userId: session?.user?.id,
                status: "ABERTO"
            }
        })

        redirect("/dashboard");

    }

    return (
        <Container>
            <main className="mb-5 mt-8 flex flex-col">

                <div className="flex gap-4">
                    <Link href={"/dashboard"} className="bg-slate-200 border-2 border-slate-400 p-2 rounded">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">
                        Novo Chamado
                    </h1>
                </div>

                <form className="flex flex-col mt-6 " action={handleRegisterTicket}>
                    <label className="font-medium">Título do chamdo</label>
                    <input 
                        className="border-2 rounded px-2 h-11"
                        type="text" 
                        placeholder="Titulo do chamado..."
                        name="name"
                    />

                    <label className="font-medium">Descreva o problema</label>
                    <textarea 
                        className="border-2 rounded px-2 h-30 resize-none" 
                        placeholder="Descreva o problema..."
                        name="description"
                    />

                    {customers.length !== 0 && (
                        <>
                            <label className="font-medium">Selecione o cliente</label>
                            <select 
                                className="w-full border-2 rounded px-2 bg-white"
                                name="customer"
                            >
                                {customers.map((customer) =>(
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
                            </select>

                            <button
                                className="rounded bg-blue-500 text-white font-bold p-2 my-4 cursor-pointer border-2 border-black"
                            >
                                Cadastrar
                            </button>
                        </>
                    )}

                    {customers.length === 0 && (
                        <Link href={"/dashboard/customer/new"}>
                            Você ainda não possui cliente cadastrado, <span className="text-blue-500 font-medium">Cadastrar cliente.</span>
                        </Link>
                    )}
                </form>
            </main>
        </Container>
    );
}
