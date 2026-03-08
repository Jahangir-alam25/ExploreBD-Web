// "use client";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Checkbox } from "@/components/ui/checkbok";
// import { MapPin, Eye, EyeOff, Mail, Lock, Shield, User, ArrowRight } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("user");
//   const router = useRouter();
//   const { toast } = useToast();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !password) {
//       toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
//       return;
//     }
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       toast({ title: "Welcome back! 🎉", description: `Logged in as ${activeTab === "admin" ? "Admin" : "User"}` });
//       router.push(activeTab === "admin" ? "/admin" : "/dashboard");
//     }, 1500);
//   };

//   const handleSocialLogin = (provider: string) => {
//     toast({ title: `${provider} Login`, description: `Signing in with ${provider}...` });
//     setTimeout(() => {
//       router.push(activeTab === "admin" ? "/admin" : "/dashboard");
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left - Decorative */}
//       <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-primary items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary-foreground/20 blur-3xl" />
//           <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
//         </div>
//         <div className="relative z-10 text-center px-12">
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//             <MapPin className="h-16 w-16 text-primary-foreground mx-auto mb-6" />
//             <h1 className="text-4xl font-bold text-primary-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
//               Welcome to Explore<span className="text-accent">BD</span>
//             </h1>
//             <p className="text-primary-foreground/80 text-lg max-w-md mx-auto">
//               Discover the breathtaking beauty of Bangladesh. From the world s longest sea beach to lush green tea gardens.
//             </p>
//           </motion.div>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-10 flex gap-8 justify-center text-primary-foreground/90">
//             <div className="text-center">
//               <p className="text-3xl font-bold">500+</p>
//               <p className="text-sm opacity-80">Tours</p>
//             </div>
//             <div className="text-center">
//               <p className="text-3xl font-bold">50K+</p>
//               <p className="text-sm opacity-80">Travelers</p>
//             </div>
//             <div className="text-center">
//               <p className="text-3xl font-bold">100+</p>
//               <p className="text-sm opacity-80">Destinations</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Right - Form */}
//       <div className="flex-1 flex items-center justify-center p-6 bg-background">
//         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
//           {/* Mobile logo */}
//           <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
//             <MapPin className="h-8 w-8 text-primary" />
//             <span className="font-display text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
//               Explore<span className="text-primary">BD</span>
//             </span>
//           </div>

//           <Card className="border-border/50 shadow-card">
//             <CardHeader className="text-center pb-2">
//               <CardTitle className="text-2xl">Sign In</CardTitle>
//               <CardDescription>Choose your account type to continue</CardDescription>
//             </CardHeader>
//             <CardContent className="pt-4">
//               <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                 <TabsList className="grid w-full grid-cols-2 mb-6">
//                   <TabsTrigger value="user" className="flex items-center gap-2">
//                     <User className="h-4 w-4" /> User
//                   </TabsTrigger>
//                   <TabsTrigger value="admin" className="flex items-center gap-2">
//                     <Shield className="h-4 w-4" /> Admin
//                   </TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="user">
//                   <form onSubmit={handleLogin} className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="user-email">Email Address</Label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="user-email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <Label htmlFor="user-password">Password</Label>
//                         <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
//                       </div>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="user-password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
//                         <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Checkbox id="remember" checked={rememberMe} onCheckedChange={(c) => setRememberMe(!!c)} />
//                       <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">Remember me</Label>
//                     </div>
//                     <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={isLoading}>
//                       {isLoading ? "Signing in..." : "Sign In"} {!isLoading && <ArrowRight className="h-4 w-4 ml-1" />}
//                     </Button>
//                   </form>
//                 </TabsContent>

//                 <TabsContent value="admin">
//                   <form onSubmit={handleLogin} className="space-y-4">
//                     <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 mb-2">
//                       <p className="text-xs text-accent-foreground flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-accent" /> Admin access is restricted to authorized personnel only.</p>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="admin-email">Admin Email</Label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="admin-email" type="email" placeholder="admin@explorebd.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="admin-password">Password</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input id="admin-password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
//                         <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>
//                     <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={isLoading}>
//                       {isLoading ? "Signing in..." : "Admin Sign In"} {!isLoading && <ArrowRight className="h-4 w-4 ml-1" />}
//                     </Button>
//                   </form>
//                 </TabsContent>
//               </Tabs>

