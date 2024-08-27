"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
  <section className="flex flex-wrap gap-5 mt-5 justify-center">
    {posts ? posts.map((e)=>(
      <>
      <PromptCard post={e}/>
      </>
    )):""}
  </section>
  )
};

export default Feed;
