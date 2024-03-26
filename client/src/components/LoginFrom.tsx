import { useLogin } from "@/hooks/auth";
import { ILoginForm, LoginFormSchema } from "@/hooks/auth/interface";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginFrom = ({ className, ...props }: UserAuthFormProps) => {
  const navigate = useNavigate();
  const { mutateAsync, error } = useLogin();

  const form = useForm<ILoginForm>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = useCallback(
    async (data: ILoginForm) => {
      const { data: response } = await mutateAsync(data);

      if (response) {
        setTimeout(() => navigate("/"), 500);
      }
    },
    [mutateAsync, navigate],
  );

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type="password"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="min-w-full" type="submit">
              Login
            </Button>
          </div>
        </form>
      </Form>
      {error && (
        <div className="text-red-500">Invalid username or password</div>
      )}
    </div>
  );
};

export default LoginFrom;
