import { getSession } from "@/lib/actions/auth";
import { AdminSidebar } from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900">
      {session ? (
        <div className="h-full flex">
          <AdminSidebar username={session.username} />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
