import { User, Mail, Phone, MapPin, Calendar, Shield, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
      <User className="h-6 w-6 text-primary" /> My Profile
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Card */}
      <Card className="lg:row-span-2">
        <CardContent className="p-6 text-center space-y-4">
          <div className="relative inline-block">
            <Avatar className="h-24 w-24 mx-auto border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">RA</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground shadow-lg">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Rahim Ahmed</h3>
            <p className="text-sm text-muted-foreground">Travel Enthusiast</p>
          </div>
          <Badge variant="secondary"><Shield className="h-3 w-3 mr-1" />Verified Member</Badge>
          <div className="text-sm text-muted-foreground space-y-2 text-left pt-2 border-t border-border">
            <p className="flex items-center gap-2"><Mail className="h-4 w-4" />rahim@example.com</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" />+880 1712345678</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />Dhaka, Bangladesh</p>
            <p className="flex items-center gap-2"><Calendar className="h-4 w-4" />Member since Jan 2024</p>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
            <div className="text-center"><p className="text-lg font-bold text-foreground">12</p><p className="text-xs text-muted-foreground">Trips</p></div>
            <div className="text-center"><p className="text-lg font-bold text-foreground">6</p><p className="text-xs text-muted-foreground">Reviews</p></div>
            <div className="text-center"><p className="text-lg font-bold text-foreground">5</p><p className="text-xs text-muted-foreground">Wishlist</p></div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input placeholder="Your name" defaultValue="Rahim Ahmed" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input type="email" defaultValue="rahim@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone</label>
              <Input defaultValue="+880 1712345678" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Location</label>
              <Input defaultValue="Dhaka, Bangladesh" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date of Birth</label>
              <Input type="date" defaultValue="1995-06-15" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nationality</label>
              <Input defaultValue="Bangladeshi" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Bio</label>
            <Textarea rows={3} defaultValue="Passionate traveler exploring the beauty of Bangladesh. Love nature, photography, and trying local cuisines." />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Contact Name</label>
              <Input defaultValue="Karim Ahmed" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Relationship</label>
              <Input defaultValue="Brother" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone</label>
              <Input defaultValue="+880 1898765432" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Profile;