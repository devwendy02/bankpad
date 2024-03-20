import {useEffect, useState} from 'react';
import {HashLink} from 'react-router-hash-link'

type MenuType = {
    label?: string;
    icon?: any;
    isActive?: boolean
    href?: string
    isLink?: boolean
};

export default function MenuItem({label, icon, isActive, href, isLink}: MenuType) {
    const classStr = 'flex items-center text-gray-700 dark:text-white hover:dark:text-yellow-1 hover:text-yellow-2'
    return (
        <li>
            {isLink
                ? <a href={href} target="_blank" className={isActive ? `${classStr} active-menu` : classStr}>
                    <div className="relative z-10 flex space-x-5 items-center px-6 py-3.5 transition-all duration-200">
                        {icon}
                        <span>{label}</span>
                    </div>
                </a>
                :
                <HashLink to={href} smooth className={isActive ? `${classStr} active-menu` : classStr}>
                    <div className="relative z-10 flex space-x-5 items-center px-6 py-3.5 transition-all duration-200">
                        {icon}
                        <span>{label}</span>
                    </div>
                </HashLink>
            }
        </li>
    )
}

