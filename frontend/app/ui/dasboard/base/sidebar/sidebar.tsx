import { Box } from "@chakra-ui/react";
import AvatarBox from "./avatarBox";
import SidebarLogo from "./sidebarLogo";
import Navigation from "./navigation";

const Sidebar = ({ collapse }: { collapse: boolean }) => {
  return (
    <>
      <Box w="full">
        <SidebarLogo collapse={collapse} />
        <Navigation collapse={collapse} />
      </Box>
      <AvatarBox collapse={collapse} />
    </>
  );
};

export default Sidebar;
