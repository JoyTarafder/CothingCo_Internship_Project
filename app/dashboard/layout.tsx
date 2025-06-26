import DashboardLayout from "@/components/DashboardLayout";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return <DashboardLayout title="Dashboard">{children}</DashboardLayout>;
}
