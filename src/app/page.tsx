import Image from "next/image";
import hero from "../../public/hero.svg"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 mx-auto">
      <h2 className="font-medium text-2xl mb-2 text-center">Gerencia seus atendimentos.</h2>
      <h2 className="font-bold text-3xl text-blue-500 mb-8 md:text-4xl text-center">Melhore seu tempo de resposta.</h2>
      <Image 
        src={hero}
        alt="hero da pagina inicial"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
