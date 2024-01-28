"use client";

import { Divider, Heading, Stack } from "@chakra-ui/react";
import MenuSectionItem from "./MenuSectionItem";

const PreferencesSection = () => {
  const menuSectionItems: MenuSectionItemTypeDefinition[] = [
    {
      sectionName: "Preferences",
    },
    {
      name: "Main Currency",
      description:
        "It is the main currency, expenses in other currencies will be converted into it.",
      select: {
        currentValue: "EUR - €€€",
        list: ["EUR - €€€", "USD - $$$"],
      },
    },
    {
      name: "Language",
      description: "Change the language used in the user interface.",
      select: {
        currentValue: "Italian",
        list: ["Italian", "English"],
      },
    },
  ];

  return (
    <>
      <Stack spacing={"10px"}>
        {menuSectionItems.map((item) => (
          <MenuSectionItem
            key={item.name}
            sectionName={item.sectionName}
            name={item.name}
            subtitle={item.subtitle}
            description={item.description}
            button={item.button}
            select={item.select}
          />
        ))}
      </Stack>
    </>
  );
};

export default PreferencesSection;
