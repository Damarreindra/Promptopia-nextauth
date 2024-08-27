"use client"
import Form from '@components/Form'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'


const page = () => {
    const { data: session, status } = useSession();
    const router = useRouter()
  
    useEffect(() => {
      if (status === "loading") return; 
      if (!session && status === "unauthenticated") {
        router.push('/');
      }
    }, [session, status, router]);

  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt:'',
    tag:''
  })

  useEffect(()=>{
    const getDetail = async ()=>{
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json()
        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
    }
    if(promptId) getDetail()
  }, [promptId])

  const editPrompt = async (e) =>{
    e.preventDefault()
    setSubmitting(true)

    try{
      const response = await fetch(`/api/prompt/${promptId}`,{
        method:'PATCH',
        body:JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
    <Suspense fallback={<div>Loading...</div>}>

    <Form
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={editPrompt}
    />
    </Suspense>
  )
}

export default page