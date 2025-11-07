'use client';

import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
type Coin = {
    name: string;
    icon: string;
    num: number;
    explorer: string;
};

type Props = {
    selected: Coin;
    setSelected: (coin: Coin) => void;
    coins: Coin[];
};

export default function CustomSelect({ selected, setSelected, coins }: Props) {


    return (
        <div className="w-60">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <Listbox.Button className="relative border h-[48px] text-sm border-gray-400 rounded-md w-56 mt-3 p-2 bg-[#373943] text-white focus:outline-none focus:ring-1 focus:ring-yellow-300">
                        <span className="flex items-center">
                            <img src={selected.icon} alt="" className="w-5 h-5 mr-2" />
                            <span className='mx-1'>{selected.num}</span>

                            {selected.name}
                        </span>
                        <span className="absolute inset-y-0 right-2 flex items-center">
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </span>
                    </Listbox.Button>

                    <Listbox.Options className="absolute mt-2 w-full rounded bg-gray-600 shadow-lg z-10 border border-gray-200">
                        {coins.map((coin) => (
                            <Listbox.Option
                                key={coin.name}
                                value={coin}
                                className="flex items-center px-3 py-2 hover:bg-gray-700 cursor-pointer"
                            >
                                <img src={coin.icon} alt="" className="w-5 h-5 mr-2" />
                                <span className='mx-1'>{coin.num}</span>
                                {coin.name}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );
}
