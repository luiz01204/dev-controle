import Container from "@/components/container";
import { auth} from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link";
import Card from "./components/card";
import { prisma } from "@/lib/prisma";

export default async function page() {
    
    const session = await auth();
        
    if(!session || !session.user){
        redirect("/");
    }

    const customers = await prisma.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    return (
        <Container>
            <main className="mt-8 mb-5">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-3xl">Clientes</h1>
                    <Link href={"/dashboard/customer/new"} className="rounded bg-blue-500 text-white font-semibold p-2 hover:bg-blue-700">
                        Novo Cliente
                    </Link>
                </div>
                <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {customers.map((customer) =>(
                        <Card key={customer.id} customer={customer} />
                    ))}
                </div>
            </main>
        </Container>
    );  
}
