import LeftSideBar from "@/components/Shared/LeftSideBar";
import RightSideBar from "@/components/Shared/RightSideBar";
import NavBar from "@/components/Shared/Navbar/NavBar";
import { Toaster } from "@/components/ui/toaster";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative ">
      <NavBar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 ">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
