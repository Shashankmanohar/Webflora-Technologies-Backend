import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X, ChevronLeft, ChevronRight, LayoutDashboard, Users, Calendar, Bell, BookOpen, ClipboardList, BarChart } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navItems = [
  { link: "/teacher", label: "Dashboard", icon: LayoutDashboard },
  { link: "/teacher/notice", label: "Notice", icon: Bell },
  { link: "/teacher/schedule", label: "Schedule", icon: Calendar },
  { link: "/teacher/examination", label: "Examination", icon: ClipboardList },
  { link: "/teacher/attendance", label: "Attendance", icon: BarChart },
];

export default function Teacher() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={cn(
        "bg-[#0D0E22] text-white h-full flex flex-col transition-all duration-300",
        open ? "w-60" : "w-16"
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <h1 className={cn("text-lg font-semibold", !open && "hidden")}>School</h1>
          <button onClick={() => setOpen(!open)} className="text-white">
            {open ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        {/* Nav Items */}
        <nav className="flex-1 px-2 py-4">
          {navItems.map(({ link, label, icon: Icon }) => (
            <button
              key={link}
              onClick={() => navigate(link)}
              className="flex items-center w-full px-4 py-2 text-left rounded hover:bg-[#5843D3]"
            >
              <Icon className="w-5 h-5" />
              <span className={cn("ml-3", !open && "hidden")}>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#1B1C30]">
        {/* Top Navbar */}
        <div className="bg-[#0D0E22] shadow p-4 flex items-center">
          <button onClick={() => setOpen(!open)} className="text-white mr-4">
            {open ? <X /> : <Menu />}
          </button>
          <h2 className="text-lg text-white font-semibold">School Management</h2>
        </div>
        {/* Page Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}