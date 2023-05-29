import React from "react";

interface DescriptionProps {
  title: string;
  text: string;
  src: string;
  alt: string;
}

const Description: React.FC<DescriptionProps> = ({ title, text, src, alt }) => {
  return (
    <div className="text-white mt-10 py-4 md:p-0 lg:p-0 flex flex-col md:flex-row lg:flex-row lg:w-[70%] mx-auto items-center justify-center bg-neutral-600 bg-opacity-25 rounded-lg">
      <div className="w-full lg:w-[50%] order-last md:order-first lg:order-first px-3">
        <h1 className="text-white text-center text-4xl my-6">{title}</h1>
        <p className="text-white text-center w-full text-2xl leading-relaxed opacity-75">
          {text}
        </p>
      </div>
      <img
        src={src}
        className="w-full h-full object-cover lg:rounded-xl md:rounded-xl lg:w-[50%] md:w-[50%] opacity-70"
        alt={alt}
      />
    </div>
  );
};

export default Description;
