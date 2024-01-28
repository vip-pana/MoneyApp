import PreferencesSection from "@/app/components/dashboard/settings/PreferencesSection";
import ProfileSection from "@/app/components/dashboard/settings/profile/ProfileSection";
import { Avatar, Box, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Profile = () => {
  return (
    <Box>
      <ProfileSection />
      <PreferencesSection />
    </Box>
  );
};

export default Profile;
