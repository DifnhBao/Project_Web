import "@/app/styles/AdminPage/Dashboard.css";

import Sidebar from "@/app/components/AdminPage/ad-Sidebar";
import Header from "@/app/components/AdminPage/ad-Header";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className="main">
          <Header />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
