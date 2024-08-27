"use client";

import PromptCard from "@components/PromptCard";
import { useSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; 
    if (!session && status === "unauthenticated") {
      router.push('/');
    }
  }, [session, status, router]);

  const params = useParams();
  const [prompts, setPrompts] = useState([]);
  const [user, setUser] = useState("")
  const { _id } = params;

  useEffect(() => {
    const getPrompts = async () => { 
      const res = await fetch(`/api/prompts/${_id}/`);
      const data = await res.json();
      setPrompts(data);
    };
    getPrompts();
  }, [_id]);

  useEffect(() => {
    const getUser = async () => { 
      const res = await fetch(`/api/user/${_id}`);
      const data = await res.json();
      setUser(data);
    };
    getUser();
  }, [_id]);


  const handleEdit = (post)=>{
      router.push(`/edit-prompt?id=${post._id}`)
  }

  const handleDelete = async (post)=>{
  const hasConfirmed = confirm("Sure to Delete this ?")

  if(hasConfirmed){
    try {
      await fetch(`/api/prompt/${post._id.toString()}`,{
      method:"DELETE"
    })
    const filtered = prompts.filter((p)=>p._id !== post._id)
    setPrompts(filtered)
    } catch (error) {
      
    }
  }
    
  }



  return (
    <div className="w-full">
      <h1 className="head_text text-left">
        {user ? (
          <span className="blue_gradient">{user.username}'s Post</span>
        ) : (
          ""
        )}
      </h1>

      <section className="flex flex-wrap gap-5 mt-5 justify-start">
        {prompts.length > 0 ? (
          prompts.map((e) => (
            <PromptCard key={e._id} post={e} handleEdit={()=>handleEdit(e)} handleDelete={()=>handleDelete(e)}/>
          ))
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default UserPage;
