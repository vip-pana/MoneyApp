import { Heading } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname =
    usePathname().split("/")[usePathname().split("/").length - 1];

  return (
    <Heading ml={"100px"} mt={"20px"}>
      {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
    </Heading>
  );
};

export default Navbar;
