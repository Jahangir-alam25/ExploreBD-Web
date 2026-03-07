'use client';


import {
  BarChart3,
  Calendar,
  Heart,
  Star,
  Map,
  MapPin,
  Tag,
  CreditCard,
  User,
  Settings,
  HelpCircle,
  Shield,
  Briefcase,
  Users,
  ClipboardList,
  Bot,
  PanelLeftOpen,
  PanelLeftClose,
  LogOut,
  LayoutDashboard,
  Package,
  CalendarCheck,
  FileText,
} from "lucide-react";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useActiveTab } from '../dashcontext/ActiveTabContext';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


interface SidebarProps {
  collapsed?: boolean;
  setCollapsed?: (value: boolean) => void;
}

const Sidebar = ({ collapsed: collapsedProp, setCollapsed: setCollapsedProp }: SidebarProps) => {
  const { user, logout } = useAuth();
  const { activeTab, setActiveTab } = useActiveTab();

// const user = {
//   name: "Rahim Ahmed",
//   email: "rahim@example.com",
//   role: "User",
// };
const sidebarItems = [
  // Main
  { id: 'overview', name: 'Dashboard', icon: BarChart3, section: 'main', path: '/dashboard' },

  // Booking Related
  { id: 'my-bookings', name: 'My Bookings', icon: Calendar, section: 'booking', path: '/dashboard/my-bookings' },
  { id: 'wishlist', name: 'Wishlist', icon: Heart, section: 'booking', path: '/dashboard/wishlist' },
  { id: 'reviews', name: 'My Reviews', icon: Star, section: 'booking', path: '/dashboard/reviews' },

  // Explore
  { id: 'tours', name: 'All Tours', icon: Map, section: 'explore', path: '/dashboard/tours' },
  { id: 'destinations', name: 'Destinations', icon: MapPin, section: 'explore', path: '/dashboard/destinations' },
  { id: 'offers', name: 'Special Offers', icon: Tag, section: 'explore', path: '/dashboard/special-offers' },

  // Payments
  { id: 'payment-history', name: 'Payment History', icon: CreditCard, section: 'payment', path: '/dashboard/payments' },

  // Account
  { id: 'profile', name: 'Profile', icon: User, section: 'account', path: '/dashboard/profile' },
  { id: 'settings', name: 'Settings', icon: Settings, section: 'account', path: '/dashboard/settings' },

  // Support
  { id: 'support', name: 'Support / Help', icon: HelpCircle, section: 'support', path: '/dashboard/support' },

  // Admin (Role Based)
 
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, section: "admin", path: "/dashboard/admin/adminDashboard" },
  { id: "manage-tours", name: "Manage Tours", icon: Package, section: "admin", path: "/dashboard/admin/adminTours" },
  { id: "bookings", name: "Bookings", icon: CalendarCheck, section: "admin", path: "/dashboard/admin/adminBookings" },
  { id: "users", name: "Users", icon: Users, section: "admin", path: "/dashboard/admin/adminUsers" },
  { id: "destinations", name: "Destinations", icon: MapPin, section: "admin", path: "/dashboard/admin/adminDestinations" },
  { id: "reviews", name: "Reviews", icon: Star, section: "admin", path: "/dashboard/admin/adminReviews" },
  { id: "payments", name: "Payments", icon: CreditCard, section: "admin", path: "/dashboard/admin/adminPayments" },
  { id: "blog-posts", name: "Blog Posts", icon: FileText, section: "admin", path: "/dashboard/admin/adminBlog" },
  { id: "reports", name: "Reports", icon: BarChart3, section: "admin", path: "/dashboard/admin/adminReports" },
  { id: "settings", name: "Settings", icon: Settings, section: "admin", path: "/dashboard/admin/adminSettings" },
];



