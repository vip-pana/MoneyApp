"use client";

import Login from "./login/page";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function Page() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Login />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
