import "./styles/globals.css";
import { MusicDataProvider } from "./context/MusicDataContext";

export const metadata = {
  title: "NhacCuaTui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <MusicDataProvider>
        <body>{children}</body>
      </MusicDataProvider>
    </html>
  );
}
