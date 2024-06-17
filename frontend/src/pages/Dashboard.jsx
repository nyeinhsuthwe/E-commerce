import Header from "@/components/Header";
import SideNav from "@/components/SideNav";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNav />
      <Header />
    </div>
  );
}
