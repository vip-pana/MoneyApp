// "use client";
// import MenuSectionItem from "@/app/components/dashboard/settings/MenuSectionItem";
// import { Stack } from "@chakra-ui/react";

// const Settings = () => {
//   const menuSectionItems: MenuSectionItemTypeDefinition[] = [
//     {
//       sectionName: "Account Security",
//       name: "Account Security",
//     },
//     {
//       name: "Email",
//       description: "johndoe@gmail.com",
//       button: {
//         buttonName: "Change Email",
//       },
//     },
//     {
//       name: "Password",
//       description: "Set a password to login to your account.",
//       button: {
//         buttonName: "Change Password",
//       },
//     },
//     {
//       name: "2-step Verification",
//       description: "Add 2-step verification for enhance your security.",
//       button: {
//         buttonName: "Add 2-Step",
//       },
//     },
//     {
//       sectionName: "Danger Zone",
//     },
//     {
//       name: "Delete my Account",
//       description: "Permanently delete the account.",
//       button: {
//         buttonName: "Delete",
//         buttonColorScheme: "red",
//       },
//     },
//   ];

//   return (
//     <Stack spacing={"10px"}>
//       {menuSectionItems.map((item) => (
//         <MenuSectionItem
//           key={item.name}
//           sectionName={item.sectionName}
//           name={item.name}
//           subtitle={item.subtitle}
//           description={item.description}
//           button={item.button}
//           select={item.select}
//         />
//       ))}
//     </Stack>
//   );
// };

// export default Settings;
