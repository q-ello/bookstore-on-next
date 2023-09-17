import { Montserrat, Open_Sans } from "next/font/google"
import Header from "./Header"

export const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap'
})
export const open_sans = Open_Sans({
    subsets: ['latin'],
    display: 'swap'
})


export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main className={`container ${montserrat.className}`}>
                {children}
            </main>
        </>

    )
}