import { useEffect, useState,lazy } from "react";
const Footer = lazy(() => import("./Footer/Footer")) ;
const ClientHeader = lazy(() => import("./Header")) ;

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
