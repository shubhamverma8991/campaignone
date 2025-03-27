import CustomSidebar from "../components/CustomSidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <CustomSidebar>{/* Sidebar content is managed within CustomSidebar */}</CustomSidebar>
      <main className="flex-1">{children}</main>
    </div>
  );
}
