import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function SuccessPage() {
  return (
    <div className="mb-4 flex flex-col items-center justify-center gap-6 p-8 py-16 sm:p-16 bg-primary/10 rounded-3xl text-center max-w-xl mx-auto">
      <Image src="/success.svg" alt="Success Image" width={100} height={100} />
      <h1 className="text-3xl font-extrabold text-neutral-800">
        Student Profile Created
      </h1>
      <p className="text-neutral-600">
        Your profile has been successfully set up. You&apos;re now ready to
        access tests, track your progress, and explore learning resources.
      </p>
      <Link href="/app">
        <Button size="large" block type="submit">
          Continue to Dashboard
          <i className="pi pi-chevron-right text-xs" />
        </Button>
      </Link>
    </div>
  );
}
