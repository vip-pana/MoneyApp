import { ChevronRight } from "lucide-react";
import MenuSectionItem, { MenuSectionItemTypeDefinition } from "./menuSectionItem";

const PreferencesSection = () => {
  const menuSectionItems: MenuSectionItemTypeDefinition[] = [
    {
      sectionId: 0,
      sectionName: "Security",
      sectionDescription: "Here you can change the security settings of your account",
      subSection: [
        {
          id: 0,
          name: "Email",
          nameDescription: "example.com",
          button: {
            buttonName: "change email",
          },
        },
        {
          id: 1,
          name: "Password",
          nameDescription: "Set a permanent password to login to your account",
          button: {
            buttonName: "change password",
          },
        },
        {
          id: 2,
          name: "2-step verification",
          nameDescription: "Add an additional layer of security to your account during login",
        },
      ],
      select: {
        currentValue: "Italian",
        // list: ["Italian", "English"],
      },
    },
    {
      sectionId: 1,
      sectionName: "Danger Zone",
      sectionDescription: "This is your public display name.",
      subSection: [
        {
          id: 3,
          name: "Log out of all devices",
          nameDescription: "example.com",
          button: {
            buttonName: "Log Out",
          },
        },
        {
          id: 4,
          name: "Delete my account",
          nameDescription: "Permantently delete the account and remove access from all workspaces.",
          button: {
            icon: ChevronRight,
          },
        },
        {
          id: 5,
          name: "Delete my profile",
          nameDescription: "Permantently delete the account and remove access from all workspaces.",
          button: {
            buttonName: "Delete my profile",
          },
        },
      ],
      select: {
        currentValue: "EUR - €€€",
        // list: ["EUR - €€€", "USD - $$$"],
      },
    },
  ];

  return (
    <>
      <div className="mr-11">
        {menuSectionItems.map((item, index) => (
          <MenuSectionItem
            key={index}
            sectionId={item.sectionId}
            sectionName={item.sectionName}
            sectionDescription={item.sectionDescription}
            subSection={item.subSection}
          />
        ))}
      </div>
    </>
  );
};

export default PreferencesSection;
