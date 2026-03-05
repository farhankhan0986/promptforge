import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-[#FFFFE3] ">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;