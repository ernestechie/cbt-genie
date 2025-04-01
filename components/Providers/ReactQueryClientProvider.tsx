"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

interface ReactQueryClientProviderProps {
  children: React.ReactNode;
}

export default function ReactQueryClientProvider({
  children,
}: ReactQueryClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
