"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const profileImage = post.creator?.image || '/assets/images/avatar.jpg'

  const handleProfileClick = () => {
    if (post.creator?._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator?._id}?name=${post.creator?.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCardClick = () => {
    router.push(`/prompt/${post._id}`);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString || Date.now());
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const postDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    const timeString = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    if (postDate.getTime() === today.getTime()) {
      return `Today ${timeString}`;
    } else if (postDate.getTime() === yesterday.getTime()) {
      return `Yesterday ${timeString}`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      }) + ` ${timeString}`;
    }
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
         onClick={handleCardClick}>
      
      {/* Header */}
      <div className="p-3 pb-4">
        <div className='flex justify-between items-start gap-4'>
          <div
            className='flex items-center gap-3 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              handleProfileClick();
            }}
          >
            <Image
              src={profileImage}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-cover border-2 border-gray-200 dark:border-gray-600'
            />
            <div className='flex flex-col'>
              <h4 className='font-satoshi font-semibold text-gray-900 dark:text-white text-sm'>
                {post.creator?.username}
              </h4>
              <p className='font-inter text-xs text-gray-500 dark:text-gray-400'>
                {formatDateTime(post.createdAt)}
              </p>
            </div>
          </div>

          <button 
            className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
          >
            <Image
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 pb-4">
       
        
        {/* Title */}
        <h3 className='text-base font-semibold text-foreground mb-1 line-clamp-1'>
          {post.title}
        </h3>
        
        {/* Prompt content preview */}
        <p className='text-muted-foreground line-clamp-2 mb-2 text-sm'
           style={{
             display: '-webkit-box',
             WebkitLineClamp: 4,
             WebkitBoxOrient: 'vertical',
             overflow: 'hidden',
             textOverflow: 'ellipsis'
           }}>
          {post.prompt}
        </p>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-750 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
           {/* Category Badge */}
        <div className="flex items-center gap-2">
          <span
            className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors'
            onClick={(e) => {
              e.stopPropagation();
              handleTagClick && handleTagClick(post.category);
            }}
          >
            #{post.category}
          </span>
        </div>
        <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Click to view details
            </span>
            
            {session?.user.id === post.creator?._id && pathName === "/profile" && (
              <div className='flex gap-2'>
                <button
                  className='px-3 py-1 text-xs font-medium text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit();
                  }}
                >
                  Edit
                </button>
                <button
                  className='px-3 py-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};


export default PromptCard;
