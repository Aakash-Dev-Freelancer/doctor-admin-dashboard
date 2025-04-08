
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  Image, 
  FileText, 
  Settings, 
  Users,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: MessageSquare, label: "Chat", path: "/chat" },
  { icon: Image, label: "Posts", path: "/posts" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  { icon: Users, label: "Patients", path: "/patients" },
  { icon: FileText, label: "Terms", path: "/terms" },
  { icon: FileText, label: "About", path: "/about" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex flex-col h-screen bg-sidebar border-r border-border transition-all duration-300",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="text-medical-800 font-bold text-xl">MediAdmin</div>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)} 
          className="ml-auto"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </Button>
      </div>
      
      <Separator className="mb-4" />
      
      <div className="flex flex-col px-2 py-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              "hover:bg-medical-100 hover:text-medical-800",
              isActive ? "bg-medical-100 text-medical-800" : "text-gray-600",
              collapsed && "justify-center"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </div>
      
      <div className="mt-auto p-4">
        <Separator className="mb-4" />
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div>
              <div className="font-medium text-sm">Dr. Sarah Chen</div>
              <div className="text-xs text-gray-500">Cardiologist</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
