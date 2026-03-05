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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const fetchUser = async () => {
    try {
      const { data } = await API.get("auth/me");
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
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
    <div>
      <div className="flex-1 bg-[#FFFFE3] p-8 overflow-auto">
        {user ? (
          <div className="bg-[#CBCBCB] p-4 rounded shadow mb-8 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">User Settings</h2>
          </div>
        ) : (
          <p>Loading user settings...</p>
        )}

        <div className="bg-[#CBCBCB] p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-3 text-[#4A4A4A]">Account</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <div className="flex gap-2 ">
            Password:<p className="text-[#4A4A4A] relative top-1"> ******** </p>
          </div>
          <p>Member since: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="bg-[#CBCBCB] p-4 ml-8 rounded shadow mb-8 w-[300px]">
        <h2 className="text-xl font-semibold mb-3 text-[#4A4A4A]">
          Change Password
        </h2>

        <label>Current Password</label>
        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-2.5 my-2.5 rounded-md border border-primary bg-background text-textdark placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <label>New Password</label>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2.5 my-2.5 rounded-md border border-primary bg-background text-textdark placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <label>Confirm New Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2.5 my-2.5 rounded-md border border-primary bg-background text-textdark placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={changePassword}
          className="w-full p-2.5 mt-2.5 rounded-md border-none bg-primary hover:bg-sidebar text-white cursor-pointer transition-colors font-medium"
        >
          Update Password
        </button>
      </div>

      <div className="bg-[#CBCBCB] p-4 ml-8 rounded shadow mb-8 w-[300px]">
        <h2 className="text-xl font-semibold mb-3 text-[#4A4A4A]">
          Delete All Prompts
        </h2>
        <button
          onClick={deleteAllPrompts}
          className="w-full p-2.5 mt-2.5 rounded-md border-none bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-colors font-medium"
        >
          Delete All Prompts
        </button>
      </div>
      <div className="bg-[#CBCBCB] p-4 ml-8 rounded shadow mb-8 w-[300px]">
        <h2 className="text-xl font-semibold mb-3 text-[#4A4A4A]">
          Delete Account
        </h2>
        <button
          onClick={deleteAccount}
          className="w-full p-2.5 mt-2.5 rounded-md border-none bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-colors font-medium"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
