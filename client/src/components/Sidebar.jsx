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
  const [collapsed, setCollapsed] = useState(true);
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
    { path: "/", label: "Home", icon: <Home size={18} /> },
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/chats", label: "Chats", icon: <MessageSquareMore size={18} /> },
    { path: "/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <>
      {/* Thin command-rail sidebar — intentionally narrow, not a heavy panel */}
      <div
        className={`fixed top-0 left-0 bg-sidebar h-full text-white
          transition-all duration-300 flex flex-col z-50
          ${collapsed ? "w-14" : "w-52"}`}
      >
        {/* Brand header */}
        <div className="flex items-center border-b border-white/10 px-3 py-4">
          <div
            className={`flex items-center gap-2 flex-1 overflow-hidden transition-all duration-300
              ${collapsed ? "w-0 opacity-0" : "w-full opacity-100"}`}
          >
            {/* Brand in display font — the only decorative element in the sidebar */}
            <span className="font-display text-lg font-bold tracking-tight whitespace-nowrap">
              Prompt<span className="text-primary">Forge</span>
            </span>
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 hover:bg-white/10 transition-colors duration-200 shrink-0"
            style={{ borderRadius: "2px" }}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <Sparkles size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation — monospaced labels for that terminal feel */}
        <nav className="flex flex-col gap-1 mt-4 px-2 flex-1">
          {navItems.map(({ path, label, icon }) => {
            const isActive = location.pathname === path;
            return (
              <div
                key={path}
                onClick={() => navigate(path)}
                className={`flex items-center gap-3 px-2.5 py-2 cursor-pointer
                  font-mono text-xs tracking-wide uppercase
                  transition-all duration-200
                  ${isActive
                    ? "bg-primary/40 text-white border-l-2 border-primary"
                    : "text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                  }`}
                style={{ borderRadius: "0 2px 2px 0" }}
              >
                <div className="w-5 flex justify-center shrink-0">{icon}</div>
                {!collapsed && <span>{label}</span>}
              </div>
            );
          })}
        </nav>

        {/* Auth action — bottom of sidebar */}
        <div
          onClick={handleAuthAction}
          className={`relative group flex items-center gap-3
            font-mono text-xs tracking-wide uppercase
            text-white/60 hover:text-white hover:bg-white/5
            px-2.5 py-3 mx-2 mb-3 cursor-pointer
            transition-all duration-200 border-l-2 border-transparent`}
          style={{ borderRadius: "0 2px 2px 0" }}
        >
          <div className="w-5 flex justify-center shrink-0">
            {isLoggedIn ? <LogOut size={18} /> : <LogIn size={18} />}
          </div>

          {!collapsed && <span>{isLoggedIn ? "Logout" : "Login"}</span>}

          {/* Tooltip on collapsed state */}
          {collapsed && (
            <span
              className="absolute left-12 bg-sidebar text-white text-xs font-mono
                px-2 py-1 opacity-0 group-hover:opacity-100
                whitespace-nowrap transition-opacity duration-200 z-50"
              style={{ borderRadius: "2px" }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </span>
          )}
        </div>
      </div>

      {/* Spacer — matches sidebar width to push main content */}
      <div
        className={`${collapsed ? "w-14" : "w-52"} shrink-0 transition-all duration-300`}
      />
    </>
  );
};

export default Sidebar;
