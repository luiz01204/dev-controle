import Container from '@/components/container';
import  { auth } from "@/lib/auth"
import Link from 'next/link';
import { redirect } from "next/navigation"
import FormClient from '../components/form';


export default async function NewClientPage() {
    const session = await auth();
    
    if(!session || !session.user){
        redirect("/");
    }

    return (
        <Container>
            <main className="mb-5 mt-8 flex flex-col">
                <div className="flex gap-4">
                    <Link href={"/dashboard/customer"} className="bg-slate-200 border-2 border-slate-400 p-2 rounded">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">
                        Novo Cliente
                    </h1>
                </div>
                <FormClient userId={session.user.id} />
            </main>
        </Container>
    )
}
