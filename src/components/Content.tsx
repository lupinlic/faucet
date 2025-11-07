import { Zen_Dots } from 'next/font/google'
import { Check } from 'lucide-react';
import CustomSelect from './CustomSelect';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast';


const zenDots = Zen_Dots({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})
const coins = [
    {
        name: 'Ethereum Sepolia',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png',
        num: 0.001,
        explorer: 'https://sepolia.etherscan.io/tx/',
    },
    {
        name: 'Arbitrum Sepolia',
        icon: 'https://cdn.prod.website-files.com/6340702a42dd5b18eb404a68/66bf88764cf67e76bef395bd_Arbitrum%20Hero.png',
        num: 0.001,
        explorer: 'https://sepolia.arbiscan.io/tx/',
    },
];

export default function Content() {

    const [address, setAddress] = useState('');
    const [selected, setSelected] = useState(coins[0]);
    const isValid = selected && address.trim() !== '';
    const [isLoading, setIsLoading] = useState(false);
    const [txHash, setTxHash] = useState('');
    const handleClaimToken = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const response = await axios.post('http://192.168.1.68:8003/api/faucets/claim', {
                address: address.trim(),
                token_name: selected.name,
            });
            setTxHash(response.data.txHash || '');
            toast.success('Token sent successfully!')
        } catch (error: any) {
            if (error.response.data.statusCode === 400) {
                toast.error('Mỗi địa chỉ 24 tiếng chỉ được nhận 1 lần!');
                setTxHash('');
            } else if (error.response.data.message === "Faucet transfer failed") {
                toast.error('Hết !!!! bye bye !!!!');
            } else {
                toast.error('Failed to send token!');
                console.error('Error:', error.response.data);
            }
        }
        finally {
            setAddress('');
            setSelected(coins[0]);
            setIsLoading(false);
        }
    };
    return (
        <div className='text-white flex items-center flex-col justify-center mt-[90px]'>
            <Toaster position='top-right' />
            <p className={`${zenDots.className} text-[32px]`}>
                LVS<span className='text-[#FFE900] mx-3'>FAUCET</span>
            </p>
            <div className='h-auto w-[700px] rounded-2xl p-10 bg-[#1E2026] mt-10'>
                <p className='text-xl'>Get Test Tokens</p>
                <p className='mt-2 flex items-center'>
                    <Check className="w-5 h-5 text-gray-500" />
                    <span className='text-[#8C8F9B] text-sm mx-1'> 0.002 LVS on BSC Mainnet is needed for test funding.</span>
                    <a href='#' className='text-[#FFE900] underline  text-[14px]'>How to get LVS</a>
                </p>
                <p className='mt-2 flex items-center'>
                    <Check className="w-5 h-5 text-gray-500" />
                    <span className='text-[#8C8F9B] text-sm mx-1'>Every 24 hours, LVS Testnet tokens can be claimed.</span>
                </p>
                <div className='py-3 border-t border-gray-700 mt-3'>
                    <div className='flex '>
                        <div className='flex flex-col flex-1/3 pr-5'>
                            <label htmlFor="" className='text-[#8C8F9B]'>Select token</label>
                            {/* <select className='border h-[48px] border-gray-400 rounded-md w-50 mt-3 p-2 bg-[#373943] text-white focus:outline-none focus:ring-1 focus:ring-yellow-300'>
                                <option value="BNB">
                                    <img src="https://images.seeklogo.com/logo-png/47/2/bnb-bnb-logo-png_seeklogo-476074.png" alt="BNB Logo" className='inline-block h-5 w-5 mr-2' />
                                    BNB</option>
                                <option value="BUSD">BUSD</option>
                                <option value="USDT">USDT</option>
                            </select> */}
                            <CustomSelect selected={selected} setSelected={setSelected} coins={coins} />
                        </div>
                        <div className='flex flex-col flex-2/3'>
                            <label htmlFor="" className='text-[#8C8F9B]'>Wallet Address</label>
                            <input type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className='border text-sm h-[48px] border-gray-400 rounded-md w-full mt-3 p-2 bg-[#373943] text-white focus:outline-none focus:ring-1 focus:ring-yellow-300'
                                placeholder='Enter  your BNB Smart Chain Testnest address' />
                        </div>
                    </div>

                    <button
                        disabled={!isValid}
                        onClick={() => {
                            if (!isValid) return;
                            setIsLoading(true);
                            handleClaimToken();
                        }
                        }
                        className={`rounded-md w-full mt-8 p-3 text-white transition 
    ${isValid
                                ? 'bg-yellow-400 hover:bg-yellow-500 cursor-pointer'
                                : 'bg-[#373943] opacity-50 cursor-not-allowed'}`}
                    >
                        {isLoading ? (
                            <>
                                <svg className='animate-spin mr-2 h-4 w-4 text-white' viewBox='0 0 24 24'>
                                    <circle
                                        className='opacity-25'
                                        cx='12'
                                        cy='12'
                                        r='10'
                                        stroke='white'
                                        strokeWidth='4'
                                        fill='none'
                                    />
                                    <path
                                        className='opacity-75'
                                        fill='white'
                                        d='M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z'
                                    />
                                </svg>
                                Sending...
                            </>
                        ) : (
                            `Claim ${selected.num} ${selected.name}`
                        )}
                    </button>

                    {txHash && (
                        <p className='text-green-400 text-sm mt-4 text-center'>
                            ✅ Transaction:{' '}
                            <a
                                href={`${selected.explorer}${txHash}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='underline text-yellow-400'
                            >
                                {txHash.slice(0, 10)}...
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
