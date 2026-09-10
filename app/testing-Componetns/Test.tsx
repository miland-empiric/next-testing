import { ThemeToggle } from "@/components/patterns/theme-toggle";

export default function Test() {
  return (
    <header className="flex items-center justify-between p-4">
      <span className="font-semibold">Acme</span>
      <ThemeToggle />
    </header>
  );
}