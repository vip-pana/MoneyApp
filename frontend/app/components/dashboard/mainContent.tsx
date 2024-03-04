"use client";

import { sessionStorageEmail } from "@/utils/queryUrl";
import { useUserStore } from "@/utils/zustand/userStore";
import { graphql } from "@/gql/generated";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UseUserByEmailQuery } from "@/utils/definitions/useQueryDefinition";
import { toast } from "sonner";
import Navbar from "../../ui/dasboard/base/navbar/navbar";
import Sidebar from "../../ui/dasboard/base/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";

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
