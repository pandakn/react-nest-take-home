import { FilterPosts } from "@/hooks/post/interface";
import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type OptionSort = {
  title: string;
  value: "ASC" | "DESC";
};

const options: OptionSort[] = [
  {
    title: "Newset",
    value: "DESC",
  },
  {
    title: "Oldset",
    value: "ASC",
  },
];

type SortButtonProps = {
  form: UseFormReturn<FilterPosts>;
};

const SortButton = ({ form }: SortButtonProps) => {
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="sortByPostedAt"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder="Sort by posted at..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </form>
    </Form>
  );
};

export default SortButton;
