import SidebarNav from "./SidebarNav";

export default function PageLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <main className="flex-1 ml-0 md:ml-[60px] overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
