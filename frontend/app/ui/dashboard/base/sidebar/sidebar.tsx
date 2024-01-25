"use client";

import Logo from "./logo/logo";
import { Box } from "@chakra-ui/react";
import Navigation from "./navigation";
import AvatarBox from "./avatarBox/avatarBox";

const Sidebar = ({ collapse }: { collapse: boolean }) => {
  return (
    <>
      <Box w="full">
        <Logo collapse={collapse} />
        <Navigation collapse={collapse} />
      </Box>
      <AvatarBox collapse={collapse} />
    </>
  );
};

export default Sidebar;
