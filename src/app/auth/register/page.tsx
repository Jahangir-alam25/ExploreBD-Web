// "use client";
// import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Checkbox } from "@/components/ui/checkbok";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { MapPin, Eye, EyeOff, Mail, Lock, Shield, User, ArrowRight, Phone, UserCircle, CheckCircle2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import GoogleLoginButton from "../socialAuth/GoogleLogin";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [activeTab, setActiveTab] = useState("user");
//   const [isLoading, setIsLoading] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "", email: "", phone: "", password: "", confirmPassword: "", adminCode: "", department: "",
//   });
//   const router = useRouter();
//   const { toast } = useToast();

//   const updateField = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

//   const passwordStrength = (pw: string) => {
//     let s = 0;
//     if (pw.length >= 8) s++;
//     if (/[A-Z]/.test(pw)) s++;
//     if (/[0-9]/.test(pw)) s++;
//     if (/[^A-Za-z0-9]/.test(pw)) s++;
//     return s;
//   };

//   const strength = passwordStrength(formData.password);
//   const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength] || "";
//   const strengthColor = ["", "bg-destructive", "bg-accent", "bg-primary", "bg-primary"][strength] || "";

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.fullName || !formData.email || !formData.password) {
//       toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
//       return;
//     }
//     if (formData.password.length < 8) {
//       toast({ title: "Error", description: "Password must be at least 8 characters", variant: "destructive" });
//       return;
//     }
//     if (!agreeTerms) {
//       toast({ title: "Error", description: "Please agree to the terms and conditions", variant: "destructive" });
//       return;
//     }
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       toast({ title: "Account Created! 🎉", description: "Welcome to ExploreBD. Please check your email to verify." });
//       router.push("/auth/login");
//     }, 1500);
//   };

//   const handleSocialRegister = (provider: string) => {
//     toast({ title: `${provider} Sign Up`, description: `Creating account with ${provider}...` });
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left decorative */}
//       <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-primary items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary-foreground/20 blur-3xl" />
//           <div className="absolute bottom-32 left-10 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
//         </div>
//         <div className="relative z-10 text-center px-12">
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//             <MapPin className="h-16 w-16 text-primary-foreground mx-auto mb-6" />
//             <h1 className="text-4xl font-bold text-primary-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
//               Join Explore<span className="text-accent">BD</span>
//             </h1>
//             <p className="text-primary-foreground/80 text-lg max-w-md mx-auto mb-10">
//               Start your journey through the most beautiful landscapes of Bangladesh today.
//             </p>
//           </motion.div>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="space-y-4 text-left max-w-sm mx-auto">
//             {["Access 500+ curated tours", "Exclusive member discounts up to 40%", "24/7 travel support & assistance", "Free cancellation on most bookings"].map((item, i) => (
//               <div key={i} className="flex items-center gap-3 text-primary-foreground/90">
//                 <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
//                 <span className="text-sm">{item}</span>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       {/* Right form */}
//       <div className="flex-1 flex items-center justify-center p-6 bg-background overflow-y-auto">
//         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md py-4">
//           <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
//             <MapPin className="h-8 w-8 text-primary" />
//             <span className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
//               Explore<span className="text-primary">BD</span>
//             </span>
//           </div>

//           <Card className="border-border/50 shadow-card">
//             <CardHeader className="text-center pb-2">
//               <CardTitle className="text-2xl">Create Account</CardTitle>
//               <CardDescription>Join thousands of happy travelers</CardDescription>
//             </CardHeader>
//             <CardContent className="pt-4">
//               <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                 <TabsList className="grid w-full grid-cols-2 mb-6">
//                   <TabsTrigger value="user" className="flex items-center gap-2"><User className="h-4 w-4" /> User</TabsTrigger>
//                   <TabsTrigger value="admin" className="flex items-center gap-2"><Shield className="h-4 w-4" /> Admin</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="user">
//                   <form onSubmit={handleRegister} className="space-y-3">
//                     <div className="space-y-1.5">
//                       <Label htmlFor="u-name">Full Name *</Label>
//                       <div className="relative">
//                         <UserCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="u-name" placeholder="John Doe" className="pl-10" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
//                       </div>
//                     </div>
//                     <div className="space-y-1.5">
//                       <Label htmlFor="u-email">Email *</Label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="u-email" type="email" placeholder="you@example.com" className="pl-10" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
//                       </div>
//                     </div>
                    // <div className="space-y-1.5">
                    //   <Label htmlFor="u-phone">Phone</Label>
                    //   <div className="relative">
                    //     <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    //     <Input id="u-phone" type="tel" placeholder="+880 1XXX-XXXXXX" className="pl-10" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />
                    //   </div>
                    // </div>
