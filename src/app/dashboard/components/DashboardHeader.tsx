'use client';
import ThemeSwitch from '@/components/ui/ThemeSwitch';
import { Bell, Search, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { usePathname } from "next/navigation";
import { Input } from '@/components/ui/input';


export function DashboardHeader() {

 

  const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard Overview",
  "/dashboard/MyBookings": "My Bookings",
  "/dashboard/reviews": "My Reviews",
  "/dashboard/wishlist": "Wishlist",
  "/dashboard/tours": "Browse Tours",
  "/dashboard/destinations": "Destinations",
  "/dashboard/special-offers": "Special Offers",
  "/dashboard/payments": "Payment History",
  "/dashboard/profile": "My Profile",
  "/dashboard/settings": "Settings",
  "/dashboard/support": "Help & Support",
};

  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Dashboard";

  return (

     <div >
        <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-lg border-b border-border flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
         
            <h2 className="font-display text-lg font-semibold text-foreground">{pageTitle}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 w-64 h-9" />
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
             <ThemeSwitch />
            <Avatar className="h-8 w-8 md:hidden border border-border">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">RA</AvatarFallback>
            </Avatar>
          </div>
        </header>
      </div>
  );
}