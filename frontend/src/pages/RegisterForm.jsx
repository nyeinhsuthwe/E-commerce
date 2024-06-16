import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const registerFormSchema = z
    .object({
      name: z.string().min(1, { message: "This field has to be filled." }),
      email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
      password: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .min(6),
      passwordConfirmed: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .min(6),
    })
    .refine((values) => values.password === values.passwordConfirmed, {
      message: "Password does not match!",
      path: ["passwordConfirmed"],
    });

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmed: "",
    },
  });

  const onSubmit = async (values) => {
    await register.mutateAsync(values);

    navigate("/");
  };

  return (
    <div className="flex items-center h-screen px-8">
      <div className="w-full max-w-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 backdrop-blur-lg bg-white/10 shadow-lg px-8 pt-6 pb-8 rounded-3xl"
          >
            <h2 className="text-3xl mb-4 font-bold text-gray-600 ">Register</h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password Confirmed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Register"
              )}
            </Button>
            <p className="font-semibold text-xs text-gray-600 text-center">
              {" "}
              Already have an account?{" "}
              <Link className="font-bold" to="/login">
                Please log in!
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
