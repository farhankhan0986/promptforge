import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Main content area: full bleed, no max-width — content pages own their own padding */}
      <div className="flex-1 bg-background overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;