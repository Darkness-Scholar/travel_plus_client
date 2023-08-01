import React from 'react'
import { useRouter } from 'next/router'

function withAuth<T>(Component: React.ComponentType<T>) {
    return (props: T) => {
        // check if user is authenticated
        const router = useRouter()

        return <Component {...props!} />
    };
}

export default withAuth