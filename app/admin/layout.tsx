import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Admin Panel | Savvy Group",
  description: "Manage Savvy Group website enquiries and subscribers.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  <body>
    {children}

    <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
            duration: 3000,
            style: {
                borderRadius: "14px",
                background: "#fff",
                color: "#111",
                boxShadow:
                    "0 10px 40px rgba(0,0,0,.12)",
            },
        }}
    />
</body>
  return children;
}


