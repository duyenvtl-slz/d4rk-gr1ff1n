import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./app.component.scss";

import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useUserContext, useUserProvider } from "../../shared/providers/user.provider";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useToastContext } from "../../shared/providers/toast.provider";
import { useEffect } from "react";
import { forkJoin } from "rxjs";

import Header from "../../shared/layout/header/header.component";
import Footer from "../../shared/layout/footer/footer.component";

function App() {
  const pattern = "/";
  const match = useMatch(pattern);
  const navigate = useNavigate();
  const location = useLocation();

  const { getPermissionList, getRoleList } = useUserProvider();
  const { user } = useUserContext();
  const { showToast } = useToastContext();

  useEffect(() => {
    if (location.state?._isRedirect && user.value) {
      forkJoin([getPermissionList(), getRoleList()]).subscribe(
        ([permissions, roles]) => {
          user.value = user.value?.withMutations((_user) =>
            _user.set("permissions", permissions).set("roles", roles)
          );
        }
      );

      showToast("You do not have permission to access that resource!", { severity: "error", duration: 2000 });
    }

    if (match) {
      navigate("/home");
    }
  }, [location]);

  return (
    <div id="content-wrapper" className="app-wrapper bg-[#f1f1f1] min-h-screen">
      <div id="header-container" className="w-full shadow-md z-10 shadow-slate-500/30 ">
        <Header />
      </div>
      <OverlayScrollbarsComponent defer id="content">
        <div className="w-full flex flex-col items-center h-full">
          <div id="container" className="container bg-white p-3.5 min-h-full h-full">
            <Outlet />
          </div>
          <Footer />
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
}

export default App;
