import React, {startTransition, useEffect, useState} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {ICategory} from "@/lib/database/models/category.model";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Input} from "../ui/input";
import {createCategory, getAllCategories} from "@/lib/actions/category.action";

type Props = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({value, onChangeHandler}: Props) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    createCategory({categoryName: newCategory.trim()}).then((category) => {
      setCategories((prev) => [...prev, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAllCategories();
      categories && setCategories(categories as ICategory[]);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Choose category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((item) => (
            <SelectItem
              key={item._id}
              value={item._id}
              className="select-item p-regular-14"
            >
              {item.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-md py-3 pl-4 font-semibold bg-primary text-white">
            + Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Add New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Enter category name"
                  className="input-field my-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
