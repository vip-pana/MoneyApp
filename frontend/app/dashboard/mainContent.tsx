"use client";

import { sessionStorageEmail } from "@/utils/queryUrl";
import { useUserStore } from "@/utils/zustand/userStore";
import { useColorMode, useMediaQuery, Flex, IconButton, Box } from "@chakra-ui/react";
import { graphql } from "@/gql/generated";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { LuAlignJustify } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { UseUserByEmailQuery } from "@/utils/definitions/useQueryDefinition";
import { toast } from "sonner";
import Navbar from "../ui/dasboard/base/navbar/navbar";
import Sidebar from "../ui/dasboard/base/sidebar/sidebar";

const MainContent = ({
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

  const { colorMode } = useColorMode();
  const [collapse, setCollapse] = useState(false);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  useEffect(() => {
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
              id
              name
              categoryType
            }
          }
          categories {
            id
            name
            categoryType
            subCategories {
              id
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
      UseUserByEmailQuery({
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

  useEffect(() => {
    if (isError) {
      toast.error(error.name, {
        description: error.message,
      });
      redirect("/login");
    }
  }, [isError, error]);

  return (
    <>
      <Flex
        boxShadow={colorMode === "light" ? "2xl" : "none"}
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
        backgroundColor={colorMode === "light" ? "none" : "#2d3748"}
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
    </>
  );
};

export default MainContent;
