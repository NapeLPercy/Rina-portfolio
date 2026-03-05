import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import ContactCard from "../components/ui/ContactCard";
import { sendEmailSafe } from "../utils/sendEmailSafe";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

    const CONTACT_TEMPLATE = import.meta.env
    .VITE_EMAILJS_TEMPLATE_ID_CONTACT_ME;

  const inquiryOptions = [
    { value: "", label: "Select an inquiry type..." },
    { value: "freelance", label: "Freelance Project" },
    { value: "employ", label: "Employment Opportunity" },
    { value: "hello", label: "General Hello" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    // Check if at least one field is filled
    const hasContent = Object.values(formData).some((value) => value.trim() !== "");
    
    if (!hasContent) {
      setErrorMessage("Please fill in at least one field to send a message.");
      setStatus("error");
      return false;
    }

    // Validate email format if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("loading");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate random success/error for demo
      const res = await sendEmailSafe(formData,CONTACT_TEMPLATE);
      
      if (res.success) {
        setStatus("success");
        // Reset form after success
        setTimeout(() => {
          setFormData({ name: "", email: "", inquiry: "", message: "" });
          setStatus("idle");
        }, 3000);
      } else {
         setErrorMessage("Something went wrong. Please try again.");
        throw new Error("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative bg-gradient-to-br from-plum-50 via-cloud to-rose-50/30 py-12 sm:py-16 md:py-20 lg:py-32 overflow-x-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-plum-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-rose-200/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-rose-100 to-plum-100 border border-rose-200/60 shadow-sm">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />
            <span className="font-body text-xs sm:text-sm font-semibold bg-gradient-to-r from-rose-700 to-plum-700 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink px-4">
            Let's{" "}
            <span className="bg-gradient-to-r from-rose-500 to-plum-600 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-base sm:text-lg font-body text-ink/70 max-w-2xl mx-auto px-4">
            Have a project in mind or just want to say hello? Drop me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full">
          
          {/* Left: Contact Form */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_70px_rgba(0,0,0,0.12)] p-5 sm:p-6 md:p-8 lg:p-10 space-y-5 sm:space-y-6 w-full max-w-full">
            <div className="space-y-1 sm:space-y-2">
              <h3 className="font-heading text-xl sm:text-2xl text-ink">Send a Message</h3>
              <p className="font-body text-xs sm:text-sm text-ink/60">
                Fill in at least one field below to reach out
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name Input */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="font-body text-xs sm:text-sm font-medium text-ink/80">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  disabled={status === "loading"}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-ink placeholder:text-ink/40 focus:outline-none focus:border-plum-500 focus:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="font-body text-xs sm:text-sm font-medium text-ink/80">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled={status === "loading"}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-ink placeholder:text-ink/40 focus:outline-none focus:border-plum-500 focus:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Inquiry Type Select */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="font-body text-xs sm:text-sm font-medium text-ink/80">
                  Job Inquiry
                </label>
                <div className="relative">
                  <select
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-ink focus:outline-none focus:border-plum-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {inquiryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="font-body text-xs sm:text-sm font-medium text-ink/80">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  rows="4"
                  disabled={status === "loading"}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-plum-200/60 bg-plum-50/30 font-body text-ink placeholder:text-ink/40 focus:outline-none focus:border-plum-500 focus:bg-white transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Status Messages */}
              {status === "error" && (
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-rose-50 border-2 border-rose-200 animate-[shake_0.5s_ease-in-out]">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <p className="font-body text-xs sm:text-sm text-rose-700">{errorMessage}</p>
                </div>
              )}

              {status === "success" && (
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-green-50 border-2 border-green-200 animate-[fadeSlideIn_0.4s_ease-out]">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="font-body text-xs sm:text-sm text-green-700">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 sm:py-4 rounded-xl font-body text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-plum-600 to-rose-600 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {/* Button content */}
                <span className="relative flex items-center justify-center gap-2">
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      Send Message
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="space-y-4 sm:space-y-6 w-full max-w-full">
            {/* Contact Cards */}
            <ContactCard
              icon={<Mail className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Email"
              content="rinalekoloane@gmail.com"
              href="mailto:rinalekoloane@gmail.com"
              gradient="from-plum-500 to-plum-600"
              bgGradient="from-plum-50 to-plum-100/60"
            />

            <ContactCard
              icon={<Phone className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Phone"
              content="+27 (0) 84 810 3855"
              href="tel:+27848103855"
              gradient="from-rose-500 to-rose-600"
              bgGradient="from-rose-50 to-rose-100/60"
            />

            <ContactCard
              icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Location"
              content="Pretoria, South Africa"
              gradient="from-plum-500 to-rose-500"
              bgGradient="from-plum-50 to-rose-100/60"
            />

            {/* Additional Info Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-5 sm:p-6 md:p-8 space-y-3 sm:space-y-4 w-full max-w-full">
             <div className="space-y-2 font-body text-sm sm:text-base text-ink/70">
                <p className="flex justify-between gap-2">
                  <span>Monday - Sunday</span>
                  <span className="font-semibold text-rose-600">24/7</span>
                </p>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-plum-100">
                <p className="text-xs sm:text-sm text-ink/60">
                  Response time: <span className="font-semibold text-plum-600">Within 2 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </section>
  );
}