//                     <div className="space-y-1.5">
//                       <Label htmlFor="u-pw">Password *</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="u-pw" type={showPassword ? "text" : "password"} placeholder="Min 8 characters" className="pl-10 pr-10" value={formData.password} onChange={(e) => updateField("password", e.target.value)} />
//                         <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                       {formData.password && (
//                         <div className="flex items-center gap-2 mt-1">
//                           <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
//                             <div className={`h-full rounded-full transition-all ${strengthColor}`} style={{ width: `${strength * 25}%` }} />
//                           </div>
//                           <span className="text-xs text-muted-foreground">{strengthLabel}</span>
//                         </div>
//                       )}
//                     </div>
//                     <div className="space-y-1.5">
//                       <Label htmlFor="u-cpw">Confirm Password *</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="u-cpw" type={showConfirmPassword ? "text" : "password"} placeholder="Re-enter password" className="pl-10 pr-10" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} />
//                         <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                           {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                       {formData.confirmPassword && formData.password !== formData.confirmPassword && (
//                         <p className="text-xs text-destructive">Passwords do not match</p>
//                       )}
//                     </div>
//                     <div className="flex items-start gap-2 pt-1">
//                       <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(c) => setAgreeTerms(!!c)} className="mt-0.5" />
//                       <Label htmlFor="terms" className="text-xs font-normal cursor-pointer leading-relaxed">
//                         I agree to the <button type="button" className="text-primary hover:underline" onClick={() => toast({ title: "Terms & Conditions", description: "Terms page coming soon!" })}>Terms of Service</button> and <button type="button" className="text-primary hover:underline" onClick={() => toast({ title: "Privacy Policy", description: "Privacy page coming soon!" })}>Privacy Policy</button>
//                       </Label>
//                     </div>
//                     <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={isLoading}>
//                       {isLoading ? "Creating Account..." : "Create Account"} {!isLoading && <ArrowRight className="h-4 w-4 ml-1" />}
//                     </Button>
//                   </form>
//                 </TabsContent>

//                 <TabsContent value="admin">
//                   <form onSubmit={handleRegister} className="space-y-3">
//                     <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 mb-1">
//                       <p className="text-xs text-accent-foreground flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-accent" /> Admin registration requires an authorization code.</p>
//                     </div>
//                     <div className="space-y-1.5">
//                       <Label htmlFor="a-name">Full Name *</Label>
//                       <div className="relative">
//                         <UserCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="a-name" placeholder="Admin Name" className="pl-10" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
//                       </div>
//                     </div>
//                     <div className="space-y-1.5">
//                       <Label htmlFor="a-email">Official Email *</Label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="a-email" type="email" placeholder="admin@explorebd.com" className="pl-10" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
//                       </div>
//                     </div>
//                     <div className="space-y-1.5">
//                       <Label htmlFor="a-dept">Department *</Label>
//                       <Select value={formData.department} onValueChange={(v) => updateField("department", v)}>
//                         <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="operations">Operations</SelectItem>
//                           <SelectItem value="marketing">Marketing</SelectItem>
//                           <SelectItem value="finance">Finance</SelectItem>
//                           <SelectItem value="support">Customer Support</SelectItem>
//                           <SelectItem value="it">IT & Development</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="space-y-1.5">
//                       <Label htmlFor="a-code">Authorization Code *</Label>
//                       <div className="relative">
//                         <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="a-code" type="password" placeholder="Enter admin code" className="pl-10" value={formData.adminCode} onChange={(e) => updateField("adminCode", e.target.value)} />
//                       </div>
//                     </div>
//                     <div className="space-y-1.5">
//                       <Label htmlFor="a-pw">Password *</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="a-pw" type={showPassword ? "text" : "password"} placeholder="Min 8 characters" className="pl-10 pr-10" value={formData.password} onChange={(e) => updateField("password", e.target.value)} />
//                         <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>
//                     <div className="space-y-1.5">
//                       <Label htmlFor="a-cpw">Confirm Password *</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="a-cpw" type={showConfirmPassword ? "text" : "password"} placeholder="Re-enter password" className="pl-10 pr-10" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} />
//                         <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                           {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-2 pt-1">
//                       <Checkbox id="a-terms" checked={agreeTerms} onCheckedChange={(c) => setAgreeTerms(!!c)} className="mt-0.5" />
//                       <Label htmlFor="a-terms" className="text-xs font-normal cursor-pointer">I agree to the Terms and Privacy Policy</Label>
//                     </div>
//                     <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={isLoading}>
//                       {isLoading ? "Creating..." : "Request Admin Access"} {!isLoading && <ArrowRight className="h-4 w-4 ml-1" />}
//                     </Button>
//                   </form>
//                 </TabsContent>
//               </Tabs>

//               <div className="relative my-5">
//                 <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
//                 <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or sign up with</span></div>
//               </div>

//               <div className="grid grid-cols-3 gap-3">
              
