import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8 flex items-center justify-center gap-8 flex-col max-w-md mx-auto h-screen">
      <p className="font-geist font-semibold text-5xl">CBT Genie😎</p>
      <p className="text-xl">Coming soon...</p>

      <Button block>
        <Link href="/auth">Get Started</Link>
      </Button>
    </main>
  );
}
