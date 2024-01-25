import Link from "next/link";
import {
  ListIcon,
  Link as LinkChakra,
  Heading,
  Box,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

const NavItem = ({
  item,
  isActive,
  collapse,
}: {
  item: {
    type: string;
    label: string;
    icon?: IconType;
    path?: string;
  };
  isActive: boolean;
  collapse: boolean;
}) => {
  const { colorMode } = useColorMode();

  const { label } = item;
  if (item.type === "link") {
    const { icon } = item;

    const hoverValue = colorMode == "light" ? "black" : "white";

    return (
      <Box display="flex" alignItems="center" my={6} justifyContent="center">
        <LinkChakra
          href={item.path}
          as={Link}
          gap={1}
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: "none", color: hoverValue }}
          fontWeight="medium"
          color={isActive ? hoverValue : "gray.400"}
          w="full"
          justifyContent={!collapse ? "center" : ""}
        >
          <ListIcon as={icon} fontSize={22} m="0" />
          {collapse && <Text>{label}</Text>}
        </LinkChakra>
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
