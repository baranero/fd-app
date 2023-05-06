import Image from "next/image"

const Auth = () => {
    return (
        <div className="relative h-full w-full bg-[url('/images/background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav>
                <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={200}
                        height={100}
                        className="ml-10"
                    />
                </nav>
            </div>
        </div>
    )
}

export default Auth

{/* <a href="https://www.freepik.com/free-vector/fire-sparks-background-realistic-flame-border-black-design-space-vector_18920303.htm#query=fire%20background&position=9&from_view=keyword&track=ais">Image by rawpixel.com</a> on Freepik */}