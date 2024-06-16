import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./providers/AuthProviders";
import { router } from "./routes/routes";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
const queryClient = new QueryClient();

export default function App() {
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </QueryClientProvider>
    </TooltipProvider>
  );
}
