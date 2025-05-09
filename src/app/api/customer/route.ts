import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { error } from "console";

export async function GET(request: NextRequest){
    const { searchParams } = new URL(request.url);
    const customerEmail = searchParams.get("email")

    if(!customerEmail || customerEmail === ""){
        return  NextResponse.json({ error: "E-mail vazio"},{ status: 400})
    }

    try{
        const customer = await prisma.customer.findFirst({
            where: {
                email: customerEmail
            }
        })

        return NextResponse.json(customer);

    }catch(error){
        return  NextResponse.json({ error: "Erro ao buscar cliente."},{ status: 400})
    }
}

export async function DELETE(request: NextRequest){
    const session = await auth()

    if(!session || !session.user){
        return NextResponse.json({error: "Não autorizado"}, { status: 401})
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if(!userId){
        return NextResponse.json({error: "Id não encontrato na URL."}, { status: 400})
    }

    const tickets = await prisma.ticket.findFirst({
        where: {
            customerId: userId
        }
    })

    if(tickets){
        return NextResponse.json({error: "Esse cliente possui tickets vinculados."}, { status: 400})
    }

    try{
         await prisma.customer.delete({
            where: {
                id: userId as string
            }
        })

        return NextResponse.json({Message: "Cliente deletado."}, { status: 200})

    }catch(error){
        return NextResponse.json({error: "Ocorreu um erro: " + error}, { status: 400})
    }
}

export async function POST(request: NextRequest){
    const session = await auth()

    if(!session || !session.user){
        return NextResponse.json({error: "Não autorizado"}, { status: 401})
    }

    const { name, email, phone, address, userId } = await request.json();

    try{
        await prisma.customer.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                address: address? address : "",
                userId: userId
            }
        })

        return NextResponse.json({Message: "Cliente cadastrado."}, { status: 201})
        
    }catch(error){
        return NextResponse.json({error: "Ocoreu um erro: " + error}, { status: 400})
    }
}