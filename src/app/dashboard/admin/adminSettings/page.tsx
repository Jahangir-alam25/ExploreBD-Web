"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, Globe, Bell, Shield, CreditCard, Mail, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [generalForm, setGeneralForm] = useState({
    siteName: "ExploreBD", tagline: "Discover the Beauty of Bangladesh",
    email: "admin@explorebd.com", phone: "+880 1234-567890",
    address: "House 42, Road 11, Dhanmondi, Dhaka-1205", currency: "BDT",
    timezone: "Asia/Dhaka", language: "en",
  });

  const [notifications, setNotifications] = useState({
    newBooking: true, cancelledBooking: true, newReview: true,
    newUser: false, paymentReceived: true, lowStock: true,
    weeklyReport: true, monthlyReport: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: true, sessionTimeout: "30",
    passwordExpiry: "90", loginAttempts: "5",
  });

  const [payment, setPayment] = useState({
    bkash: true, nagad: true, card: true, bankTransfer: true,
    minBooking: "1000", taxRate: "15",
  });

  const handleSave = (section: string) => {
    toast({ title: "Settings Saved", description: `${section} settings have been updated successfully.` });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general"><Globe className="h-4 w-4 mr-1.5" />General</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-1.5" />Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4 mr-1.5" />Security</TabsTrigger>
          <TabsTrigger value="payment"><CreditCard className="h-4 w-4 mr-1.5" />Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader><CardTitle className="text-base">General Settings</CardTitle><CardDescription>Manage your website s basic configuration</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Site Name</Label><Input value={generalForm.siteName} onChange={(e) => setGeneralForm({ ...generalForm, siteName: e.target.value })} /></div>
                <div><Label>Tagline</Label><Input value={generalForm.tagline} onChange={(e) => setGeneralForm({ ...generalForm, tagline: e.target.value })} /></div>
                <div><Label>Contact Email</Label><Input type="email" value={generalForm.email} onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })} /></div>
                <div><Label>Phone</Label><Input value={generalForm.phone} onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })} /></div>
                <div className="md:col-span-2"><Label>Address</Label><Input value={generalForm.address} onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })} /></div>
                <div><Label>Currency</Label>
                  <Select value={generalForm.currency} onValueChange={(v) => setGeneralForm({ ...generalForm, currency: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BDT">BDT (৳)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Timezone</Label>
                  <Select value={generalForm.timezone} onValueChange={(v) => setGeneralForm({ ...generalForm, timezone: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Dhaka">Asia/Dhaka (GMT+6)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => handleSave("General")}><Save className="h-4 w-4 mr-1" />Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle><CardDescription>Choose what notifications you want to receive</CardDescription></CardHeader>
            <CardContent className="space-y-5">
              {[
                { key: "newBooking", label: "New Booking", desc: "Get notified when a new booking is made" },
                { key: "cancelledBooking", label: "Cancelled Booking", desc: "Alert when a booking is cancelled" },
                { key: "newReview", label: "New Review", desc: "Notification for new customer reviews" },
                { key: "newUser", label: "New User Registration", desc: "Alert on new user signups" },
                { key: "paymentReceived", label: "Payment Received", desc: "Confirmation of successful payments" },
                { key: "lowStock", label: "Low Availability", desc: "Alert when tour spots are running low" },
                { key: "weeklyReport", label: "Weekly Report", desc: "Receive weekly performance summary" },
                { key: "monthlyReport", label: "Monthly Report", desc: "Detailed monthly analytics report" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between">
                  <div><p className="text-sm font-medium text-foreground">{n.label}</p><p className="text-xs text-muted-foreground">{n.desc}</p></div>
                  <Switch checked={notifications[n.key as keyof typeof notifications]} onCheckedChange={(v) => setNotifications({ ...notifications, [n.key]: v })} />
                </div>
              ))}
              <Button onClick={() => handleSave("Notification")}><Save className="h-4 w-4 mr-1" />Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader><CardTitle className="text-base">Security Settings</CardTitle><CardDescription>Configure security and access controls</CardDescription></CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add an extra layer of security</p></div>
                <Switch checked={security.twoFactor} onCheckedChange={(v) => setSecurity({ ...security, twoFactor: v })} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><Label>Session Timeout (minutes)</Label><Input type="number" value={security.sessionTimeout} onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })} /></div>
                <div><Label>Password Expiry (days)</Label><Input type="number" value={security.passwordExpiry} onChange={(e) => setSecurity({ ...security, passwordExpiry: e.target.value })} /></div>
                <div><Label>Max Login Attempts</Label><Input type="number" value={security.loginAttempts} onChange={(e) => setSecurity({ ...security, loginAttempts: e.target.value })} /></div>
              </div>
              <Button onClick={() => handleSave("Security")}><Save className="h-4 w-4 mr-1" />Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader><CardTitle className="text-base">Payment Configuration</CardTitle><CardDescription>Manage payment methods and billing</CardDescription></CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">Payment Methods</h4>
                {[
                  { key: "bkash", label: "bKash" },
                  { key: "nagad", label: "Nagad" },
                  { key: "card", label: "Credit/Debit Card" },
                  { key: "bankTransfer", label: "Bank Transfer" },
                ].map((m) => (
                  <div key={m.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-foreground">{m.label}</p>
                      {payment[m.key as keyof typeof payment] && <Badge variant="default" className="text-[10px] px-1.5 py-0">Active</Badge>}
                    </div>
                    <Switch checked={payment[m.key as keyof typeof payment] as boolean} onCheckedChange={(v) => setPayment({ ...payment, [m.key]: v })} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Minimum Booking Amount (৳)</Label><Input type="number" value={payment.minBooking} onChange={(e) => setPayment({ ...payment, minBooking: e.target.value })} /></div>
                <div><Label>Tax Rate (%)</Label><Input type="number" value={payment.taxRate} onChange={(e) => setPayment({ ...payment, taxRate: e.target.value })} /></div>
              </div>
              <Button onClick={() => handleSave("Payment")}><Save className="h-4 w-4 mr-1" />Save Payment Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;