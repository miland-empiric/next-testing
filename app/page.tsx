import Image from "next/image";
import Test from "./testing-Componetns/Test";
import { ThemeToggle } from "@/components/patterns/theme-toggle";

export default function Home() {
  return (
    <>
      <Test />
      <header className="flex items-center justify-between p-4">
        <span className="font-semibold">Acme</span>
        <ThemeToggle />
      </header>
    </>
  );
}
