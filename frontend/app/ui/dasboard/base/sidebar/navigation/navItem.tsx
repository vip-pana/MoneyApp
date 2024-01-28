import { Box, Heading, ListIcon, Text, useColorMode } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { Link } from "@chakra-ui/next-js";
import { IconType } from "react-icons/lib";

type NavItemElement = {
  type: string;
  label: string;
  icon?: IconType;
  path?: string;
};

const NavItem = ({
  item,
  collapse,
}: {
  item: NavItemElement;
  collapse: boolean;
}) => {
  const { colorMode } = useColorMode();
  const pathname = usePathname();
  const isActive = pathname === item.path;
  const { label } = item;
  if (item.type === "link") {
    const hoverValue = colorMode == "light" ? "black" : "white";

    return (
      <Box display="flex" alignItems="center" my={6} justifyContent="center">
        <Link
          href={item.path ?? "/"}
          gap={1}
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: "none", color: hoverValue }}
          fontWeight="medium"
          color={isActive ? hoverValue : "gray.400"}
          w="full"
          justifyContent={!collapse ? "center" : ""}
        >
          <ListIcon as={item.icon} fontSize={22} m="0" />
          {collapse && <Text>{label}</Text>}
        </Link>
      </Box>
    );
  }
  return (
    <Heading
      color="gray.400"
      fontWeight="medium"
      textTransform="uppercase"
      fontSize="sm"
      borderTopWidth={1}
      borderColor="gray.100"
      pt={collapse ? 8 : 0}
      my={6}
    >
      <Text display={collapse ? "flex" : "none"}>{label}</Text>
    </Heading>
  );
};

export default NavItem;
