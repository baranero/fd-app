import Input from "@/components/Input"
import Image from "next/image"
import { useState } from "react"

const Auth = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

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
                        <h2 className="text-white text-4xl mb-8 text-center font-semibold">Sign in</h2>
                        <div className="flex flex-col gap-4">
                        <Input
                                label="Username"
                                onChange={(event: any) => setName(event.target.value)}
                                id="name"
                                type="text"
                                value={name}
                            />
                            <Input
                                label="Email"
                                onChange={(event: any) => setEmail(event.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="Password"
                                onChange={(event: any) => setPassword(event.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button className="bg-orange-600 py-3 text-white rounded-md w-full mt-10 hover:bg-orange-700 transition">Login</button>
                        <p className="text-neutral-400 mt-8">Don&apos;t have an account? <span className="text-white ml-1 hover:underline cursor-pointer">Sign up</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth

{/* <a href="https://www.freepik.com/free-vector/fire-sparks-background-realistic-flame-border-black-design-space-vector_18920303.htm#query=fire%20background&position=9&from_view=keyword&track=ais">Image by rawpixel.com</a> on Freepik */}