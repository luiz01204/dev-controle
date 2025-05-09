import React, { ReactNode } from 'react'
import DashBoardHeader from './components/header'

export default function layout({children }: {children: ReactNode}) {
    return (
        <main>
            <DashBoardHeader />
            {children}
        </main>
    )
}
