import Prompt from "@models/Prompt"
import { connectToDb } from "@utils/db"

export const GET = async(req)=>{
    try{
        await connectToDb()
        const prompts = await Prompt.find({}).populate('author')
        return new Response(JSON.stringify(prompts), {
            status:200
        })
    }catch(err){
        return new Response(err, {
            status:501
        })
    }
}