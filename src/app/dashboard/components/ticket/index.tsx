"use client";

import { FiCheckSquare, FiFile } from "react-icons/fi";
import { ticketProps } from "@/utils/ticket.type";
import { customerProsps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { redirect } from "next/navigation"
import { ModalContext } from "@/providers/modal";
import { useContext } from "react";

interface ticketItemProps{
    ticket : ticketProps
    customer: customerProsps | null
}

export default function TicketItem({ customer, ticket }: ticketItemProps ) {

    const { handleModalVisible, setDetailsTicket } = useContext(ModalContext)

    async function handleChangeStatus(){
        try{
            const response = await api.patch("/api/ticket",{
                id: ticket.id
            })

            await redirect("/dashboard")

        }catch(error){
            console.log("Ocorreu um erro: " + error)
        }
    }

    function handleOnClick(){
        handleModalVisible();
        setDetailsTicket({
            customer: customer,
            ticket: ticket
        });
    }

    return (
        <tr className="h-16 bg-slate-200">
            <td className="text-left pl-2">{ticket.name}</td>
            <td className="text-left hidden md:table-cell">{customer?.name}</td>
            <td className="text-left hidden sm:table-cell">{ticket.create_at?.toLocaleDateString("pt-br")}</td>
            <td>
                <span className="bg-green-500 px-2 rounded">{ticket.status}</span>
            </td>
            <td className="text-center">
                <button>
                    <FiCheckSquare 
                        size={24} 
                        className="text-green-500 cursor-pointer mr-2" 
                        onClick={handleChangeStatus}
                    />
                </button>
                <button>
                    <FiFile size={24} 
                        onClick={handleOnClick} 
                        className="text-blue-500 cursor-pointer" 
                    />
                </button>
            </td>
        </tr>
    );
}
