import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center">
      <div className="hidden lg:block overflow-hidden">
        <Image
          src="/assets/line-pattern.png"
          width={200}
          height={200}
          alt="Line pattern background image"
          className="w-screen h-screen scale-190 object-cover"
        />
      </div>
      <div className="p-4 md:p-8 w-full mx-auto max-w-xl">{children}</div>
    </div>
  );
}
