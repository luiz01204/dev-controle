import Container from "@/components/container"
import Link from "next/link"

export default function DashBoardHeader() {
    return (
        <Container>
            <nav className="bg-slate-200 text-black flex justify-around font-bold px-4 py-2 rounded border-2 border-slate-400 ">
                <Link href={"/dashboard"} className="hover:scale-110 duration-300">
                    Chamados
                </Link>

                <Link href={"/dashboard/customer"} className="hover:scale-110 duration-300">
                    Clientes
                </Link>
            </nav>
        </Container>
    );
}
