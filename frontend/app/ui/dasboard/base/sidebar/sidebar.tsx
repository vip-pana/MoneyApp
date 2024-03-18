import AvatarBox from "./avatarBox";
import SidebarLogo from "./sidebarLogo";
import Navigation from "./navigation";

const Sidebar = ({ collapse }: { collapse: boolean }) => {
  return (
    <aside
      className={`flex flex-col shadow-2xl border-gray border w-full h-full p-7 items-start justify-between rounded-xl mr-5`}
      style={{
        maxWidth: `${collapse ? 300 : 100}px`,
        transition: "ease-in-out .2s",
      }}
    >
      <div className="w-full ">
        <SidebarLogo collapse={collapse} />
        <Navigation collapse={collapse} />
      </div>
      <AvatarBox collapse={collapse} />
    </aside>
  );
};

export default Sidebar;
