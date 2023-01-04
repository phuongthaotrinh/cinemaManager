import { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import ClientHeader from "./Header";

type ClientLayoutProps = {
  children: any;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setOffsetTop(window.scrollY);
    });
  }, []);
  return (
    <div className="bg-[#151f32] min-h-screen">
      <div className="">
        <ClientHeader />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
