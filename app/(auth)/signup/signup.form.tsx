"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"
import Image from "next/image"
import { getClient } from "@/lib/graphql"
import { gql, useMutation } from "@apollo/client";
import { useRef, useEffect } from "react";

const signup = gql`
    mutation Signup($values: SignupProps) {
        signup(values: $values) {
            token
            username
            id
        }
    }
`

type SignupResponse = {
    data: {
        signup: {
            token: string,
            id: string,
            username: string
        }
    }
}

const SignupForm: React.FC<any> = () => {

    const [mutate, { loading }] = useMutation(signup);
    const route = useRouter()

    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const emailRef = useRef<HTMLInputElement>()
    const confirmPasswordRef = useRef<HTMLInputElement>()

    // useEffect(() => {
    //     console.log(data)
    //     console.log(error?.message)
    // }, [data, error])

    const handleSignup = async () => {
        try {
            let req = await mutate({
                variables: {
                    values: {
                        username: usernameRef.current?.value,
                        email: emailRef.current?.value,
                        password: passwordRef.current?.value,
                        confirmPassword: confirmPasswordRef.current?.value
                    }
                }
            }) as SignupResponse

            setCookie("token", req.data.signup.token)
            route.push("/home")

        } catch (err) {
            console.log(err)
        }
    }

    return <div className="signin_form flex flex-col space-y-4 relative py-[3rem] px-[3rem] bg-gray-400 bg-opacity-20 rounded-xl">
        <h1 className='text-4xl font-semibold text-center mb-4'>Đăng Ký</h1>
        <div className="input-box">
            <div className="flex space-x-2 py-2 rounded-md bg-white justify-center">
                <Image src={'/icons/google.svg'} width={24} height={24} alt='google' />
                <p className='text-black'>Đăng ký với tài khoản Google</p>
            </div>
        </div>
        <div className="input-box">
            <input ref={emailRef} className="px-4 w-[18rem] h-10" type="text" placeholder='Email' />
        </div>
        <div className="input-box">
            <input ref={usernameRef} className="px-4 w-[18rem] h-10" type="text" placeholder='Tên người dùng' />
        </div>
        <div className="input-box">
            <input ref={passwordRef} className="px-4 w-[18rem] h-10" type="password" placeholder='Mật khẩu' />
        </div>
        <div className="input-box">
            <input ref={confirmPasswordRef} className="px-4 w-[18rem] h-10" type="password" placeholder='Xác nhận mật khẩu' />
        </div>
        <div className="input-box">
            <button onClick={handleSignup} className="bg-sky-500 rounded-lg btn px-4 w-[18rem] h-10" type="submit">Đăng nhập</button>
        </div>
        <div className="group flex justify-between">
            <Link href={'/forgot-password'}>Điều khoản</Link>
            <Link href={'/signin'}>Đăng nhập</Link>
        </div>
        {loading && <div className="fixed top-0 left-0 z-30 w-full h-full flex items-center justify-center rounded-xl">
            <img src="icons/loading.svg" alt="" className="w-20 h-20" />
        </div>}
    </div>
}

export default SignupForm