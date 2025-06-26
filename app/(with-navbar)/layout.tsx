import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/ืsidebar/sidebar";
import { SidebarProvider } from "@/hooks/SidebarContext";
import { DropdownProvider } from "@/hooks/DropdownContext";
import DropdownBackdrop from "@/components/blogheader/dropdownbackdrop";
import { ModalProvider } from "@/hooks/ModalContext";
import { DropdownModalProvider } from "@/hooks/DropdownModalContext";
import DropdownModalBackdrop from "@/components/modal/dropdownmodalbackdrop";
import Providers from "../provider";
import { DeleteModalProvider } from "@/hooks/DeleteModalContext";
import { CommentModalProvider } from "@/hooks/CommentModalContext";
import { PostFilterProvider } from "@/hooks/PostFilterContext";

export const metadata: Metadata = {
  title: "Board Website",
  description: "Board Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <DeleteModalProvider>
            <SidebarProvider>
              <DropdownProvider>
                <ModalProvider>
                  <CommentModalProvider>
                    <DropdownModalProvider>
                      <PostFilterProvider>
                        <Navbar />
                        <Sidebar />
                        <DropdownBackdrop />
                        <DropdownModalBackdrop />
                        <main className="container">
                          {children}
                        </main>
                      </PostFilterProvider>
                    </DropdownModalProvider>
                  </CommentModalProvider>
                </ModalProvider>
              </DropdownProvider>  
            </SidebarProvider>      
          </DeleteModalProvider>
        </Providers>
      </body>
    </html>
  );
}
