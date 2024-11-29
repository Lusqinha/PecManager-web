import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toolbar } from "@/components/Toolbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <title>Pecmanager Web</title>
      </head>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="theme"
          disableTransitionOnChange
        >
            <SidebarProvider>
                <Toolbar />
                <SidebarTrigger />
              <main className="w-full">
                {children}
              </main>
            </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
