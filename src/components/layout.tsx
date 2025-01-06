import type { PropsWithChildren } from "react";
import Header from "./header";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
     
        <Header/>
   
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 text-center text-gray-200">
        <p>
  <span
    className="text-blue-400 cursor-pointer"
    onClick={() => {
      window.location.href = "https://ajay-lobo.github.io/Portfolio/";
    }}
  >
    @Ajay
  </span>{" "}
  © {new Date().getFullYear()}
</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
