"use client";

import { Box, Flex, HStack, IconButton, useMediaQuery, useToast } from "@chakra-ui/react";
import React from "react";
import { LuAlignJustify } from "react-icons/lu";
import Sidebar from "../ui/dasboard/base/sidebar/sidebar";
import Navbar from "../ui/dasboard/base/navbar/navbar";
import { useUserStore } from "@/utils/zustand/userStore";
import { graphql } from "@/gql/generated";
import { useQuery } from "@tanstack/react-query";
import { useUserByEmailQuery } from "@/utils/definitions/useQueryDefinition";
import { sessionStorageEmail } from "@/utils/queryUrl";

const Dashboardlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {
    setName,
    setSurname,
    setEmail,
    setCurrency,
    setIncomeCategories,
    setExpenseCategories,
    setIncomeAmount,
    setExpenseAmount,
    setTransactions,
    setSelectedAccountId,
  } = useUserStore();

  const [collapse, setCollapse] = React.useState(false);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const toast = useToast();

  React.useEffect(() => {
    if (!isLargerThan800) {
      setCollapse(false);
    }
  }, [isLargerThan800]);

  const userByEmailQueryDocument = graphql(`
    query userByEmail($email: String!) {
      userByEmail(email: $email) {
        name
        surname
        email
        accounts {
          id
          name
          currency
          incomeAmount
          expenseAmount
          transactions {
            id
            amount
            transactionType
            currency
            dateTime
            description
            transactionType
            category {
              name
              categoryType
            }
          }
          categories {
            name
            categoryType
            subcategories {
              name
              categoryType
            }
          }
        }
      }
    }
  `);

  const { isError, error } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      useUserByEmailQuery({
        email: sessionStorage.getItem(sessionStorageEmail) ?? "",
        setName: setName,
        setSurname: setSurname,
        setEmail: setEmail,
        setCurrency: setCurrency,
        setIncomeCategories: setIncomeCategories,
        setExpenseCategories: setExpenseCategories,
        setIncomeAmount: setIncomeAmount,
        setExpenseAmount: setExpenseAmount,
        setTransactions: setTransactions,
        setSelectedAccountId: setSelectedAccountId,
      }),
  });

  React.useEffect(() => {
    if (isError) {
      {
        toast({
          title: error.name,
          description: error.message,
          status: "error",
        });
      }
    }
  }, [isError, error]);

  return (
    <HStack w="full" h="100vh" padding={10}>
      <Flex
        boxShadow="2xl"
        as="aside"
        w="full"
        h="full"
        maxW={collapse ? 350 : 100}
        alignItems="start"
        padding={6}
        flexDirection="column"
        justifyContent="space-between"
        transition="ease-in-out .2s"
        borderRadius="3xl"
      >
        <Sidebar collapse={collapse} />
      </Flex>
      <Flex as="main" boxShadow="2xl" w="full" h="full" flexDirection="column" position="relative" borderRadius="3xl">
        <IconButton
          aria-label="Menu Colapse"
          icon={<LuAlignJustify />}
          position="absolute"
          top={6}
          left={6}
          onClick={() => setCollapse(!collapse)}
        />
        <Navbar />
        <Box ml={"100px"} mt={"20px"} mr={"100px"}>
          {children}
        </Box>
      </Flex>
    </HStack>
  );
};

export default Dashboardlayout;
