/* eslint-disable react-refresh/only-export-components */
import { Navigate, RouteObject } from "react-router-dom";
import { lazy } from "react";

// Routes
import { routes as commissionRoutes } from "./commission/commission.routing";

// Guards
import authGuard from "@/shared/guards/auth.guard.ts";

// Eager components
import Landing from "./home/landing.component.tsx";

// Lazy components
const Commission = lazy(() => import("./commission/commission.component"));
const Profile = lazy(() => import("./profile/profile.component"));

export const routes: RouteObject[] = [
  {
    path: "home",
    element: <Landing />,
  },
  {
    path: ":username",
    element: <Profile />
  },
  {
    path: "commission",
    element: <Commission />,
    children: commissionRoutes,
    loader: authGuard,
  },
  { path: "*", element: <Navigate to="home" relative="route" /> },
];
