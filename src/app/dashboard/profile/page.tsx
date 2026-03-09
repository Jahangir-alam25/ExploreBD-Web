
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  User, Mail, Phone, MapPin, Edit3,
  CheckCircle2, Loader2, Eye, EyeOff,
  Calendar,
  Shield,
  Camera
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';

// import { Separator } from '@/components/ui/separator';
// import toast from 'react-hot-toast';

// Define proper interfaces
interface UserProfile {
  location?: string;
  dateOfBirth?: string;
  nationality?: string;
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  emergencyContactPhone?: string;
  bio?: string;
  image?: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  membershipType: string;
  isVerified: boolean;
  profile?: UserProfile;
  createdAt?: string;
  updatedAt?: string;
}

// Form validation schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().optional(),
  location: z.string().optional(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactRelation: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  bio: z.string().max(500, { message: 'Bio must not exceed 500 characters.' }).optional(),
  image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function Profile() {
  const { data: session, status, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState(null)


  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/user/profile?email=${encodeURIComponent(session.user.email)}`);

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }

          const data: UserData = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          const errorMessage = error instanceof Error ? error.message : 'Failed to load profile data';
          toast.error(errorMessage);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session, status]);

  // Default form values
  const defaultValues: Partial<ProfileFormValues> = {
    name: userData?.name || session?.user?.name || '',
    phone: userData?.phone || '',
    location: userData?.profile?.location || '',
    dateOfBirth: userData?.profile?.dateOfBirth || '',
    nationality: userData?.profile?.nationality || '',
    emergencyContactName: userData?.profile?.emergencyContactName || '',
    emergencyContactRelation: userData?.profile?.emergencyContactRelation || '',
    emergencyContactPhone: userData?.profile?.emergencyContactPhone || '',
    bio: userData?.profile?.bio || '',
    image: userData?.profile?.image || '',
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  // Reset form when user data changes
  useEffect(() => {
    if (userData && !isEditing) {
      form.reset({
        name: userData.name || '',
        phone: userData.phone || '',
        location: userData.profile?.location || '',
        dateOfBirth: userData.profile?.dateOfBirth || '',
        nationality: userData.profile?.nationality || '',
        emergencyContactName: userData.profile?.emergencyContactName || '',
        emergencyContactRelation: userData.profile?.emergencyContactRelation || '',
        emergencyContactPhone: userData.profile?.emergencyContactPhone || '',
        bio: userData.profile?.bio || '',
        image: userData.profile?.image || "",
      });
    }
  }, [userData, form, isEditing]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!session?.user?.email) {
      toast.error('No session found');
      return;
    }
    console.log("Submitting profile update with data:", data);
    setIsSaving(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          name: data.name,
          phone: data.phone || '',
          profile: {
            location: data.location || '',
            dateOfBirth: data.dateOfBirth || '',
            nationality: data.nationality || '',
            emergencyContactName: data.emergencyContactName || '',
            emergencyContactRelation: data.emergencyContactRelation || '',
            emergencyContactPhone: data.emergencyContactPhone || '',
            bio: data.bio || '',
            image: data.image || '',
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update profile. Status: ${response.status}`);
      }

      const updatedUser: UserData = await response.json();
      setUserData(updatedUser);

      // Update session
      await update({
        ...session,
        user: {
          ...session.user,
          name: data.name,
        }
      });

      setIsEditing(false);
      toast.success('Profile updated successfully! 🎉');

    } catch (error: unknown) {
      console.error('Failed to update profile:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    form.reset(defaultValues);
    setIsEditing(false);
    toast('Changes discarded', {
      icon: '↶',
      style: {
        background: '#fef3c7',
        color: '#92400e',
      }
    });
  };

  // Get user initials for avatar
  const getUserInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-500" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-muted-foreground">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const avatarImage =
    form.watch("image");

  return (
    <div className="container mx-auto px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <User className="h-6 w-6 text-primary" /> My Profile
          </h1>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSaving || !form.formState.isValid}
                className=""
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className=""
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">


          <div className='flex flex-col md:flex-row gap-8'>
            <Card className="lg:row-span-2">
              <CardContent className="p-6 text-center space-y-4">
                <div className="relative inline-block">

                  <Avatar className="h-24 w-24 mx-auto border-4 border-primary/20">

                    {form.watch("image") ? (
                      <img
                        src={form.watch("image")}
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                        {getUserInitials(userData?.name || "U")}
                      </AvatarFallback>
                    )}

                  </Avatar>

                  <Input
                    type="file"
                    accept="image/*"
                    id="avatarUpload"
                    className="hidden"
                    onChange={async (e) => {

                      const file = e.target.files?.[0];
                      if (!file) return;

                      const formData = new FormData();
                      formData.append("image", file);

                      const uploadUrl =
                        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_image_upload_key}`;

                      const res = await axios.post(uploadUrl, formData);

                      const imageUrl = res.data.data.url;

                      // react-hook-form এ value set
                      form.setValue("image", imageUrl);

                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("avatarUpload")?.click()
                    }
                    className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground shadow-lg"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>

                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {userData?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Travel Enthusiast
                  </p>
                </div>

                <Badge variant="secondary">
                  <Shield className="h-3 w-3 mr-1" /> Verified Member
                </Badge>

                <div className="text-sm text-muted-foreground space-y-2 text-left pt-2 border-t border-border">

                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> {userData?.email}
                  </p>

                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> {userData?.phone}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {userData?.profile?.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Member since {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                  </p>

                </div>

              </CardContent>
            </Card>


            {/* Profile Overview Card */}
            <Card className="flex-1 py-6">
              <CardHeader className="">
                <CardTitle className="flex items-center ">
                  <User className="h-5 w-5 mr-2" />
                  <h1 className="text-3xl font-bold "></h1>
                  Professional Profile
                </CardTitle>

              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Avatar & Basic Info */}
                <div className="flex flex-col sm:flex-row items-start gap-6">


                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm font-semibold">
                            <User className="h-4 w-4 mr-2 " />
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              disabled={!isEditing}
                              className=""
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field - Read Only */}
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-semibold">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Address
                      </FormLabel>
                      <div className="relative">
                        <Input
                          type={showEmail ? "text" : "password"}
                          value={session.user?.email || ''}
                          disabled
                          className="pr-10 font-mono text-sm"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer"
                          onClick={() => setShowEmail(!showEmail)}
                        >
                          {showEmail ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <FormDescription className="text-xs">
                        Email cannot be changed for security reasons
                      </FormDescription>
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm font-semibold">
                            <Phone className="h-4 w-4 mr-2 " />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+1 (555) 123-4567"
                              {...field}
                              disabled={!isEditing}
                              className=""
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm font-semibold">
                            <MapPin className="h-4 w-4 mr-2" />
                            Location
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="San Francisco, CA"
                              {...field}
                              disabled={!isEditing}
                              className=" "
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm font-semibold">
                            <Calendar className="h-4 w-4 mr-2" />
                            Date of Birth
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="YYYY-MM-DD"
                              {...field}
                              disabled={!isEditing}
                              className=" "
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm font-semibold">

                            Nationality
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="American"
                              {...field}
                              disabled={!isEditing}
                              className=" "
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />



                  </div>

                </div>
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Professional Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="tell us about yourself..."

                          {...field}
                          disabled={!isEditing}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length || 0}/500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Professional Details */}
          <Card className="">
            <CardHeader className="">
              <CardTitle className="flex items-center ">
                Professional Details
              </CardTitle>
              <CardDescription>
                Your career information and professional background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <FormField
                  control={form.control}
                  name="emergencyContactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold"> Contact Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          disabled={!isEditing}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyContactRelation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold"> Contact Relation *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Brother"
                          {...field}
                          disabled={!isEditing}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyContactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold"> Contact Phone *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 (555) 123-4567"
                          {...field}
                          disabled={!isEditing}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


              </div>







            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="">
            <CardHeader className="">
              <CardTitle className="flex items-center ">
                Account Information
              </CardTitle>
              <CardDescription>
                Your account details and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">


              {/* <Separator className="my-6" /> */}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1  ">
                  Change Password
                </Button>
                <Button variant="outline" className="flex-1  ">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="flex-1">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}