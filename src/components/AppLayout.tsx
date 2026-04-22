import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/items", icon: Package, label: "Items" },
  { to: "/add", icon: PlusCircle, label: "Add Item" },
];

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 border-b lg:border-b-0 lg:border-r border-border/60 bg-sidebar/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-6 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Leaf className="h-5 w-5 text-primary-foreground" strokeWidth={2.2} />
            </div>
            <Link to="/" className="font-display text-xl font-semibold tracking-tight text-foreground">
              Expiry Smart
            </Link>
          </div>
          <nav className="px-3 pb-4 lg:pb-6 flex lg:flex-col gap-1 overflow-x-auto">
            {navItems.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth whitespace-nowrap",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  )
                }
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-8 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
