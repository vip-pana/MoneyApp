import {
  MdOutlineSpaceDashboard,
  MdOutlineShoppingBag,
  MdMailOutline,
  MdOutlineFlag,
  MdCalendarToday,
  MdOutlineSupervisorAccount,
  MdOutlineSettingsInputComposite,
  MdOutlineChatBubbleOutline,
  MdOutlineNotificationsActive,
  MdOutlineHistory,
  MdLogout,
} from "react-icons/md";

export const navigationItems = [
  {
    type: "link",
    label: "Dashboard",
    icon: MdOutlineSpaceDashboard,
    path: "/dashboard",
  },
  //   {
  //     type: "link",
  //     label: "History",
  //     icon: MdOutlineHistory,
  //     path: "/",
  //   },
  //   {
  //     type: "link",
  //     label: "Mail",
  //     icon: MdMailOutline,
  //     path: "/",
  //   },
  //   {
  //     type: "link",
  //     label: "Campaings",
  //     icon: MdOutlineFlag,
  //     path: "/",
  //   },
  //   {
  //     type: "link",
  //     label: "Calendar",
  //     icon: MdCalendarToday,
  //     path: "/",
  //   },
  //   {
  //     type: "link",
  //     label: "Contacts",
  //     icon: MdOutlineSupervisorAccount,
  //     path: "/",
  //   },

  {
    type: "header",
    label: "Account",
  },

  //   {
  //     type: "link",
  //     label: "Notifications",
  //     icon: MdOutlineNotificationsActive,
  //     path: "/",
  //   },
  //   {
  //     type: "link",
  //     label: "Chat",
  //     icon: MdOutlineChatBubbleOutline,
  //     path: "/",
  //   },
  {
    type: "link",
    label: "Settings",
    icon: MdOutlineSettingsInputComposite,
    path: "/dashboard/settings",
  },
  {
    type: "link",
    label: "Logout",
    icon: MdLogout,
    path: "/login",
  },
];
