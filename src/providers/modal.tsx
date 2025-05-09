"use client"

import { createContext, ReactNode, useState } from "react"
import { ticketProps } from "@/utils/ticket.type"
import { customerProsps } from "@/utils/customer.type"
import ModalTicket from "@/components/modalTicket"

interface modalProps{
    visible: boolean,
    handleModalVisible: () => void,
    ticket: ticketInfo | undefined;
    setDetailsTicket: (datails: ticketInfo) => void;
}

interface ticketInfo{
    ticket: ticketProps | null
    customer: customerProsps | null
}

export const ModalContext = createContext({} as modalProps)

export const ModalProvider = ({ children }: {children: ReactNode}) =>{
    const [visible, setVisible] = useState(false);
    const [ticket, setTicket] = useState<ticketInfo>();

    function handleModalVisible(){
        setVisible(!visible);
    }

    function setDetailsTicket(datails: ticketInfo){
        setTicket(datails)
    }

    return (
        <ModalContext.Provider value={{visible, handleModalVisible, ticket, setDetailsTicket}}>
            {visible && <ModalTicket />}
            {children}
        </ModalContext.Provider>
    );
}