import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ROUTES } from "@/app/constants";
import { useAuth } from "@/hooks/useAuth";
import { ButtonSpinner } from "@/components/ui/spinner";
import { getErrorMessage } from "@/utils/helpers";

// Social Icons Components
const GoogleIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, status, googleLogin } = useAuth();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
        general: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      general: "",
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", general: "" });

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
      // Navigation handled by useAuth hook
    } catch (error) {
      // Extract error message - handle both string and object errors
      const errorMessage = getErrorMessage(error, "Login failed. Please try again.");
      const lowerError = errorMessage.toLowerCase();

      // Check for password-related errors
      if (
        lowerError.includes("password") ||
        lowerError.includes("incorrect") ||
        lowerError.includes("wrong password") ||
        lowerError.includes("invalid password")
      ) {
        setErrors({
          email: "",
          password: "Password is incorrect. Please try again.",
          general: "",
        });
      }
      // Check for account not found errors
      else if (
        lowerError.includes("not found") ||
        lowerError.includes("account not found") ||
        lowerError.includes("email not found") ||
        lowerError.includes("user not found") ||
        lowerError.includes("please register")
      ) {
        setErrors({
          email: "Account not found. Please check your email or sign up.",
          password: "",
          general: "",
        });
      }
      // Check for invalid credentials (general)
      else if (
        lowerError.includes("invalid") ||
        lowerError.includes("unauthorized")
      ) {
        setErrors({
          email: "",
          password: "Invalid email or password. Please try again.",
          general: "",
        });
      }
      // Other errors show in general box
      else {
        setErrors({
          email: "",
          password: "",
          general: errorMessage,
        });
      }
    }
  };

  const handleSocialLogin = async (provider) => {
    if (provider === "Google") {
      try {
        await googleLogin();
      } catch (error) {
        setErrors({
          email: "",
          password: "",
          general: error.message || "Google sign-in failed. Please try again.",
        });
      }
    } else {
      console.log(`Social login with ${provider} not yet implemented`);
    }
  };

  const isLoading = status === "loading";

  return (
    <div className="min-h-screen w-full relative bg-[#f7f9fc] flex flex-col font-sans overflow-x-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-tr from-[#635bff] via-[#ff7067] to-[#ffc800] transform -skew-y-6 origin-top-left scale-110 translate-y-[-100px]"></div>
      </div>

      {/* Logo - Top Left */}
      <div className="absolute top-6 left-44 z-20">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Xperty</h1>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-12 sm:pt-20 px-4">
        {/* Logo */}
        {/* <div className="mb-12">
          <h1 className="text-3xl font-bold text-white tracking-tight">Xpery</h1>
        </div> */}

        {/* Card */}
        <div className="w-full max-w-[550px] bg-white rounded-lg shadow-[0_15px_35px_rgba(50,50,93,0.1),0_5px_15px_rgba(0,0,0,0.07)] ">
          <div className="p-8 sm:p-12">
          <h2 className="text-2xl font-semibold text-[#1a1f36] mb-6">Sign in to your account</h2>

          {/* General Error Message */}
          {errors.general && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-md text-sm text-red-600">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-[#3c4257]">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`h-10 border-[#e3e8ee] focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff] transition-all shadow-sm ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-sm font-medium text-[#3c4257]">Password</Label>
                <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm text-[#635bff] hover:text-[#0a2540] transition-colors">Forgot your password?</Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`h-10 border-[#e3e8ee] focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff] transition-all shadow-sm pr-10 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-primary focus:outline-none disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-[#e3e8ee] data-[state=checked]:bg-[#635bff] data-[state=checked]:border-[#635bff]" />
              <label htmlFor="remember" className="text-sm text-[#3c4257] cursor-pointer select-none">Remember me on this device</label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-[#635bff] text-white font-medium transition-all shadow-sm"
            >
              {isLoading ? (
                <>
                  <ButtonSpinner className="mr-2" />
                  Signing In...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#e3e8ee]"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#697386]">Or</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
              className="w-full h-10 border-[#e3e8ee] text-[#3c4257] hover:bg-[#f7f9fc] font-medium justify-center gap-2 shadow-sm"
            >
              <GoogleIcon /> Sign in with Google
            </Button>
            <Button
              variant="outline"
              disabled={isLoading}
              className="w-full h-10 border-[#e3e8ee] text-[#3c4257] hover:bg-[#f7f9fc] font-medium justify-center gap-2 shadow-sm"
            >
              Sign in with passkey
            </Button>
            <Button
              variant="outline"
              disabled={isLoading}
              className="w-full h-10 border-[#e3e8ee] text-[#3c4257] hover:bg-[#f7f9fc] font-medium justify-center gap-2 shadow-sm"
            >
              Sign in with SSO
            </Button>
           
          </div>
         
        </div>
        <div className="text-sm text-[#3c4257] bg-[#f7f9fc] py-4 w-full text-center">
          New to Xperty? <Link to={ROUTES.REGISTER} className="text-[#635bff] hover:text-[#0a2540]">Create account</Link>
        </div>
        </div>
         

        {/* Footer Link */}
        
      </div>

      {/* Bottom Footer */}
      <div className="mt-auto pb-6 pl-44 text-sm text-[#697386] flex gap-4 z-10 mt-12">
        <span>© Xperty</span>
        <Link to="#" className="hover:text-[#3c4257]">Privacy & terms</Link>
      </div>
    </div>
  );
};
