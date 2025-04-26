import { create } from "zustand";

type SortType = "id" | "name";

type FilterStore = {
  search: string;
  sort: SortType;

  setSearch: (value: string) => void;
  setSort: (value: SortType) => void;
};

const useFilterStore = create<FilterStore>()((set) => ({
  search: "",
  sort: "id",

  setSearch: (value) => set(() => ({ search: value })),
  setSort: (value) => set(() => ({ sort: value })),
}));

export { useFilterStore, type SortType };
