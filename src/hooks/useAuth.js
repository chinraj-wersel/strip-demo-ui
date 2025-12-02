import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCredentials,
  setCredentials,
} from "../features/auth/slices/authSlice.js";
import { ROUTES } from "../app/constants.js";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  // Dummy login - accepts any email/password
  const handleLogin = async (email, password) => {
    // Simulate a small delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create dummy user data
    const dummyUser = {
      id: 1,
      email: email,
      first_name: "Demo",
      last_name: "User",
      role: "admin",
      roles: ["admin"],
      permissions: ["read", "write", "delete", "manage"],
      tenant_id: "demo-tenant",
      profile_url: null,
    };
    
    // Set credentials in Redux store
    dispatch(setCredentials({
      user: dummyUser,
      accessToken: "dummy-access-token-12345",
    }));
    
    navigate(ROUTES.DASHBOARD);
  };

  // Dummy signup - accepts any email/password
  const handleSignup = async (email, password) => {
    // Simulate a small delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Navigate to login after "successful" signup
    navigate(ROUTES.SIGNIN);
  };

  const handleLogout = async () => {
    dispatch(clearCredentials());
    navigate(ROUTES.SIGNIN);
  };

  const handleRefreshToken = async () => {
    // Dummy refresh - always return true
    return true;
  };

  const refreshUser = async () => {
    // Dummy refresh user - do nothing
    console.log("Dummy refresh user called");
  };

  // Dummy Google login - directly logs in
  const handleGoogleLogin = async () => {
    // Simulate a small delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create dummy Google user
    const dummyUser = {
      id: 1,
      email: "demo@gmail.com",
      first_name: "Google",
      last_name: "User",
      role: "admin",
      roles: ["admin"],
      permissions: ["read", "write", "delete", "manage"],
      tenant_id: "demo-tenant",
      profile_url: null,
    };
    
    dispatch(setCredentials({
      user: dummyUser,
      accessToken: "dummy-google-token-12345",
    }));
    
    navigate(ROUTES.DASHBOARD);
  };

  const handleGoogleCallback = async (tokenData) => {
    // Dummy callback - just navigate to dashboard
    navigate(ROUTES.DASHBOARD);
  };

  return {
    ...auth,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    refreshToken: handleRefreshToken,
    refreshUser,
    googleLogin: handleGoogleLogin,
    googleCallback: handleGoogleCallback,
  };
};

