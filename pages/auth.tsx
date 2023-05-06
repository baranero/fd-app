import Input from "@/components/Input"
import Image from "next/image"
import { useState } from "react"

const Auth = () => {

    const [email, setEmail] = useState('')

    return (
        <div className="relative h-full w-full bg-[url('/images/background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={200}
                        height={100}
                    />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-zinc-700 bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">Sign in</h2>
                        <div className="flex flex-col gap-4">
                            <Input
                                label="Email"
                                onChange={() => {}}
                                id="email"
                                type="email"
                                value=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth

{/* <a href="https://www.freepik.com/free-vector/fire-sparks-background-realistic-flame-border-black-design-space-vector_18920303.htm#query=fire%20background&position=9&from_view=keyword&track=ais">Image by rawpixel.com</a> on Freepik */}