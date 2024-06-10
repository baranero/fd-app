const LoadingFlame = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh] lg:h-[90vh] md:h-[90vh] ">
      <div className="container">
        <div className="red flame"></div>
        <div className="orange flame"></div>
        <div className="yellow flame"></div>
        <div className="white flame"></div>
        <div className="blue circle"></div>
        <div className="black circle"></div>
      </div>
      <p className=" text-4xl">Ładowanie...</p>
    </div>
  );
};

export default LoadingFlame;
