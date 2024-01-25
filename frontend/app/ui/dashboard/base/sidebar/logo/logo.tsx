import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { AiFillThunderbolt, AiOutlineSearch } from "react-icons/ai";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

const Logo = ({ collapse }: { collapse: boolean }) => {
  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={collapse ? "row" : "column"}
      gap={4}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Icon as={LiaMoneyBillWaveSolid} fontSize={30} />
        {collapse && (
          <Text fontWeight="bold" fontSize={16}>
            MoneyApp
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default Logo;
