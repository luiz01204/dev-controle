import Container from '@/components/container';
import  { auth } from "@/lib/auth"
import Link from 'next/link';
import { redirect } from "next/navigation"
import TicketItem from './components/ticket';
import { prisma } from '@/lib/prisma';
import { FiRefreshCcw } from "react-icons/fi"

export default async function DashBoard() {
    const session = await auth();
    
    if(!session || !session.user){
        redirect("/");
    }

    const tickets = await prisma.ticket.findMany({
        where: {
            status: "ABERTO",
            customer: {
                userId: session.user.id
            }
        },
        include: {
            customer: true
        }
    });

    function handleRefreshPage(){
        redirect("/dashboard")
    }

    return (
        <Container>
            <main className="mt-8 mb-5">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-3xl">Chamados</h1>
                    <div className="flex gap-2">
                        <Link href={"/dashboard"} className="rounded bg-blue-500 text-white font-semibold p-2 hover:bg-blue-700 cursor-pointer">
                            <FiRefreshCcw size={24} />
                        </Link>
                        <Link href={"/dashboard/new"} className="rounded bg-blue-500 text-white font-semibold p-2 hover:bg-blue-700">
                            Abrir Chamado
                        </Link>
                    </div>
                    
                </div>

                <table className="min-w-full my-4 border-separate border-spacing-y-2">
                    <thead>
                        <tr>
                            <th className="font-medium text-left">Título</th>
                            <th className="font-medium text-left hidden md:table-cell">Cliente</th>
                            <th className="font-medium text-left hidden sm:table-cell">Data</th>
                            <th className="font-medium text-left">Status</th>
                            <th className="font-medium text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) =>(
                            <TicketItem
                                key={ticket.id} 
                                ticket={ticket} 
                                customer={ticket.customer} 
                            />
                        ))}
                    </tbody>
                </table>

                {tickets.length === 0 && (
                    <p className="mt-5 font-medium">
                        Nenhum chamado aberto foi encontrado...
                    </p>
                )}  
            </main>
        </Container>
    );
}
