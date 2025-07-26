import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PATCH = async (request) => {
  try {
    const { userId, username } = await request.json();

    // Validate required fields
    if (!userId || !username) {
      return new Response(JSON.stringify({ 
        error: "Missing required fields" 
      }), { status: 400 });
    }

    // Validate username format
    const usernameRegex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    console.log('Validating username:', username, 'Length:', username.length, 'Regex test:', usernameRegex.test(username));
    if (!usernameRegex.test(username)) {
      return new Response(JSON.stringify({ 
        error: "Username must be 4-20 characters long and contain only letters, numbers, dots, and underscores" 
      }), { status: 400 });
    }

    await connectToDB();

    // Check if username already exists (excluding current user)
    const existingUser = await User.findOne({ 
      username: username,
      _id: { $ne: userId }
    });

    if (existingUser) {
      return new Response(JSON.stringify({ 
        error: "Username already exists" 
      }), { status: 409 });
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: username },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ 
        error: "User not found" 
      }), { status: 404 });
    }

    return new Response(JSON.stringify({ 
      message: "Username updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image
      }
    }), { status: 200 });

  } catch (error) {
    console.error("Error updating username:", error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      return new Response(JSON.stringify({ 
        error: "Invalid username format" 
      }), { status: 400 });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return new Response(JSON.stringify({ 
        error: "Username already exists" 
      }), { status: 409 });
    }

    return new Response(JSON.stringify({ 
      error: "Internal server error" 
    }), { status: 500 });
  }
};
