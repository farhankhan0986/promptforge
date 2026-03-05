import { useState, useEffect } from "react";
import {
  Menu,
  MessageSquareMore,
  LayoutDashboard,
  Settings,
  LogOut,
  LogIn,
  Home,
  Sparkles,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/auth/login");
    } else {
      navigate("/auth/login");
    }
  };

  const navItems = [
    { path: "/", label: "Home", icon: <Home /> },
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { path: "/chats", label: "Chats", icon: <MessageSquareMore /> },
    { path: "/settings", label: "Settings", icon: <Settings /> },
  ];

  return (
    <>
      {/* Fixed Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-sidebar h-full text-white transition-all duration-300 flex flex-col z-50
          ${collapsed ? "w-16" : "w-64"}`}
      >
        <div className="flex items-center justify-center border-b border-primary/20 p-4">
          {/* Brand */}
          <div
            className={`flex items-center gap-3 flex-1 overflow-hidden transition-all duration-300
      ${collapsed ? "w-0 opacity-0" : "w-full opacity-100"}`}
          >
            <span className="text-xl font-bold tracking-wide whitespace-nowrap">
              Prompt<span className="text-primary">Forge</span>
            </span>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-primary/30 transition-colors shrink-0"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <Sparkles /> : <Menu />}
          </button>
        </div>

        <nav className="flex flex-col gap-4 mt-6 px-3 flex-1">
          {navItems.map(({ path, label, icon }) => (
            <div
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center ${
                collapsed ? "justify-start" : ""
              } gap-3 ${
                location.pathname === path
                  ? "bg-primary/60"
                  : "hover:bg-primary/40"
              } p-2 rounded cursor-pointer transition-colors`}
            >
              <div className="w-6 flex justify-center">{icon}</div>
              {!collapsed && <span>{label}</span>}
            </div>
          ))}
        </nav>

        <div
          onClick={handleAuthAction}
          className={`relative group flex items-center ${
            collapsed ? "justify-start" : ""
          } gap-3 hover:bg-primary/40 p-3 m-3 rounded cursor-pointer transition-colors`}
        >
          <div className="w-6 flex justify-center">
            {isLoggedIn ? <LogOut /> : <LogIn />}
          </div>

          {!collapsed && <span>{isLoggedIn ? "Logout" : "Login"}</span>}

          {collapsed && (
            <span className="absolute left-14 bg-textdark text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg">
              {isLoggedIn ? "Logout" : "Login"}
            </span>
          )}
        </div>
      </div>

      {/* Spacer to push main content */}
      <div
        className={`${collapsed ? "w-16" : "w-64"} shrink-0 transition-all duration-300`}
      />
    </>
  );
};

export default Sidebar;
