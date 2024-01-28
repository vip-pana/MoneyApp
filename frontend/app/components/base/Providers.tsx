"use client";

import { ChakraProvider, ColorModeScript, ThemeConfig } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: true,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        toastOptions={{
          defaultOptions: {
            position: "top-right",
            duration: 9000,
            isClosable: true,
          },
        }}
      >
        <ColorModeScript initialColorMode={config.initialColorMode} />
        {children}
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