//                 <GoogleLoginButton />
//                 <Button variant="outline" className="w-full" onClick={() => handleSocialRegister("Facebook")}>
//                   <svg className="h-4 w-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
//                 </Button>
//                 <Button variant="outline" className="w-full" onClick={() => handleSocialRegister("Apple")}>
//                   <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
//                 </Button>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-center pb-6">
//               <p className="text-sm text-muted-foreground">
//                 Already have an account?{" "}
//                 <Link href="/auth/login" className="text-primary font-medium hover:underline">Sign In</Link>
//               </p>
//             </CardFooter>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Register;


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbok";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  MapPin,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  User,
  ArrowRight,
  Phone,
  UserCircle,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { toast } from "react-toastify";
import OTPForm from "../Forms/OTPForm";
import GoogleLoginButton from "../socialAuth/GoogleLogin";

const Register = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("user");

  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [emailForOTP, setEmailForOTP] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    adminCode: "",
    department: "",
  });

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // password strength
  const passwordStrength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strength = passwordStrength(formData.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength] || "";
  const strengthColor =
    ["", "bg-destructive", "bg-accent", "bg-primary", "bg-primary"][strength] ||
    "";

  // REGISTER FUNCTION
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: activeTab === "admin" ? "Admin" : "user",
          department: formData.department,
          adminCode: formData.adminCode,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Signup failed");
      }

      setEmailForOTP(formData.email);
      setOtpSent(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Signup failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerified = () => {
    toast.success("Account verified successfully!");
    router.push("/auth/login");
  };

  if (otpSent) {
    return <OTPForm email={emailForOTP} onVerified={handleOtpVerified} />;
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-12">
          <MapPin className="h-16 w-16 text-primary-foreground mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            Join Explore<span className="text-accent">BD</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md mx-auto mb-10">
            Start your journey through the most beautiful landscapes of
            Bangladesh today.
          </p>

          <div className="space-y-4 text-left max-w-sm mx-auto">
            {[
              "Access 500+ curated tours",
              "Exclusive member discounts up to 40%",
              "24/7 travel support",
              "Free cancellation",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="text-sm text-primary-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Join thousands of happy travelers
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="user">
                    <User className="h-4 w-4 mr-1" /> User
                  </TabsTrigger>
                  <TabsTrigger value="admin">
                    <Shield className="h-4 w-4 mr-1" /> Admin
                  </TabsTrigger>
                </TabsList>

                {/* USER FORM */}
                <TabsContent value="user">
                  <form onSubmit={handleRegister} className="space-y-3">
                    <Label>Full Name</Label>
                    <Input
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        updateField("fullName", e.target.value)
                      }
                    />

                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        updateField("email", e.target.value)
                      }
                    />

                      
                      <Label htmlFor="u-phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="u-phone" type="tel" placeholder="+880 1XXX-XXXXXX" className="pl-10" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />
                      </div>
                  

                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          updateField("password", e.target.value)
                        }
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>

                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        updateField("confirmPassword", e.target.value)
                      }
                    />

                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={agreeTerms}
                        onCheckedChange={(c) => setAgreeTerms(!!c)}
                      />
                      <span className="text-sm">
                        I agree to the terms
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Creating..."
                        : "Create Account"}
                      {!isLoading && (
                        <ArrowRight className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* ADMIN FORM */}
                 <TabsContent value="admin">
                  <form onSubmit={handleRegister} className="space-y-3">
                    <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 mb-1">
                      <p className="text-xs text-accent-foreground flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-accent" /> Admin registration requires an authorization code.</p>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="a-name">Full Name *</Label>
                      <div className="relative">
                        <UserCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="a-name" placeholder="Admin Name" className="pl-10" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="a-email">Official Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="a-email" type="email" placeholder="admin@explorebd.com" className="pl-10" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="a-dept">Department *</Label>
                      <Select value={formData.department} onValueChange={(v) => updateField("department", v)}>
                        <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="support">Customer Support</SelectItem>
                          <SelectItem value="it">IT & Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="a-code">Authorization Code *</Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="a-code" type="password" placeholder="Enter admin code" className="pl-10" value={formData.adminCode} onChange={(e) => updateField("adminCode", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="a-pw">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="a-pw" type={showPassword ? "text" : "password"} placeholder="Min 8 characters" className="pl-10 pr-10" value={formData.password} onChange={(e) => updateField("password", e.target.value)} />
                        <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="a-cpw">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="a-cpw" type={showConfirmPassword ? "text" : "password"} placeholder="Re-enter password" className="pl-10 pr-10" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} />
                        <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <Checkbox id="a-terms" checked={agreeTerms} onCheckedChange={(c) => setAgreeTerms(!!c)} className="mt-0.5" />
                      <Label htmlFor="a-terms" className="text-xs font-normal cursor-pointer">I agree to the Terms and Privacy Policy</Label>
                    </div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
                      {isLoading ? "Creating..." : "Request Admin Access"} {!isLoading && <ArrowRight className="h-4 w-4 ml-1" />}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
              
                <GoogleLoginButton />
                <Button variant="outline" className="w-full" >
                  <svg className="h-4 w-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                </Button>
              </div>
            </CardContent>

            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;