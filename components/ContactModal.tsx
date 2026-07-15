"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useContact } from "../context/ContactContext";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ContactModal() {
  const { isOpen, closeContact } = useContact();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  // Lock Body Scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [closeContact]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);

        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });

        closeContact();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999]"
        >
          {/* Background */}
          <div
            onClick={closeContact}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.45,
              ease: "easeInOut",
            }}
            className="absolute right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl overflow-y-auto"
          >
            {/* Orange Line */}
            <div className="h-2 bg-orange-500" />

            {/* Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Contact Us
                </h2>

                <p className="text-slate-500 mt-2">
                  We'd love to hear from you.
                </p>
              </div>

              <button
                onClick={closeContact}
                className="w-11 h-11 rounded-full bg-slate-100 hover:bg-orange-500 hover:text-white transition"
              >
                <X className="w-6 h-6 mx-auto" />
              </button>
            </div>

            {/* Form */}

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border rounded-lg p-4 outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border rounded-lg p-4 outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border rounded-lg p-4 outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded-lg p-4 outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <textarea
                  rows={6}
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="border rounded-lg p-4 w-full outline-none resize-none focus:ring-2 focus:ring-orange-500"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}