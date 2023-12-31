import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./app.component.scss";

import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useUserProvider } from "@/shared/providers/user.provider";
import { useToastContext } from "@/shared/contexts/toast.context";
import { useUserContext } from "@/shared/contexts/user.context";
import { useEffect } from "react";

import Header from "@/shared/layout/header/header.component";
import Footer from "@/shared/layout/footer/footer.component";

function App() {
  const pattern = "/";
  const match = useMatch(pattern);
  const navigate = useNavigate();
  const location = useLocation();

  const { getLoggedInUser } = useUserProvider();
  const { user } = useUserContext();
  const { showToast } = useToastContext();

  useEffect(() => {
    if (location.state?._isRedirect && user.value) {
      getLoggedInUser().subscribe((_user) => (user.value = _user));
      showToast("You do not have permission to access that resource!", { severity: "error", duration: 2000 });
    }

    if (match) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
