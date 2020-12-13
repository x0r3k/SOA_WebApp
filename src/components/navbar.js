import React from 'react';

export default function NavBar (props){
    console.log('navbar');
    return (
        <div>
            <div>Navbar</div>
            {props.children}
        </div>
        
    )
}