const sections = {
  main: 'Overview',
  booking: 'My Bookings',
  explore: 'Explore Tours',
  payment: 'Payments',
  support: 'Support',
  account: 'Account',
  admin: 'Administration',
};

  // Role-based filtering
  // const filteredSidebarItems = sidebarItems.filter(item => {
  //   if (item.section === 'admin') {
  //     return user?.role === 'System Admin' || user?.role === 'Admin';
  //   }
  //   return true;
  // });

 const filteredSidebarItems = sidebarItems.filter((item) => {

  // Admin routes
  if (item.section === "admin") {
    return user?.role === "System Admin" || user?.role === "Admin";
  }

  // Non-admin routes (user routes)
  if (user?.role === "user") {
    return item.section !== "admin";
  }

  // If admin, hide normal user sections
  if (user?.role === "System Admin" || user?.role === "Admin") {
    return item.section === "admin";
  }

  return false;
});

  const groupedItems = filteredSidebarItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof filteredSidebarItems>);

  const [collapsed, setCollapsedState] = useState<boolean>(
    collapsedProp ?? (typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  );
  const [width, setWidth] = useState<number>(collapsed ? 70 : 256);
  const [dragging, setDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (collapsedProp !== undefined) {
      setCollapsedState(collapsedProp);
      setWidth(collapsedProp ? 70 : 256);
    }
  }, [collapsedProp]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setCollapsedState(isMobile);
      setWidth(isMobile ? 70 : 256);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging && sidebarRef.current) {
        document.body.style.userSelect = 'none';
        let newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
        if (newWidth < 70) newWidth = 70;
        if (newWidth > 300) newWidth = 256;
        setWidth(newWidth);
        const newCollapsed = newWidth < 100;
        setCollapsedState(newCollapsed);
        if (setCollapsedProp) setCollapsedProp(newCollapsed);
      }
    };
    const handleMouseUp = () => {
      setDragging(false);
      document.body.style.userSelect = 'auto';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'auto';
    };
  }, [dragging, setCollapsedProp]);

  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsedState(newCollapsed);
    setWidth(newCollapsed ? 70 : 256);
    if (setCollapsedProp) setCollapsedProp(newCollapsed);
  };

   // Get user initials for avatar
  const getUserInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      try {
        await logout();
        await Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Logout failed');
        Swal.fire({ title: "Failed!", text: error.message, icon: "error" });
      }
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className="bg-card border-r border-border transition-all duration-300 flex flex-col relative overflow-hidden"
      style={{ width: `${width}px`, flexShrink: 0 }}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between h-[64px] px-4 border-b border-border relative">
        <div className="flex items-center ">
          <div className="w-8 h-8 bg-gradient-to-r from-green-primary to-green-accent rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && <Link href="/" className="flex items-center gap-2 text-black dark:text-white text-xl font-bold">
             <div className="border-2 border-black dark:border-white p-2 rounded"><MapPin /></div>
            Explore<span className="text-yellow-400">BD</span></Link>}
        </div>
        <button
          onClick={toggleCollapsed}
          className={`p-2 rounded-md hover:bg-muted/30 transition ${collapsed ? 'absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2' : ''}`}
        >
          {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </button>
      </div>

        {/* User info */}
        {!collapsed && (
          <div className="px-4 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">{getUserInitials( user?.name || user?.email || 'U')}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-6 overflow-y-auto custom-scroll">
        {Object.entries(groupedItems).map(([sectionKey, items]) => (
          <div key={sectionKey} className="space-y-2">
            {!collapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                {sections[sectionKey as keyof typeof sections]}
              </h3>
            )}
            {items.map(item => (
              <Link key={item.id} href={item.path} passHref>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full sidebar-button flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${activeTab === item.id ? ' bg-primary text-black' : 'text-muted-foreground hover:text-foreground hover:bg-primary/30'} ${collapsed ? 'justify-center' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </button>
              </Link>
            ))}
          </div>
        ))}
      </nav>

     
      <div className="p-4 border-t border-border flex-shrink-0">
        <Button variant="outline" size="sm" className="w-full hover:scale-105 transition-transform" onClick={handleLogout}>
          <LogOut className="h-3 w-3 mr-2" />
          {!collapsed && 'Sign Out'}
        </Button>
      </div>

      {/* Drag Handle */}
      <div
        onMouseDown={() => setDragging(true)}
        className={`w-1 cursor-col-resize h-full absolute right-0 top-0 z-10 ${dragging ? 'bg-indigo-500' : 'hover:bg-indigo-300'}`}
      />
    </aside>
  );
};

export default Sidebar;
