import React from "react";
import Image from "next/legacy/image";

interface DescriptionProps {
  title: string;
  text: string;
  src: string;
  alt: string;
}

const Description: React.FC<DescriptionProps> = ({ title, text, src, alt }) => {
  return (
    <div className=" mt-10 py-4 md:p-0 lg:p-0 flex flex-col md:flex-row lg:flex-row lg:w-[70%] mx-auto items-center justify-center bg-zinc-300 rounded-lg">
      <div className="w-full md:w-1/2 lg:w-1/2 order-last md:order-first lg:order-first px-3">
        <h1 className=" text-center text-4xl my-6">{title}</h1>
        <p className=" text-center text-2xl leading-relaxed opacity-75">
          {text}
        </p>
      </div>
      <div className="w-full h-full lg:rounded-xl md:rounded-xl lg:w-1/2 md:w-1/2 relative">
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            layout="responsive"
            width={1200}
            height={800}
            objectFit="cover"
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
