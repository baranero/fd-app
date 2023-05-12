import React, { ReactNode } from "react";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <>
        <Navbar/>
        <div>{props.children}</div>
    </>
)

export default Layout