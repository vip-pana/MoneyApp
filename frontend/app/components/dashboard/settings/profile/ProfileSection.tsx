import { Stack, Avatar, Heading, Text, AvatarBadge, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaPencil } from "react-icons/fa6";

const ProfileSection = () => {
  return (
    <>
      <Stack direction={"row"} spacing={"40px"} alignItems={"center"} mb={"30px"}>
        <Stack>
          <Avatar name="John Doe" size={"xl"} bg="teal.300">
            <AvatarBadge>
              <IconButton aria-label="Edit" variant={"solid"} colorScheme="blue" isRound icon={<FaPencil />} />
            </AvatarBadge>
          </Avatar>
          <Text textAlign={"center"} size={"xl"}>
            Add photo
          </Text>
        </Stack>
        <Stack>
          <Heading>John Doe</Heading>
          <Text>johndoe@gmail.com</Text>
        </Stack>
      </Stack>
    </>
  );
};

export default ProfileSection;
