import { Avatar, Flex, IconButton, Text, useColorMode } from "@chakra-ui/react";
import {
  MdDarkMode,
  MdOutlineLightMode,
  MdOutlineMoreHoriz,
} from "react-icons/md";

const AvatarBox = ({ collapse }: { collapse: boolean }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      borderWidth={collapse ? 1 : 0}
      shadow={"lg"}
      borderRadius="full"
      w="full"
      p={2}
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      flexDirection={collapse ? "row" : "column-reverse"}
    >
      <Avatar name="John Doe" bg="teal.300" />
      {collapse && (
        <Flex
          w="full"
          flexDirection="column"
          gap={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Text fontSize="sm" fontWeight="bold" pb="0" lineHeight={0}>
            John Doe
          </Text>
          <Text as="small" color="gray.500" fontSize={12} lineHeight={0}>
            johndoe@gmail.com
          </Text>
        </Flex>
      )}

      <IconButton
        aria-label="Settings"
        icon={colorMode === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
        onClick={toggleColorMode}
        borderRadius="full"
        color="gray.400"
        variant="ghost"
        fontSize={20}
      />
    </Flex>
  );
};

export default AvatarBox;