//               <div className="relative my-6">
//                 <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
//                 <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or continue with</span></div>
//               </div>

//               <div className="grid grid-cols-3 gap-3">
//                 <Button variant="outline" className="w-full" onClick={() => handleSocialLogin("Google")}>
//                   <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
//                 </Button>
//                 <Button variant="outline" className="w-full" onClick={() => handleSocialLogin("Facebook")}>
//                   <svg className="h-4 w-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
//                 </Button>
//                 <Button variant="outline" className="w-full" onClick={() => handleSocialLogin("Apple")}>
//                   <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
//                 </Button>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-center pb-6">
//               <p className="text-sm text-muted-foreground">
//                 Do not have an account?{" "}
//                 <Link href="/auth/register" className="text-primary font-medium hover:underline">Create account</Link>
//               </p>
//             </CardFooter>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Login;


"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbok";
import { MapPin, Eye, EyeOff, Mail, Lock, Shield, User, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession, getSession } from "next-auth/react";
import { canAttemptLogin, getBlockedUntil, recordLoginAttempt } from "@/lib/loginRateLimiter";

// Optional: import your OTP / Forgot / Reset components if needed
import OTPForm from "../Forms/OTPForm";
import ResetPasswordForm from "../Forms/ResetPasswordForm";
import ForgotForm from "../Forms/ForgotForm";
import SuccessForm from "../Forms/SuccessForm";
import LoginBlocked from "../Forms/LoginBlocked";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("user");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const [step, setStep] = useState<'login' | 'forgot' | 'otp' | 'reset' | 'success'>('login');
  const [emailForOTP, setEmailForOTP] = useState('');

  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  // ----------------- Auto-focus & remembered email -----------------
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) setEmail(rememberedEmail);
    firstInputRef.current?.focus();
  }, [step]);

  // ----------------- Load blockedUntil from localStorage -----------------
  useEffect(() => {
    if (email) {
      const storedBlocked = localStorage.getItem('blockedUntil_' + email);
      if (storedBlocked) {
        const ts = parseInt(storedBlocked);
        if (!isNaN(ts) && ts > Date.now()) setBlockedUntil(ts);
        else localStorage.removeItem('blockedUntil_' + email);
      }
    }
  }, [email]);

  // ----------------- Update blockedUntil in localStorage -----------------
  useEffect(() => {
    if (email) {
      if (blockedUntil) localStorage.setItem('blockedUntil_' + email, blockedUntil.toString());
      else localStorage.removeItem('blockedUntil_' + email);
    }
  }, [blockedUntil, email]);

  // ----------------- Safe extract role -----------------
  function getRoleFromSessionObj(sess: unknown): string | undefined {
    if (!sess || typeof sess !== 'object') return undefined;
    const s = sess as Record<string, unknown>;
    const user = s.user;
    if (!user || typeof user !== 'object') return undefined;
    const u = user as Record<string, unknown>;
    const role = u.role;
    return typeof role === 'string' ? role : undefined;
  }

  function computeRedirectAfterLogin(userRole: string | undefined | null) {
    const isAdmin = userRole === 'System Admin' || userRole === 'Admin';
    return isAdmin ? "/dashboard/admin/adminDashboard" : "/dashboard";
  }

  // ----------------- Login submission -----------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    if (blockedUntil && blockedUntil > Date.now()) {
      toast({ title: "Login blocked", description: `Too many failed attempts. Try again later.`, variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn('credentials', { redirect: false, email, password });

      if (!res || res.error) {
        recordLoginAttempt(email, false);
        setLoginError(res?.error || "Login failed. Check your email and password.");

        if (!canAttemptLogin(email)) setBlockedUntil(getBlockedUntil(email));
        setIsLoading(false);
        return;
      }

      recordLoginAttempt(email, true);
      if (rememberMe) localStorage.setItem('rememberedEmail', email);
      else localStorage.removeItem('rememberedEmail');

      // Wait for session to update
      let finalSession = await getSession();
      let attempts = 0;
      while (!finalSession?.user && attempts < 20) {
        await new Promise(r => setTimeout(r, 150));
        finalSession = await getSession();
        attempts++;
      }

      const userRole = getRoleFromSessionObj(finalSession) ?? 'user';
      toast({ title: `Welcome ${email}! 🎉` });
      setStep('success');

      setTimeout(() => {
        router.replace(computeRedirectAfterLogin(userRole));
      }, 1200);

    } catch (err: unknown) {
      recordLoginAttempt(email, false);
      setLoginError(err instanceof Error ? err.message : "Login failed");
      if (!canAttemptLogin(email)) setBlockedUntil(getBlockedUntil(email));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({ title: `${provider} Login`, description: `Signing in with ${provider}...` });
    setTimeout(() => {
      router.push(activeTab === "admin" ? "/admin" : "/dashboard");
    }, 1000);
  };

  // ----------------- OTP / Forgot / Reset handlers -----------------
  const handleForgotPassword = (email: string) => {
    setEmailForOTP(email);
    setStep('otp');
  };
  const handleOtpVerified = () => setStep('reset');
  const handleResetSuccess = () => { toast({ title: "Password reset successfully!" }); setStep('login'); };

  // ----------------- Conditional rendering for blocked / otp / reset / success -----------------
  if (step === 'forgot') return <ForgotForm onSubmit={handleForgotPassword} onBack={() => setStep('login')} />;
  if (step === 'otp') return <OTPForm email={emailForOTP} onVerified={handleOtpVerified} onResend={() => setStep('forgot')} />;
  if (step === 'reset') return <ResetPasswordForm email={emailForOTP} onResetSuccess={handleResetSuccess} />;
  if (step === 'success') return <SuccessForm />;
  if (blockedUntil && blockedUntil > Date.now()) return <LoginBlocked email={email} blockedUntil={blockedUntil} onUnlock={() => setBlockedUntil(null)} lockDuration={2*60*1000} />;

  // ----------------- Main JSX (keep structure intact) -----------------
  return (
    <div className="min-h-screen flex">
          {/* Left - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-primary items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary-foreground/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <MapPin className="h-16 w-16 text-primary-foreground mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-primary-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Welcome to Explore<span className="text-accent">BD</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-md mx-auto">
              Discover the breathtaking beauty of Bangladesh. From the world s longest sea beach to lush green tea gardens.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-10 flex gap-8 justify-center text-primary-foreground/90">
            <div className="text-center">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm opacity-80">Tours</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-sm opacity-80">Travelers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">100+</p>
              <p className="text-sm opacity-80">Destinations</p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <MapPin className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">Explore<span className="text-primary">BD</span></span>
          </div>

          <Card className="border-border/50 shadow-card">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Choose your account type to continue</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="user" className="flex items-center gap-2"><User className="h-4 w-4" /> User</TabsTrigger>
                  <TabsTrigger value="admin" className="flex items-center gap-2"><Shield className="h-4 w-4" /> Admin</TabsTrigger>
                </TabsList>

                <TabsContent value="user">
                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="user-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="user-email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} ref={firstInputRef} />
                      </div>
                    </div>
                    {/* Password */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="user-password">Password</Label>
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="user-password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" checked={rememberMe} onCheckedChange={(c) => setRememberMe(!!c)} />
                      <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">Remember me</Label>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"} {!isLoading && <ArrowRight className="h-4 w-4 ml-1" />}
                    </Button>
                    {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
                  </form>
                </TabsContent>

                <TabsContent value="admin">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 mb-2">
                      <p className="text-xs text-accent-foreground flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-accent" /> Admin access is restricted.</p>
                    </div>
                    {/* Admin email / password fields same as user */}
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Admin Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="admin-email" type="email" placeholder="admin@explorebd.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="admin-password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Admin Sign In"} {!isLoading && <ArrowRight className="h-4 w-4 ml-1" />}
                    </Button>
                    {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
                  </form>
                </TabsContent>
              </Tabs>
              {/* Social Login / Divider unchanged */}
              <div className="relative my-6">
                  <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="w-full" onClick={() => handleSocialLogin("Google")}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleSocialLogin("Facebook")}>
                  <svg className="h-4 w-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleSocialLogin("Apple")}>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                </Button>
              </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <p className="text-sm text-muted-foreground">Do not have an account? <Link href="/auth/register" className="text-primary font-medium hover:underline">Create account</Link></p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;