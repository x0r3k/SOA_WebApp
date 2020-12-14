import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar/sidebar';

export default function MainPage (){
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