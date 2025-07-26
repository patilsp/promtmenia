"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, User, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const PromptDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPrompt(data);
        } else {
          toast.error("Prompt not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching prompt:", error);
        toast.error("Error loading prompt");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPrompt();
    }
  }, [id, router]);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProfileClick = () => {
    if (prompt.creator?._id === session?.user.id) {
      router.push("/profile");
    } else {
      router.push(`/profile/${prompt.creator?._id}?name=${prompt.creator?.username}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading prompt...</span>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Prompt not found</h1>
        <Button onClick={() => router.push("/")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  const profileImage = prompt.creator?.image || '/assets/images/avatar.jpg';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
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

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <Image
                  src={profileImage}
                  alt="Creator avatar"
                  width={60}
                  height={60}
                  className="rounded-full object-cover border-3 border-gray-200 dark:border-gray-600"
                />
                <div>
                  <h2 
                    className="font-satoshi font-semibold text-lg text-gray-900 dark:text-white cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    onClick={handleProfileClick}
                  >
                    {prompt.creator?.username}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {prompt.creator?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  <Tag className="w-3 h-3 mr-1" />
                  {prompt.category}
                </span>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {prompt.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                By {prompt.creator?.username}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Created {new Date(prompt.createdAt || Date.now()).toLocaleDateString()}
              </div>
             
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Prompt Content
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                {prompt.prompt}
              </p>
            </div>
          </div>

          {/* Actions */}
          {session?.user.id === prompt.creator?._id && (
            <div className="px-8 py-6 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-3">
                <Button
                  onClick={() => router.push(`/update-prompt?id=${prompt._id}`)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  Edit Prompt
                </Button>
                <Button
                  onClick={async () => {
                    if (confirm("Are you sure you want to delete this prompt?")) {
                      try {
                        const response = await fetch(`/api/prompt/${prompt._id}`, {
                          method: "DELETE",
                        });

                        if (response.ok) {
                          toast.success("Prompt deleted successfully");
                          router.push("/");
                        } else {
                          const errorData = await response.json();
                          toast.error(errorData.error || "Failed to delete prompt");
                        }
                      } catch (error) {
                        console.error("Error deleting prompt:", error);
                        toast.error("Network error. Please try again.");
                      }
                    }
                  }}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  Delete Prompt
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PromptDetail;
