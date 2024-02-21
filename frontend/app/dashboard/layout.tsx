import { HStack } from "@chakra-ui/react";
import MainContent from "./mainContent";
import InsertOperationComponent from "./insertOperationComponent";

const Dashboardlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <HStack w="full" h="100vh" padding={10}>
      <MainContent>{children}</MainContent>
      <InsertOperationComponent />
    </HStack>
  );
};

export default Dashboardlayout;
