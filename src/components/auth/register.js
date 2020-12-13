import React, { useEffect } from 'react';

export default function Register ({history, token}){
    useEffect(() => {
        if(token) history.push('/');
    }, []);

    return (
        <div>REGISTER PAGE</div>
    )
}