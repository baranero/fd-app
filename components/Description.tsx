import Image from "next/image"
import React from "react";

interface DescriptionProps {
    title: string;
    text: string;
    src: string;
    alt: string;
}

const Description: React.FC<DescriptionProps> = ({ title, text, src, alt }) => {
    return (
        <div className='text-white mt-10 py-4 flex flex-col items-center justify-center bg-neutral-600 bg-opacity-25 rounded-lg'>
        <div className='w-full order-last px-3'>
            <h1 className='text-white text-center text-4xl my-6'>
                {title}
            </h1>
            <p className='text-white text-center w-full text-2xl leading-relaxed opacity-75'>{text}
            </p>
        </div>
        <img src={src} className='w-full opacity-70' alt={alt} />
    </div>

    )
}

export default Description

// Image by <a href="https://www.freepik.com/free-photo/top-view-desk-arrangement-with-notebook_16688666.htm#query=schedule%20draw&position=34&from_view=search&track=ais">Freepik</a>