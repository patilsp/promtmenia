import Link from "next/link";
import { Button } from "@/components/ui/button";
import Upload from "@/components/UploadDnD";

const Form = ({ type, post, setPost, submitting, handleSubmit, imagePath, fileUrl }) => {
  return (
    <section className='w-full max-w-full flex-center my-10 px-2 flex-col mb-5'>
      <h1 className='head_text text-xl text-center'>
        <span className='fs-36 green_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-center max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Field of Prompt{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>
        <div className="w-full">
          <Upload onImageUpload={(fileUrl) => {
          
            setPost({ ...post, imagePath: fileUrl });
          }} />
        </div>
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Image Path
            </span>
            <input

              value={post.imagePath}
              onChange={(e) => setPost({ ...post, imagePath: e.target.value })}
              type='text'
              placeholder='Image Path'
              required
              className='form_input'
              
            />
          </label>


      
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <Button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-black text-white'
          >
            {submitting ? `${type}ing...` : type}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Form;
