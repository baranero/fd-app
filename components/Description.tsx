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
        <div className='text-white m-20 py-4 flex flex-row items-center justify-center bg-neutral-600 bg-opacity-25 rounded-lg'>
        <div className='w-[50%]'>
            <h1 className='text-white text-5xl mb-16'>
                {title}
            </h1>
            <p className='text-white w-[80%] text-3xl leading-relaxed opacity-75'>{text}
            </p>
        </div>
        <img src={src} className='w-[40%] rounded-xl' alt={alt} />
    </div>

    )
}

export default Description

// Image by <a href="https://www.freepik.com/free-photo/top-view-desk-arrangement-with-notebook_16688666.htm#query=schedule%20draw&position=34&from_view=search&track=ais">Freepik</a>