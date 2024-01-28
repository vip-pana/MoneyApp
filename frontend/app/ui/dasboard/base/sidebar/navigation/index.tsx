import { List, ListItem } from "@chakra-ui/react";
import NavItem from "./navItem";
import { navigationItems } from "@/utils/navigationItems";

const Navigation = ({ collapse }: { collapse: boolean }) => {
  return (
    <List w="full" my={8}>
      {navigationItems.map((item, index) => (
        <ListItem key={index}>
          <NavItem item={item} collapse={collapse} />
        </ListItem>
      ))}
    </List>
  );
};

export default Navigation;
