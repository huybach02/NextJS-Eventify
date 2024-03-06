"use client";

import React, {useEffect, useState} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {formUrlQuery, removeKeysFromQuery} from "@/lib/utils";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import {getAllCategories} from "@/lib/actions/category.action";
import {ICategory} from "@/lib/database/models/category.model";

type Props = {};

const CategoryFilter = (props: Props) => {
  const router = useRouter();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();

  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
        pageOne: true,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, {scroll: false});
  };

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAllCategories();
      categories && setCategories(categories as ICategory[]);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field z-50">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent className="z-50">
        <SelectItem value="All">All</SelectItem>
        {categories.map((category) => (
          <SelectItem
            value={category.name}
            key={category._id}
            className="select-item p-regular-14 z-50"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
