"use client";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@api/uploadthing/core";
import { useState, useEffect } from 'react';
import Link from "next/link";

export default function UploadDnD() {
    const [images, setImages] = useState<{
        fileUrl: string;
        fileKey: string;
    }[]>([]);

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (images.length > 0) {
            const fileUrl = images[0].fileUrl;
            setImageUrl(fileUrl);
        }
    }, [images]);

    const title = images.length ? (
        <>
            <p className="text-center">Upload Complete!</p>
        </>
    ) : null

    const imgList = (
        <>
            {title}
            <ul>
                {images.map(image => (
                    <li key={image.fileUrl} className="mt-2">
                        <Link href={image.fileUrl} target="_blank">
                            {image.fileUrl}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
            <UploadDropzone<OurFileRouter>
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    if (res) {
                        setImages(res);
                        const json = JSON.stringify(res);
                        console.log(json);
                    }
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            />

            {imageUrl}
            
            {imgList}
        </main>
    );
}
