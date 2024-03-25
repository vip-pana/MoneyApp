import { Category } from "@/gql/graphql";
import { create } from "zustand";

type CategoryTable = {
  categoriesFiltered: Category[];
  setCategoriesFiltered: (filtered: Category[]) => void;
};

export const useCategoryTableStore = create<CategoryTable>((set) => ({
  categoriesFiltered: [],
  setCategoriesFiltered: (filtered: Category[]) => set((state) => ({ categoriesFiltered: filtered })),
}));
