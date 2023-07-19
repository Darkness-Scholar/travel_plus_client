"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"

import { gql, useMutation } from "@apollo/client";
import { useRef, useEffect } from "react";
import useJsonWebToken  from "@/helpers/jwt"

const signin = gql`
    mutation Signin($signinInput: SigninInput!) {
        signin(signinInput: $signinInput) {
            auth {
                id
                token
            }
        }
    }
`

type SigninResponse = {
    data: {
        signin: {
            auth: {
                id: string
                token: string
            }
        }
    }
}

const SigninForm: React.FC<any> = () => {

    const [mutate, { loading }] = useMutation(signin);
    const route = useRouter()

    const passwordRef = useRef<HTMLInputElement>()
    const emailRef = useRef<HTMLInputElement>()

    const handleSignin = async () => {
        try {
            let req = await mutate({
                variables: { signinInput: {
                    email: emailRef.current?.value, 
                    password: passwordRef.current?.value
                } },
            }) as SigninResponse

            console.log(req)

            useJsonWebToken.setToken(req.data.signin.auth.token)

            setCookie("token", req.data.signin.auth.token)
            route.push("/home")
        } catch (err) {
            console.log(err)
        }
    }

    return <div className="signin_form flex flex-col space-y-4 relative py-[3rem] px-[3rem] bg-gray-400 bg-opacity-20 rounded-xl">
        <h1 className='text-4xl font-semibold text-center mb-4'>Đăng Nhập</h1>
        <div className="input-box">
            <input ref={emailRef} className="px-4 w-[17rem] h-10" type="text" placeholder='Email' />
        </div>
        <div className="input-box">
            <input ref={passwordRef} className="px-4 w-[17rem] h-10" type="password" placeholder='Mật khẩu' />
        </div>
        <div className="input-box">
            <button onClick={handleSignin} className="bg-sky-500 rounded-lg btn px-4 w-[17rem] h-10" type="submit">Đăng nhập</button>
        </div>
        <div className="group flex justify-between">
            <Link href={'/forgot-password'}>Quên mật khẩu</Link>
            <Link href={'/signup'}>Đăng ký</Link>
        </div>
    </div>
}

export default SigninForm