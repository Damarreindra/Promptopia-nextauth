"use client"
import Form from '@components/Form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return; 
    if (!session && status === "unauthenticated") {
      router.push('/');
    }
  }, [session, status, router]);

  
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt:'',
    tag:''
  })
  const createPrompt = async (e) =>{
    e.preventDefault()
    setSubmitting(true)

    try{
      const response = await fetch('/api/prompt/new',{
        method:'POST',
        body:JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id
        })
      })  
      if(response.ok){
            router.push('/')
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <Form
    type='Create'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default page