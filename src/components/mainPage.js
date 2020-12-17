import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar/sidebar';

export default function MainPage (props){
    return (
        <div>
            <Navbar
                withSidebar={false}
                withCarList={true}
            >
                <Sidebar {...props}>
                    <div>MAIN PAGE</div>
                </Sidebar>
            </Navbar>

        </div>

    )
}