import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import { ClientTheme, AdminTheme } from "./themes";
import "antd/dist/antd.css";
import ScrollToTop from "./ultils/ScrollToTop";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import Maintain from "./components/client/Maintain";
import { getConfigs } from "./redux/slice/webConfig";
function App() {
  const dispatch = useAppDispatch();
  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
  const isMaintain = webConfigs[0]?.isMaintaince;
  useEffect(() => {
    dispatch(getConfigs());
  }, [dispatch]);

  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout: any = ClientTheme;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Maintain isMaintain={isMaintain}>
                  <Layout>
                    <Page />
                  </Layout>
                </Maintain>
              }
            />
          );
        })}
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          let Layout: any = AdminTheme;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                // <PrivateRoute acceptRole={1}>
                <Layout>
                  <Page />
                </Layout>
                // </PrivateRoute>
              }
            />
          );
        })}
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
