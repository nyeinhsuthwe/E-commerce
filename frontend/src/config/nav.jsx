import { Home, LineChart, Package, ShoppingCart, User2 } from "lucide-react";

export const sideNav = [
  {
    name: "Dashboard",
    path: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "Orders",
    path: "/order",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    name: "Products",
    path: "/product",
    icon: <Package className="h-5 w-5" />,
  },
  {
    name: "Customers",
    path: "/customer",
    icon: <User2 className="h-5 w-5" />,
  },
  {
    name: "Analytics",
    path: "/analytic",
    icon: <LineChart className="h-5 w-5" />,
  },
];
