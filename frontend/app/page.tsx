"use client";

import React, { useState } from "react";
import Login from "./login/page";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Page() {
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(false);

  const queryClient = new QueryClient();
  
  return <>
  <QueryClientProvider client={queryClient}>
    {isLoggedIn ? <></> : <Login />}
  </QueryClientProvider>
  </>;
}
