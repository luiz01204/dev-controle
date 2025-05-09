export interface ticketProps{
    userId: string | null;
    name: string;
    id: string;
    create_at: Date | null;
    update_at: Date | null;
    description: string;
    status: string;
    customerId: string | null;
}