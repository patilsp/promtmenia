'use client'

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
// import Upload from "@/components/UploadDnD"

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const categories = [
    { value: "AI", label: "AI & Machine Learning" },
    { value: "webdevelopment", label: "Web Development" },
    { value: "design", label: "Design & UI/UX" },
    { value: "marketing", label: "Marketing & Content" },
    { value: "business", label: "Business & Strategy" },
    { value: "writing", label: "Writing & Copywriting" },
    { value: "productivity", label: "Productivity & Tools" },
    { value: "education", label: "Education & Learning" },
    { value: "creative", label: "Creative & Arts" },
    { value: "other", label: "Other" }
  ];

  return (
    <section className='w-full max-w-full flex-center px-2 flex-col mb-5'>
        <div className="container mx-auto py-5">
          <Card className="glassmorphism w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  {type} Prompt
                </span>
              </CardTitle>
              <CardDescription className="text-center text-sm font-medium">
                {type} and share ai prompts with the world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Prompt Title ..."
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Write your prompt here"
                    value={post.prompt || ''}
                    onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                    required
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category
                    <span className="text-sm text-muted-foreground ml-1">
                      (Select a category for your prompt)
                    </span>
                  </Label>
                  <Select
                    value={post.category || ''}
                    onValueChange={(value) => setPost({ ...post, category: value })}
                    className="bg-white"
                 >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="space-y-2">
                  <Label>Image Upload</Label>
                  <Upload
                    onImageUpload={(fileUrl) => setPost({ ...post, imagePath: fileUrl })}
                  />
                </div> */}
                {/* <div className="space-y-2">
                  <Label htmlFor="imagePath">Image Path</Label>
                  <Input
                    id="imagePath"
                    placeholder="Image Path"
                    value={post.imagePath || ''}
                    onChange={(e) => setPost({ ...post, imagePath: e.target.value })}
                    required
                  />
                </div> */}
              </form>
            </CardContent>
            <CardFooter className="flex justify-end border-t py-2">
              <Link href="/">
                <Button variant="outline" className="text-white w-20 hover:text-white mr-2 bg-red-400 hover:bg-red-600">Cancel</Button>
              </Link>
              <Button onClick={handleSubmit} disabled={submitting} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 font-semibold shadow transition-all duration-300 transform hover:scale-105">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin " />
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
