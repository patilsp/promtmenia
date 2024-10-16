'use client'

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Upload from "@/components/UploadDnD"

const Form = ({ type, post, setPost, submitting, handleSubmit, imagePath, fileUrl }) => {
  return (
    <section className='w-full max-w-full flex-center px-2 flex-col mb-5'>
        <div className="container mx-auto py-10">
          <Card className="glassmorphism w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  {type} Post
                </span>
              </CardTitle>
              <CardDescription className="text-center">
                {type} and share amazing tools with the world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Post Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Write your post here"
                    value={post.prompt || ''}
                    onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                    required
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tag">
                    Post Tags
                    <span className="text-sm text-muted-foreground ml-1">
                      (#product, #webdevelopment, #idea, etc.)
                    </span>
                  </Label>
                  <Input
                    id="tag"
                    placeholder="#Tag"
                    value={post.tag || ''}
                    onChange={(e) => setPost({ ...post, tag: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image Upload</Label>
                  <Upload
                    onImageUpload={(fileUrl) => setPost({ ...post, imagePath: fileUrl })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imagePath">Image Path</Label>
                  <Input
                    id="imagePath"
                    placeholder="Image Path"
                    value={post.imagePath || ''}
                    onChange={(e) => setPost({ ...post, imagePath: e.target.value })}
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end border-t py-2">
              <Link href="/">
                <Button variant="outline" className="text-white w-20 hover:text-white mr-2 bg-red-400 hover:bg-red-600">Cancel</Button>
              </Link>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {`${type}ing...`}
                  </>
                ) : (
                  type
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
    </section>
  );
};

export default Form;
