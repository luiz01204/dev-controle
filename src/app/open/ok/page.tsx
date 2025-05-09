import Container from "@/components/container";
import Link from "next/link";

export default function OkPage() {
    return (
        <Container>
            <div className="w-full flex flex-col justify-center items-center mt-24 font-bold">
                <h1 className="text-2xl md:text-4xl">Chamdo Aberto com sucesso.</h1>
                <Link className="mt-4 font-semibold text-blue-500" href={"/open"}>
                    Abrir novo chamado.
                </Link>
            </div>
        </Container>
    );
}
