import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/a3t.jpg";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div>
                <Link href="/">
                <Image src={Logo} alt="Logo" className="size-9"/>
                <span className="font-bold">ALMS</span>
                </Link>
            </div>
        </header>
    )
}
    