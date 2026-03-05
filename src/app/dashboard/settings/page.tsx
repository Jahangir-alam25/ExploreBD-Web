import { Settings, Bell, Shield, Globe, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const notificationSettings = [
  { label: "Email Notifications", description: "Receive booking confirmations and updates via email", defaultChecked: true },
  { label: "SMS Alerts", description: "Get SMS notifications for your upcoming tours", defaultChecked: false },
  { label: "Push Notifications", description: "Browser push notifications for deals and offers", defaultChecked: true },
  { label: "Newsletter", description: "Weekly travel tips, destination guides, and exclusive offers", defaultChecked: true },
];

const privacySettings = [
  { label: "Profile Visibility", description: "Make your profile visible to other travelers", defaultChecked: true },
  { label: "Show Reviews", description: "Display your reviews publicly on tour pages", defaultChecked: true },
  { label: "Activity Status", description: "Let others see when you're online", defaultChecked: false },
];

const SettingsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
      <Settings className="h-6 w-6 text-primary" /> Settings
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4 text-primary" />Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {notificationSettings.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4 text-primary" />Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {privacySettings.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Globe className="h-4 w-4 text-primary" />Language & Region</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Language</label>
            <Input defaultValue="বাংলা (Bengali)" readOnly className="cursor-default" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Currency</label>
            <Input defaultValue="৳ BDT (Bangladeshi Taka)" readOnly className="cursor-default" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Timezone</label>
            <Input defaultValue="Asia/Dhaka (GMT+6)" readOnly className="cursor-default" />
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4 text-primary" />Account Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
            <div>
              <p className="text-sm font-medium text-foreground">Password</p>
              <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
            <div>
              <p className="text-sm font-medium text-foreground">Two-Factor Auth</p>
              <p className="text-xs text-muted-foreground">Extra layer of security</p>
            </div>
            <Badge variant="secondary">Off</Badge>
          </div>
          <div className="pt-2 border-t border-border">
            <Button variant="destructive" size="sm" className="w-full">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default SettingsPage;