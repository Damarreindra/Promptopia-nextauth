import Prompt from "@models/Prompt"
import { connectToDb } from "@utils/db"

export const GET = async(req, {params})=>{
    try{
        await connectToDb()
        const prompts = await Prompt.findById(params.id).populate('author')
        return new Response(JSON.stringify(prompts), {
            status:200
        })
    }catch(err){
        return new Response(err, {
            status:501
        })
    }
}

export const PATCH = async (req, {params}) =>{
    const {prompt, tag} = await req.json()

    try {
        await connectToDb()
        const existingPrompt = await Prompt.findById(params.id)

        if(!existingPrompt) return new Response ("Prompt not found",{status:404})
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response (JSON.stringify(existingPrompt),{status:200})
    } catch (error) {

        return new Response (error,{status:501})
    }
}

export const DELETE = async (req, {params})=>{
    try{
        await connectToDb()
        const deletePrompt = await Prompt.findOneAndDelete(params.id)
        if(!deletePrompt) return new Response("Failed to delete", {status: 404})

        return new Response (JSON.stringify(deletePrompt),{status:200})

    }catch (error) {

        return new Response (error,{status:501})
    }
}