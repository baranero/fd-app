import Image from "next/image"
import React from "react";

interface DescriptionProps {
    text: string;
    src: string;
    alt: string;
}

const Description: React.FC<DescriptionProps> = ({ text, src, alt }) => {
    return (

            <div className="grid lg:grid-cols-2 sm:grid-cols-1 mx-auto mt-10 rounded-2xl bg-zinc-600 lg:w-[60%] sm:w-full">
                <p className="text-white lg:order-first sm:order-last text-2xl my-auto px-4 text-center md:text-xl">
                {text}
                </p>
<div className="relative h-96">
    
                            <Image className="object-cover rounded-2xl" src={src} fill sizes="(max-width: 1440px) 100vh" alt={alt} />
</div>

            </div>

    )
}

export default Description

// Image by <a href="https://www.freepik.com/free-photo/top-view-desk-arrangement-with-notebook_16688666.htm#query=schedule%20draw&position=34&from_view=search&track=ais">Freepik</a>