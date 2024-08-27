'use client'

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const pathname = usePathname()
  const [copied, setCopied] = useState(null);
  const {data:session} = useSession()
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };


  const handleClick=(author)=>{
   return <Link href={`/${author}`}/>
  }
  return (
    <div className="prompt_card max-w-full md:max-w-md p-4 md:p-6 border rounded-lg shadow-sm">
       <Link href={`/${post.author?._id}`} passHref>
      <div className="flex flex-col md:flex-row justify-start items-center md:items-start gap-3 md:gap-5 cursor-pointer" onClick={()=>handleClick(post.author.username)}>
        <div>
          <Image
            src={post.author?.image}
            width={50}
            height={50}
            className="rounded-full"
            alt="Author's profile picture"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="font-satoshi font-semibold text-gray-700">
            @{post.author?.username}
          </h1>
          <h1 className="font-inter text-sm text-gray-700">
            {post.author?.email}
          </h1>
        </div>
      </div>
      </Link>
      <div
        className="copy_btn absolute top-5 right-2 cursor-pointer"
        onClick={() => handleCopy()}
      >
        <Image
          src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
          width={15}
          height={15}
          alt="Copy icon"
        />
      </div>
      <p className="font-satoshi text-sm mt-2 text-gray-700 text-justify md:truncate overflow-hidden">
        {post.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer mt-2"
        onClick={() => handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post?.author?._id && pathname === `/${session?.user.id}` && (
        <div className="mt-5 flex-center gap-5">
  <p className="font-inter green_gradient cursor-pointer text-sm" onClick={handleEdit}>
    Edit
  </p>
  <p className="font-inter orange_gradient cursor-pointer text-sm" onClick={handleDelete}>
    Delete
  </p>
  </div>
)}

    </div>
  );
};

export default PromptCard;
