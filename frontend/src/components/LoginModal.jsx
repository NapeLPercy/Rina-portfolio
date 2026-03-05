//helloefghjk
import { useState } from "react";
import { X, Lock, User, Mail, Key, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { sendEmailSafe } from "../utils/sendEmailSafe";

export default function LoginModal() {
  const [step, setStep] = useState("login"); // login, forgotPassword, verifyCode, resetPassword, success
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    code: "",
    newPassword: "",
    newUsername: "",
  });
  const [loading, setLoading] = useState({
    login: false,
    sendCode: false,
    verifyCode: false,
    resetCredentials: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const BASE_APP_API = import.meta.env.VITE_BASE_APP_API;
  const OTP_TEMPLATE = import.meta.env
    .VITE_EMAILJS_TEMPLATE_ID_RESET_CREDENTIALS;

  const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
        {message}
      </div>
    );
  };

  if (!isOpen) return null;

  const handleModalClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading((prev) => ({ ...prev, login: true }));

    try {
      const response = await axios.post(`${BASE_APP_API}/auth/login`, {
        username: formData.username,
        password: formData.password,
      });

      // Assuming backend returns:
      // { user: {...}, token: "jwt_token_here" }

      const { user, token } = response.data;

      // Save user in context (which saves to sessionStorage)
      setUser({ ...user, token });

      handleModalClose();
      navigate("/dashboard");

      // close modal or redirect
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading((prev) => ({ ...prev, login: false }));
    }
  };

  // send save code in the db and send it to user email
  const handleSendCode = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading((prev) => ({ ...prev, sendCode: true }));

    try {
      const response = await axios.post(`${BASE_APP_API}/auth/send-code`, {
        email: formData.email,
      });

      const { success, message, code } = response.data;

      if (success) {

        const sendMessageOutput = await sendEmailSafe(
          { code: code, email: "lmankoe105@gmail.com" },
          OTP_TEMPLATE,
        );

        if (!sendMessageOutput.success) {
          setErrorMessage("Email not send, try again later");
          return;
        }
        setStep("verifyCode");
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong while sending code.",
      );
    } finally {
      setLoading((prev) => ({ ...prev, sendCode: false }));
    }
  };

  // save new password and username in the database
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Password validation
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(
        formData.newPassword,
      )
    ) {
      setErrorMessage(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      );
      return;
    }

    // Username validation
    if (formData.newUsername.length < 5) {
      setErrorMessage("Username must be at least 5 characters");
      return;
    }

    setLoading((prev) => ({ ...prev, resetCredentials: true }));

    try {
      const response = await axios.post(`${BASE_APP_API}/auth/reset-password`, {
        email: formData.email,
        newPassword: formData.newPassword,
        newUsername: formData.newUsername,
      });

      const { success, message } = response.data;

      if (success) {
        setStep("success");
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setErrorMessage(
        error.response?.data?.message || "Password reset failed.",
      );
    } finally {
      setLoading((prev) => ({ ...prev, resetCredentials: false }));
    }
  };

  // get code and email from db to compare with the session email and inserted code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading((prev) => ({ ...prev, verifyCode: true }));

    try {
      const response = await axios.post(`${BASE_APP_API}/auth/verify-code`, {
        email: formData.email,
        code: formData.code,
      });

      const { success, message } = response.data;

      if (success) {
        setStep("resetPassword");
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      console.error("Verify code error:", error);
      setErrorMessage(error.response?.data?.message || "Verification failed.");
    } finally {
      setLoading((prev) => ({ ...prev, verifyCode: false }));
    }
  };

  const resetModal = () => {
    setStep("login");
    setErrorMessage("");
    setLoading({
      login: false,
      sendCode: false,
      verifyCode: false,
      resetCredentials: false,
    });
    setFormData({
      username: "",
      password: "",
      email: "",
      code: "",
      newPassword: "",
      newUsername: "",
    });
   // handleModalClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out]"
        onClick={handleModalClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-white rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.25)] w-full max-w-md pointer-events-auto overflow-hidden animate-[scaleIn_0.4s_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative gradient header */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-plum-500 to-rose-500" />

          {/* Close button */}
          <button
            onClick={handleModalClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-ink/50 hover:text-ink hover:bg-plum-50 transition-all duration-300 hover:rotate-90 z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-8 pt-10">
            {/* Login Step */}
            {step === "login" && (
              <div className="space-y-6 animate-[fadeSlideIn_0.4s_ease-out]">
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-plum-500 to-rose-500 shadow-lg mb-2">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-heading text-3xl text-ink">
                    Welcome Back
                  </h2>
                  <p className="font-body text-ink/60">
                    Sign in to your account
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <ErrorMessage message={errorMessage} />
                  {/* Username Input */}
                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-ink/80">
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-ink placeholder:text-ink/40 focus:outline-none focus:border-plum-500 focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-ink/80">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-ink placeholder:text-ink/40 focus:outline-none focus:border-plum-500 focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setStep("forgotPassword")}
                      className="font-body text-sm font-medium bg-gradient-to-r from-rose-600 to-plum-600 bg-clip-text text-transparent hover:from-rose-700 hover:to-plum-700 transition-all duration-300"
                    >
                      Forgot password or username?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading.login}
                    className="w-full py-4 rounded-xl font-body font-semibold text-white bg-gradient-to-r from-plum-600 to-rose-600 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative">
                      {loading.login ? "Signing In..." : "Sign In"}
                    </span>
                  </button>
                </form>
              </div>
            )}

            {/* Forgot Password Step */}
            {step === "forgotPassword" && (
              <div className="space-y-6 animate-[fadeSlideIn_0.4s_ease-out]">
                {/* Back button */}
                <button
                  onClick={() => setStep("login")}
                  className="inline-flex items-center gap-2 text-ink/60 hover:text-ink font-body text-sm transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </button>

                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-plum-500 shadow-lg mb-2">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-heading text-3xl text-ink">
                    Reset Account
                  </h2>
                  <p className="font-body text-ink/60">
                    Enter your email to receive a verification code
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSendCode} className="space-y-4">
                  <ErrorMessage message={errorMessage} />
                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-ink/80">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-rose-200/60 bg-rose-50/30 font-body text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading.sendCode}
                    className="w-full py-4 rounded-xl font-body font-semibold text-white bg-gradient-to-r from-rose-600 to-plum-600 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative">
                      {loading.sendCode
                        ? "Sending..."
                        : "Send Verification Code"}
                    </span>
                  </button>
                </form>
              </div>
            )}

            {/* Verify Code Step */}
            {step === "verifyCode" && (
              <div className="space-y-6 animate-[fadeSlideIn_0.4s_ease-out]">
                {/* Back button */}
                <button
                  onClick={() => setStep("forgotPassword")}
                  className="inline-flex items-center gap-2 text-ink/60 hover:text-ink font-body text-sm transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-plum-500 to-rose-500 shadow-lg mb-2">
                    <Key className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-heading text-3xl text-ink">Enter Code</h2>
                  <p className="font-body text-ink/60">
                    We sent a verification code to{" "}
                    <span className="font-semibold text-rose-600">
                      {formData.email}
                    </span>
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <ErrorMessage message={errorMessage} />
                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-ink/80">
                      Verification Code
                    </label>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                      <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        placeholder="Enter 6-digit code"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-ink placeholder:text-ink/40 focus:outline-none focus:border-plum-500 focus:bg-white transition-all duration-300 tracking-widest text-center text-lg font-semibold"
                        maxLength="6"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading.verifyCode}
                    className="w-full py-4 rounded-xl font-body font-semibold text-white bg-gradient-to-r from-plum-600 to-rose-600 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative">
                      {loading.verifyCode ? "Verifying..." : "Verify Code"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("forgotPassword")}
                    className="w-full text-center font-body text-sm text-ink/60 hover:text-rose-600 transition-colors duration-300"
                  >
                    Didn't receive the code? Resend
                  </button>
                </form>
              </div>
            )}

            {/* Reset Password Step */}
            {step === "resetPassword" && (
              <div className="space-y-6 animate-[fadeSlideIn_0.4s_ease-out]">
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-plum-500 shadow-lg mb-2">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-heading text-3xl text-ink">
                    Create New Credentials
                  </h2>
                  <p className="font-body text-ink/60">
                    Set your new username and password
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <ErrorMessage message={errorMessage} />
                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-ink/80">
                      New Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                      <input
                        type="text"
                        name="newUsername"
                        value={formData.newUsername}
                        onChange={handleInputChange}
                        placeholder="Choose a username"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-rose-200/60 bg-rose-50/30 font-body text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-sm font-medium text-ink/80">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Create a strong password"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-rose-200/60 bg-rose-50/30 font-body text-ink placeholder:text-ink/40 focus:outline-none focus:border-rose-500 focus:bg-white transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading.resetCredentials}
                    className="w-full py-4 rounded-xl font-body font-semibold text-white bg-gradient-to-r from-rose-600 to-plum-600 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative">
                      {loading.resetCredentials
                        ? "Updating..."
                        : "Reset Credentials"}
                    </span>
                  </button>
                </form>
              </div>
            )}

            {/* Success Step */}
            {step === "success" && (
              <div className="space-y-6 text-center animate-[fadeSlideIn_0.4s_ease-out]">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 shadow-lg animate-[scaleIn_0.5s_ease-out]">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>

                <div className="space-y-2">
                  <h2 className="font-heading text-3xl text-ink">All Set!</h2>
                  <p className="font-body text-ink/60">
                    Your credentials have been successfully updated
                  </p>
                </div>

                <button
                  onClick={resetModal}
                  className="w-full py-4 rounded-xl font-body font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
