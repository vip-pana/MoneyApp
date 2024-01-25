"use client";

import { ChakraProvider, ColorModeScript, ThemeConfig } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: true,
  };

  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          position: "top-right",
          isClosable: true,
        },
      }}
    >
      <ColorModeScript initialColorMode={config.initialColorMode} />

      {children}
    </ChakraProvider>
  );
}
