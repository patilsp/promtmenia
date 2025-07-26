import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    try {
        const { userId, title, prompt, category } = await request.json();
        
        // Debug logging
        console.log('Received data:', { userId, title, prompt, category });
        
        // Validate required fields
        if (!userId || !title || !prompt || !category) {
            console.log('Missing required fields:', { userId: !!userId, title: !!title, prompt: !!prompt, category: !!category });
            return new Response(JSON.stringify({ 
                error: "Missing required fields",
                received: { userId: !!userId, title: !!title, prompt: !!prompt, category: !!category }
            }), { status: 400 });
        }

        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, title, prompt, category });

        await newPrompt.save();
        console.log('Prompt created successfully:', newPrompt._id);
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.error('Error creating prompt:', error);
        return new Response(JSON.stringify({ 
            error: "Failed to create a new prompt", 
            details: error.message 
        }), { status: 500 });
    }
}
