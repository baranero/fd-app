import axios from "axios"
import Input from "@/components/Input"
import Image from "next/image"

import { useCallback, useState } from "react"
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextPageContext } from "next"

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
  
    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
  
    return {
      props: {}
    }
  }

const Auth = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [variant, setVariant] = useState('login')

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            })

            router.push('/')
        } catch (error) {
            console.log(error);
            
        }
    }, [email, password, router])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            })

            login()
        } catch (error) {
            console.log(error);
            
        }
    }, [email, name, password, login])

    

    return (
        <div className="relative h-full w-full bg-[url('/images/background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                <Image
                        src="/images/logo.svg"
                        alt="Logo"
                        width={200}
                        height={100}
                    />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-zinc-700 bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 text-center font-semibold">{variant === 'login' ? 'Sign in' : 'Sign up'}</h2>
                        <div className="flex flex-col gap-4">
                        {variant === 'register' && 
                            <Input
                                label="Username"
                                onChange={(event: any) => setName(event.target.value)}
                                id="name"
                                type="text"
                                value={name}
                            />
                        }
                        
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
                        <button onClick={variant === 'login' ? login : register} className="bg-orange-600 py-3 text-white rounded-md w-full mt-10 hover:bg-orange-700 transition">{variant === 'login' ? 'Login' : 'Register'}</button>
                        <p className="text-neutral-400 mt-8">{variant === 'login' ? "Don't have an account?" : 'Have an account?'} <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">{variant === 'login' ? 'Sign up' : 'Sign in'}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth

{/* <a href="https://www.freepik.com/free-vector/fire-sparks-background-realistic-flame-border-black-design-space-vector_18920303.htm#query=fire%20background&position=9&from_view=keyword&track=ais">Image by rawpixel.com</a> on Freepik */}