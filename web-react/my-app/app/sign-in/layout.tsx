import "../styles/auth.css";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="auth-layout">{children}</body>
    </html>
  );
}
