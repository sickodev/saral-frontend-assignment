import Sidebar from "@/components/shared/sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full relative">
      <Sidebar />
      {children}
    </main>
  );
};

export default MainLayout;
