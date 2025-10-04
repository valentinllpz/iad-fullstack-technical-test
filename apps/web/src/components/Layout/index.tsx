import type { ReactNode } from "react";

import NavBar from "../NavBar";

import "./styles.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <NavBar />
      <main className="layout__content">{children}</main>
    </div>
  );
};

export default Layout;
