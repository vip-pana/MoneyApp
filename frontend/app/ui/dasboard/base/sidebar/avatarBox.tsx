"use client";

import { useUserStore } from "@/utils/zustand/userStore";
import { Avatar, Flex, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { LuMoon, LuSun } from "react-icons/lu";

const AvatarBox = ({ collapse }: { collapse: boolean }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const profilePath = "/dashboard/settings/profile";

  const { email, name, surname } = useUserStore();

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
      <Link href={profilePath}>
        <Avatar name={`${name} ${surname}`} bg="teal.300" />
      </Link>
      {collapse && (
        <Flex
          w="full"
          flexDirection="column"
          gap={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Link
            href={profilePath}
            fontSize="sm"
            fontWeight="bold"
            pb="0"
            lineHeight={0}
          >
            {`${name} ${surname}`}
          </Link>

          <Text as="small" color="gray.500" fontSize={12} lineHeight={0}>
            {email}
          </Text>
        </Flex>
      )}

      <IconButton
        aria-label="Settings"
        icon={colorMode === "light" ? <LuMoon /> : <LuSun />}
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
