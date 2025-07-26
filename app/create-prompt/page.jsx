"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({title: "", prompt: "", category: "", });

  // Check authentication status
  useEffect(() => {
    if (status === "loading") return; // Still loading
    
    if (status === "unauthenticated" || !session) {
      toast.error("Please login to create prompts");
      router.push("/");
      return;
    }
  }, [session, status, router]);

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Debug logging
      console.log('Creating prompt with data:', {
        title: post.title,
        prompt: post.prompt,
        userId: session?.user.id,
        category: post.category,
      });

      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          prompt: post.prompt,
          userId: session?.user.id,
          category: post.category,
        }),
      });

      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (response.ok) {
        toast.success("Prompt has been created! ");
        router.push("/");
      } else {
        console.error('Error creating prompt:', responseData);
        alert(`Error: ${responseData.error || 'Failed to create prompt'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
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

  // Don't render form if not authenticated
  if (status === "unauthenticated" || !session) {
    return null;
  }

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
