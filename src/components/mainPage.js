import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar/sidebar';

export default function MainPage (props){
    return (
        <div>
            <Navbar
                withSidebar={false}
            >
                <Sidebar {...props}>
                    <div>MAIN PAGE</div>
                </Sidebar>
            </Navbar>

        </div>

    )
}