import { connectToDb } from "@utils/db";
import Prompt from "@models/Prompt";

export const POST = async(req) =>{
    const {userId, prompt, tag} = await req.json()

    try {
        await connectToDb()
        const newPrompt = await Prompt.create({
            author: userId,
            prompt,
            tag
        })

        newPrompt.save()
        return new Response(JSON.stringify(newPrompt),{
            status:201
        })
    } catch (error) {
        return new Response(JSON.stringify(error),{
            status:501
        })
    }
}

