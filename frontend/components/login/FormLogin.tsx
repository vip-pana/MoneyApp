import { VStack } from "@chakra-ui/react";
import { FormCheckEmail } from "./FormCheckEmail";

export const FormLogin = () => {
  // qui abbiamo due form diversi, uno per il check della mail e se superato si passa a quello del login vero
  return (
    <>
      <VStack spacing={10}>
        <FormCheckEmail />
      </VStack>
    </>
  );
};
