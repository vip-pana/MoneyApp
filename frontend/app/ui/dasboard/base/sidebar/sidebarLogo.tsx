import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { LuDollarSign } from "react-icons/lu";

const SidebarLogo = ({ collapse }: { collapse: boolean }) => {
  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={collapse ? "row" : "column"}
      gap={4}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Icon as={LuDollarSign} fontSize={30} />
        {collapse && (
          <Text fontWeight="bold" fontSize={16}>
            MoneyApp
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default SidebarLogo;
