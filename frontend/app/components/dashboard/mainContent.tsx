"use client";

import { sessionStorageEmail } from "@/utils/queryUrl";
import { useUserStore } from "@/utils/zustand/userStore";
import { graphql } from "@/gql/generated";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UseRefreshTokenMutation, UseUserByEmailQuery } from "@/utils/definitions/useQueryDefinition";
import Navbar from "../../ui/dasboard/base/navbar/navbar";
import Sidebar from "../../ui/dasboard/base/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import { OperationType } from "@/gql/generated/graphql";
import { useAccessTokenStore } from "@/utils/zustand/accessTokenStore";
import { NOT_AUTHORIZED_ERROR, getGraphQLErrorCode, manageApiCallErrors } from "@/utils/errorUtils";

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

  const [collapse, setCollapse] = useState(false);
  const { accessToken, setAccessToken } = useAccessTokenStore();

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
            currency
            dateTime
            description
            transactionType
            category {
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

  const refreshTokenQueryDocument = graphql(`
    mutation refreshToken($input: RefreshTokenInput!) {
      refreshToken(input: $input) {
        tokenResponse {
          accessToken
          refreshToken
        }
        errors {
          ...errorFields
        }
      }
    }
  `);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const { isError, error, data, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: () => UseUserByEmailQuery(sessionStorage.getItem(sessionStorageEmail) ?? "", headers),
    retry: 0,
  });

  const { refetch: refetchTokenMutation } = useQuery({
    queryKey: ["refreshToken"],
    queryFn: () => UseRefreshTokenMutation(sessionStorage.getItem("refreshToken") ?? ""),
    enabled: false,
    retry: 1,
  });

  const requireNewToken = async () => {
    const { data: requireNewTokenData, isError: isRequireNewTokenError, error } = await refetchTokenMutation();
    if (isRequireNewTokenError) {
      manageApiCallErrors(error, requireNewTokenData?.refreshToken.errors);
      redirect("/login");
    } else if (requireNewTokenData?.refreshToken?.tokenResponse?.accessToken) {
      setAccessToken(requireNewTokenData.refreshToken.tokenResponse.accessToken);
      sessionStorage.setItem("refreshToken", requireNewTokenData.refreshToken.tokenResponse.refreshToken ?? "");
      recallUserData();
    }
  };

  const recallUserData = async () => {
    const { data: dataRefetch } = await refetch();

    if (dataRefetch?.userByEmail) {
      setName(dataRefetch.userByEmail.name);
      setSurname(dataRefetch.userByEmail.surname);
      setEmail(dataRefetch.userByEmail.email);
      if (dataRefetch.userByEmail.accounts) {
        if (dataRefetch.userByEmail.accounts[0].id) setSelectedAccountId(dataRefetch.userByEmail.accounts[0].id);
        setCurrency(dataRefetch.userByEmail.accounts[0].currency);
        setIncomeAmount(dataRefetch.userByEmail.accounts[0].incomeAmount);
        setExpenseAmount(dataRefetch.userByEmail.accounts[0].expenseAmount);
        setTransactions(dataRefetch.userByEmail.accounts[0].transactions);
        const incomeCategories = dataRefetch.userByEmail.accounts[0].categories
          .filter((category) => category.categoryType === OperationType.Income)
          .map((category) => ({
            id: category.id,
            name: category.name,
            categoryType: category.categoryType,
            subCategories: category.subCategories || [],
          }));
        setIncomeCategories(incomeCategories);
        const expenseCategories = dataRefetch.userByEmail.accounts[0].categories
          .filter((category) => category.categoryType === OperationType.Expense)
          .map((category) => ({
            id: category.id,
            name: category.name,
            categoryType: category.categoryType,
            subCategories: category.subCategories || [],
          }));
        setExpenseCategories(expenseCategories);
      }
    }
  };

  useEffect(() => {
    if (isError) {
      const errorCode = getGraphQLErrorCode(error);
      const tokenExist =
        sessionStorage.getItem("refreshToken") !== "" && sessionStorage.getItem("refreshToken") !== null;

      if (errorCode === NOT_AUTHORIZED_ERROR && tokenExist) {
        requireNewToken();
      } else {
        redirect("/login");
      }
    } else if (data?.userByEmail) {
      setName(data.userByEmail.name);
      setSurname(data.userByEmail.surname);
      setEmail(data.userByEmail.email);
      if (data.userByEmail.accounts) {
        if (data.userByEmail.accounts[0].id) setSelectedAccountId(data.userByEmail.accounts[0].id);
        setCurrency(data.userByEmail.accounts[0].currency);
        setIncomeAmount(data.userByEmail.accounts[0].incomeAmount);
        setExpenseAmount(data.userByEmail.accounts[0].expenseAmount);
        setTransactions(data.userByEmail.accounts[0].transactions);
        const incomeCategories = data.userByEmail.accounts[0].categories
          .filter((category) => category.categoryType === OperationType.Income)
          .map((category) => ({
            id: category.id,
            name: category.name,
            categoryType: category.categoryType,
            subCategories: category.subCategories || [],
          }));
        setIncomeCategories(incomeCategories);
        const expenseCategories = data.userByEmail.accounts[0].categories
          .filter((category) => category.categoryType === OperationType.Expense)
          .map((category) => ({
            id: category.id,
            name: category.name,
            categoryType: category.categoryType,
            subCategories: category.subCategories || [],
          }));
        setExpenseCategories(expenseCategories);
      }
    }
  }, [isError, error]);

  return (
    <>
      <aside
        className={`flex flex-col shadow-2xl border-gray border w-full h-full p-7 items-start justify-between rounded-xl mr-5`}
        style={{
          maxWidth: `${collapse ? 300 : 100}px`,
          transition: "ease-in-out .2s",
        }}
      >
        <Sidebar collapse={collapse} />
      </aside>

      <main className="relative flex w-full h-full border-gray border flex-col shadow-2xl rounded-xl">
        <Button className="absolute top-6 left-6" variant="outline" onClick={() => setCollapse(!collapse)}>
          <AlignJustify />
        </Button>
        <Navbar />
        <div className="ml-20 mt-5 mr-12">{children}</div>
      </main>
    </>
  );
};

export default MainContent;
