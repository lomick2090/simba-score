import Link from 'next/link'
import React from 'react'
import styles from '../styles/layout.module.css'

export default function Layout({children}) {
    return (
        <div className={styles.home}>
            <div className={styles.header}>
                <ul>
                    <Link href='/'>
                        <li>Home</li>
                    </Link>
                    <Link href='/mantras'>
                        <li>Mantras</li>
                    </Link>
                    <Link href='leaderboard'>
                        <li>Leaderboard</li>
                    </Link>
                </ul>
            </div>
            {children}
        </div>
    )
}