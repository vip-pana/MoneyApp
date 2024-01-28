import {
  Stack,
  Box,
  Spacer,
  Button,
  Divider,
  Text,
  Select,
  Heading,
} from "@chakra-ui/react";
import React from "react";

const MenuSectionItem = ({
  sectionName,
  name,
  subtitle,
  description,
  button,
  select,
}: MenuSectionItemTypeDefinition) => {
  return (
    <>
      {sectionName ? (
        <Heading size={"md"} mt={"20px"}>
          {sectionName}
        </Heading>
      ) : (
        <Box w={"100%"}>
          <Stack direction={"row"}>
            <Box>
              <Text>{name}</Text>
              <Text fontSize="xs">{subtitle}</Text>
              <Text fontSize="xs">{description}</Text>
            </Box>
            <Spacer />
            {select ? (
              <Select w={"200px"} size={"sm"} placeholder={select.currentValue}>
                {select.list.map((listItem) => (
                  <option key={listItem} value={listItem}>
                    {listItem}
                  </option>
                ))}
              </Select>
            ) : (
              <></>
            )}
            {button ? (
              <Button size={"sm"} colorScheme={button.buttonColorScheme}>
                {button.buttonName}
              </Button>
            ) : (
              <></>
            )}
          </Stack>
        </Box>
      )}
      <Divider />
    </>
  );
};

export default MenuSectionItem;
