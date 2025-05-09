import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { date } from "zod";

export async function POST(resquest: NextRequest){
    const { customerId, name, description } = await resquest.json();

    if(!customerId || !name || !description){
        return NextResponse.json({error: "Dados incompletos ou nulos"},{status:400 })
    }

    try{
        await prisma.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: "ABERTO"
            }
        })

        return NextResponse.json({status: 2001})

    }catch(error){
         return NextResponse.json({error: "Erro ao cadastrar ticket"},{status:400 })
    }
}

export async function PATCH(resquest: NextRequest){
    const session = await auth();

    if(!session || !session.user){
        return NextResponse.json({error: "Não autorizado."},{status: 401});
    }

    const { id } = await resquest.json();

    const findTicket = await prisma.ticket.findFirst({
        where: {
            id: id as string
        }
    })

    if(!findTicket){
        return NextResponse.json({error: "Ticket não encontrado!"}, {status: 400});
    }

    try{

        await prisma.ticket.update({
            where: {
                id: id
            },
            data: {
                status: "FECHADO"
            }
        })
    
        return NextResponse.json({message: "Ticket atualizado."}, {status: 200});

    }catch(error){
        return NextResponse.json({error: "Ocorreu um erro: " + error}, {status: 400});
    }
    
}