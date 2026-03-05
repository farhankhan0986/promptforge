import API from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Settings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    created_at: "",
  });
  const [userLoading, setUserLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const fetchUser = async () => {
    try {
      setUserLoading(true);
      const { data } = await API.get("auth/me");
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setUserLoading(false);
    }
  };

  const deleteAllPrompts = async () => {
    if (!window.confirm("Are you sure you want to delete all your prompts?"))
      return;
    try {
      await API.delete("/prompts");
      alert("All prompts deleted successfully");
    } catch (error) {
      console.error("Error deleting prompts:", error);
      alert("Failed to delete prompts");
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      await API.delete("/auth/delete");
      localStorage.removeItem("token");
      alert("Account deleted successfully");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account");
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      return alert("New password and confirm password do not match");
    }

    try {
      await API.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location]); // Refetch user data when the location changes (e.g., after password change)

  return (
    <div className="flex-1 bg-background px-8 lg:px-16 py-12 overflow-auto animate-fade-in">
      {/* Page header */}
      <h1 className="text-editorial-lg text-textdark mb-2">Settings</h1>
      <div className="w-12 h-0.5 bg-primary mb-10" />

      {userLoading && (
        <p className="font-mono text-sm text-textdark/50 mb-6">Loading user settings...</p>
      )}

      <div className="max-w-lg space-y-12">
        {/* Account info section */}
        <section>
          <h2 className="font-display text-lg font-semibold text-textdark mb-1">
            Account
          </h2>
          <div className="w-8 h-px bg-primary mb-5" />

          <div className="space-y-3">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-textdark/50 uppercase tracking-wider w-20 shrink-0">
                Name
              </span>
              <span className="font-mono text-sm text-textdark">{user.name}</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-textdark/50 uppercase tracking-wider w-20 shrink-0">
                Email
              </span>
              <span className="font-mono text-sm text-textdark">{user.email}</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-textdark/50 uppercase tracking-wider w-20 shrink-0">
                Password
              </span>
              <span className="font-mono text-sm text-textdark/40">••••••••</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-textdark/50 uppercase tracking-wider w-20 shrink-0">
                Since
              </span>
              <span className="font-mono text-sm text-textdark">
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </section>

        {/* Change Password section */}
        <section>
          <h2 className="font-display text-lg font-semibold text-textdark mb-1">
            Change Password
          </h2>
          <div className="w-8 h-px bg-primary mb-5" />

          <div className="space-y-4">
            <div>
              <label className="font-mono text-xs text-textdark/50 uppercase tracking-wider block mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input-forge"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-textdark/50 uppercase tracking-wider block mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-forge"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-textdark/50 uppercase tracking-wider block mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-forge"
              />
            </div>

            <button onClick={changePassword} className="btn-primary w-full mt-2">
              <span className="font-mono text-xs">update password</span>
            </button>
          </div>
        </section>

        {/* Danger zone — destructive actions */}
        <section>
          <h2 className="font-display text-lg font-semibold text-textdark mb-1">
            Danger Zone
          </h2>
          <div className="w-8 h-px bg-primary mb-5" />

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-surface">
              <div>
                <p className="font-mono text-sm text-textdark">Delete All Prompts</p>
                <p className="font-mono text-xs text-textdark/40 mt-0.5">
                  This action cannot be undone
                </p>
              </div>
              <button onClick={deleteAllPrompts} className="btn-danger">
                <span className="font-mono text-xs">delete all</span>
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-mono text-sm text-textdark">Delete Account</p>
                <p className="font-mono text-xs text-textdark/40 mt-0.5">
                  Permanently remove your account and data
                </p>
              </div>
              <button onClick={deleteAccount} className="btn-danger">
                <span className="font-mono text-xs">delete account</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
