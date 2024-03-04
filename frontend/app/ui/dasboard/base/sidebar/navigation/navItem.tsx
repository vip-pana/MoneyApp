import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { NavigationItem } from "./navigationItems";
import { Separator } from "@/components/ui/separator";

const NavItem = ({ item, collapse }: { item: NavigationItem; collapse: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === item.path;
  const { theme } = useTheme();
  const hoverValue = theme == "light" ? "black" : "white";

  if (item.type === "link") {
    return (
      <div className="flex align-middle my-6">
        <Link
          href={item.path ?? "/"}
          // errore nel caricamento
          className={`flex items-center ${isActive ? hoverValue : "text-gray-400"} ${!collapse && "justify-center"}
          hover:no-underline dark:hover:text-white   
          gap-3 w-full ${!collapse && "justify-center"}`}
        >
          {item.icon && <item.icon className="w-4 h-4" />}
          {collapse && <div className="text-base font-semibold">{item.label}</div>}
        </Link>
      </div>
    );
  }

  return (
    <div className={`pt-${collapse ? 8 : 0} my-6`}>
      {collapse ? (
        <p className={`text-gray-400 font-medium uppercase text-sm`}>{item.label}</p>
      ) : (
        <Separator className="my-4" />
      )}
    </div>
  );
};

export default NavItem;
