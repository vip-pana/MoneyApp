"use client";

import { sessionStorageEmail } from "@/utils/queryUrl";
import { useUserStore } from "@/utils/zustand/userStore";
import { graphql } from "@/gql/generated";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UseUserByEmailQuery, UseRefreshTokenMutation } from "@/utils/definitions/useQueryDefinition";
import Navbar from "../../ui/dasboard/base/navbar/navbar";
import Sidebar from "../../ui/dasboard/base/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import { UserByEmailQuery } from "@/gql/generated/graphql";
import { useAccessTokenStore } from "@/utils/zustand/accessTokenStore";
import {
  NOT_AUTHORIZED_ERROR,
  getGraphQLErrorCode,
  getGraphQLErrorMessage,
  getTokenExpiredErrorMessage,
  manageApiCallErrors,
} from "@/utils/errorUtils";
import { toast } from "sonner";

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
          subCategory {
            id
            categoryType
            name
          }
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

const MainContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {
    setName,
    setSurname,
    setUserEmail: setEmail,
    setCurrency,
    setIncomeCategories,
    setExpenseCategories,
    setIncomeAmount,
    setExpenseAmount,
    setTransactions,
    setSelectedAccountId,
  } = useUserStore();
  const { setHeaders, headers } = useAccessTokenStore();

  const [collapse, setCollapse] = useState(false);

  const { isError, error, data, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: () => UseUserByEmailQuery(sessionStorage.getItem(sessionStorageEmail) ?? "", headers),
    retry: 0,
  });

  const { refetch: refetchToken } = useQuery({
    queryKey: ["refreshToken"],
    queryFn: () => UseRefreshTokenMutation({ refreshToken: sessionStorage.getItem("refreshToken") ?? "" }),
    enabled: false,
    retry: 1,
  });

  const requireNewToken = async () => {
    const { data: refreshTokenData, isError: isRefreshTokenError, error } = await refetchToken();
    if (isRefreshTokenError) {
      manageApiCallErrors(error, refreshTokenData?.refreshToken.errors);
      redirect("/login");
    } else if (refreshTokenData?.refreshToken?.tokenResponse?.accessToken) {
      setHeaders(refreshTokenData.refreshToken.tokenResponse.accessToken);
      sessionStorage.setItem("refreshToken", refreshTokenData.refreshToken.tokenResponse.refreshToken ?? "");
      recallUserData();
    }
  };

  const setAllUserData = (data: UserByEmailQuery) => {
    setName(data.userByEmail.name);
    setSurname(data.userByEmail.surname);
    setEmail(data.userByEmail.email);
    if (data.userByEmail.accounts) {
      if (data.userByEmail.accounts[0].id) setSelectedAccountId(data.userByEmail.accounts[0].id);
      setCurrency(data.userByEmail.accounts[0].currency);
      setIncomeAmount(data.userByEmail.accounts[0].incomeAmount);
      setExpenseAmount(data.userByEmail.accounts[0].expenseAmount);
      setTransactions(data.userByEmail.accounts[0].transactions);
      setIncomeCategories(data.userByEmail.accounts[0].categories);
      setExpenseCategories(data.userByEmail.accounts[0].categories);
    }
  };

  const recallUserData = async () => {
    const { data: userData } = await refetch();
    if (userData?.userByEmail) {
      setAllUserData(userData);
    }
  };

  useEffect(() => {
    if (isError) {
      const errorMsg = getTokenExpiredErrorMessage(error);
      const tokenExist = sessionStorage.getItem("refreshToken") !== null;
      if (errorMsg && tokenExist) {
        requireNewToken();
      } else {
        toast.error("Session Expired", { description: "Please login." });
        redirect("/login");
      }
    } else if (data?.userByEmail) {
      setAllUserData(data);
    }
  }, [isError, error]);

  return (
    <>
      <Sidebar collapse={collapse} />
      <main className="relative flex w-full h-full border-gray border flex-col shadow-2xl rounded-xl">
        <Button
          className="absolute top-6 left-6"
          size={"icon"}
          variant="outline"
          onClick={() => setCollapse(!collapse)}
        >
          <AlignJustify className="h-6 w-6" />
        </Button>
        <Navbar />
        <div className="ml-20 mt-5 mr-12">{children}</div>
      </main>
    </>
  );
};

export default MainContent;
