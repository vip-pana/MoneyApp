"use client";

import { Box, Flex, HStack, IconButton, useMediaQuery } from "@chakra-ui/react";
import Navbar from "../ui/dashboard/base/navbar/Navbar";
import Sidebar from "../ui/dashboard/base/sidebar/sidebar";
import React, { useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const layout = ({ children }: { children: React.ReactNode }) => {
  const [collapse, setCollapse] = React.useState(false);

  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  useEffect(() => {
    if (!isLargerThan800) {
      setCollapse(false);
    }
  }, [isLargerThan800]);

  return (
    <HStack w="full" h="100vh" padding={10}>
      <Flex
        boxShadow="2xl"
        as="aside"
        w="full"
        h="full"
        maxW={collapse ? 350 : 100}
        alignItems="start"
        padding={6}
        flexDirection="column"
        justifyContent="space-between"
        transition="ease-in-out .2s"
        borderRadius="3xl"
      >
        <Sidebar collapse={collapse} />
      </Flex>
      <Flex
        as="main"
        boxShadow="2xl"
        w="full"
        h="full"
        flexDirection="column"
        position="relative"
        borderRadius="3xl"
      >
        <IconButton
          aria-label="Menu Colapse"
          icon={<MdMenu />}
          position="absolute"
          top={6}
          left={6}
          onClick={() => setCollapse(!collapse)}
        />
        <Navbar />
        <Box ml={"100px"} mt={"20px"} mr={"100px"}>
          {children}
        </Box>
        <IconButton
          icon={<FaPlus />}
          position={"absolute"}
          size={"lg"}
          rounded="100%"
          bottom={"20px"}
          right={"20px"}
          aria-label="add transaction"
        />
      </Flex>
    </HStack>
  );
};

export default layout;
