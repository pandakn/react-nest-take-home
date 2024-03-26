import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterPosts } from "@/hooks/post/interface";
import { UseFormReturn } from "react-hook-form";
import { Form, FormField, FormItem } from "./ui/form";

type SearchProps = {
  form: UseFormReturn<FilterPosts>;
  onSubmit: (data: FilterPosts) => void;
};

const Search = ({ form, onSubmit }: SearchProps) => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Form {...form}>
        <form
          className="flex items-center gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="searchKey"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Search title..."
                  {...field}
                  className="w-48 py-1"
                />
              </FormItem>
            )}
          />
          <Button type="submit" className="hover:cursor-pointer">
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Search;
