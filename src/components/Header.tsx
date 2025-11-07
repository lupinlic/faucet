import { ChevronDown } from 'lucide-react';
import { Space_Grotesk } from 'next/font/google'
const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // tuỳ ý bạn
    display: 'swap',
})

export default function Header() {
    return (
        <div className={`${spaceGrotesk.className} h-[70px] border-b border-gray-500 flex items-center justify-between px-16`}>
            <div className='flex items-center'>
                <div className='flex items-center gap-2'>
                    <img src="/logo.png" alt="Logo" className='h-10 w-10' />
                    <p className='text-white font-bold'>LVS CHAIN</p>
                </div>
                <ul className='flex items-center mx-4'>
                    <li className='text-[#C4C5CB] text-sm font-medium flex items-center mx-3'>Chains <ChevronDown className="w-4 h-4 mx-1" />   </li>
                    <li className='text-[#C4C5CB] text-sm font-medium  flex items-center mx-3'>Build <ChevronDown className="w-4 h-4 mx-1" /> </li>
                    <li className='text-[#C4C5CB] text-sm font-medium flex items-center mx-3'>Explore <ChevronDown className="w-4 h-4 mx-1" /> </li>
                    <li className='text-[#C4C5CB] text-sm font-medium flex items-center mx-3'>Accelerate <ChevronDown className="w-4 h-4 mx-1" /> </li>
                    <li className='text-[#C4C5CB] text-sm font-medium flex items-center mx-3'>Connect <ChevronDown className="w-4 h-4 mx-1" /> </li>
                </ul>
            </div>
            <div className=''>
                <button className='bg-white p-2 rounded font-medium text-sm'>Get Started</button>
            </div>

        </div>
    )
}
