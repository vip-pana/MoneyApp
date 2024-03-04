import NavItem from "./navItem";
import { navigationItems } from "@/app/ui/dasboard/base/sidebar/navigation/navigationItems";

const Navigation = ({ collapse }: { collapse: boolean }) => {
  return (
    <div className="w-full my-8 ">
      {navigationItems.map((item, index) => (
        <div key={index}>
          <NavItem item={item} collapse={collapse} />
        </div>
      ))}
    </div>
  );
};

export default Navigation;
