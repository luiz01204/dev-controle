"use client"

import { useContext } from "react";
import { ModalContext } from "@/providers/modal";
import { customerProsps } from "@/utils/customer.type";
import { ticketProps } from "@/utils/ticket.type";

export default function ModalTicket() {
    const { handleModalVisible, ticket } = useContext(ModalContext);
    return (
        <section className="absolute bg-gray-900/80 w-full min-h-screen ">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded">

                    <div className="flex justify-between items-center mb-4">
                        <h1 className="font-semibold text-lg md:text-2xl">Detalhes do chamado: </h1>
                        <button 
                            className="bg-red-500 rounded border-2 border-black text-white p-2 font-semibold cursor-pointer"
                            onClick={handleModalVisible}
                        >
                            Fechar
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                        <h2 className="font-semibold">Título: </h2>
                        <p>{ticket?.ticket?.name}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                        <h2 className="font-semibold">Status: </h2>
                        <p>{ticket?.ticket?.status}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                        <h2 className="font-semibold">Data de abertura: </h2>
                        <p>{ticket?.ticket?.create_at?.toLocaleDateString("pt-br")}</p>
                    </div>

                    <div className="flex flex-col flex-wrap gap-2 mb-2">
                        <h2 className="font-semibold">Descrição: </h2>
                        <p>{ticket?.ticket?.description}</p>
                    </div>

                    <div className="w-full border-b-1 my-4"></div>

                    <h1 className="font-semibold text-lg md:text-xl">Detalhes do cliente: </h1>

                    <div className="flex flex-wrap gap-2 mb-2">
                        <h2 className="font-semibold">Cliente: </h2>
                        <p>{ticket?.customer?.name}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                        <h2 className="font-semibold">E-mail: </h2>
                        <p>{ticket?.customer?.email}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                        <h2 className="font-semibold">Telefone: </h2>
                        <p>{ticket?.customer?.phone}</p>
                    </div>

                </div>
            </div>
        </section>
    )
}
