"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Save, ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import Image from "next/image";

const SettingsPage = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Check authentication
  useEffect(() => {
    if (status === "loading") return;
    
    if (status === "unauthenticated" || !session) {
      toast.error("Please login to access settings");
      router.push("/");
      return;
    }

    // Set initial username
    if (session?.user?.username) {
      setUsername(session.user.username);
      setOriginalUsername(session.user.username);
    }
  }, [session, status, router]);

  const handleSave = async () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    if (username === originalUsername) {
      toast.info("No changes to save");
      return;
    }

    // Validate username format
    const usernameRegex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    console.log('Frontend validation - Username:', username, 'Length:', username.length, 'Regex test:', usernameRegex.test(username));
    if (!usernameRegex.test(username)) {
      toast.error("Username must be 4-20 characters long and contain only letters, numbers, dots, and underscores");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          username: username.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Username updated successfully!");
        setOriginalUsername(username);
        
        // Update the session with new username
        await update({
          ...session,
          user: {
            ...session.user,
            username: username.trim()
          }
        });
      } else {
        toast.error(data.error || "Failed to update username");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setUsername(originalUsername);
  };

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  // Don't render if not authenticated
  if (status === "unauthenticated" || !session) {
    return null;
  }

  const hasChanges = username !== originalUsername;
  const profileImage = session.user?.image || '/assets/images/avatar.jpg';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-6 h-6 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </motion.div>

        {/* Settings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Update your profile information and preferences
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Profile Image Display */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={60}
                  height={60}
                  className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {session.user.username}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {session.user.email}
                  </p>
                </div>
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full"
                  disabled={isSaving}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Username must be 4-20 characters long and contain only letters, numbers, dots, and underscores
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving || !username.trim()}
                  className="flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={!hasChanges || isSaving}
                >
                  Reset
                </Button>
              </div>

              {hasChanges && (
                <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                  You have unsaved changes
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
