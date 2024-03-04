import AvatarBox from "./avatarBox";
import SidebarLogo from "./sidebarLogo";
import Navigation from "./navigation";

const Sidebar = ({ collapse }: { collapse: boolean }) => {
  return (
    <>
      <div className="w-full ">
        <SidebarLogo collapse={collapse} />
        <Navigation collapse={collapse} />
      </div>
      <AvatarBox collapse={collapse} />
    </>
  );
};

export default Sidebar;
