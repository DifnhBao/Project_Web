import { MusicDataProvider } from "./context/MusicDataContext";
import { ModalProvider } from "@/app/context/ModalContext";

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
        <ModalProvider>
          <body>{children}</body>
        </ModalProvider>
      </MusicDataProvider>
    </html>
  );
}
