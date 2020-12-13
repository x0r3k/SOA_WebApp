import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default function MainPage (){
    console.log('test');
    return (
        <div>
            <Navbar
                withSidebar={false}
            >
                <Sidebar>
                    <div>MAIN PAGE</div>
                </Sidebar>
            </Navbar>

        </div>

    )
}