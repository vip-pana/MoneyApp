import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname().split("/")[usePathname().split("/").length - 1];

  return (
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight ml-24 mt-5 first:mt-0">
      {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
    </h2>
  );
};

export default Navbar;
