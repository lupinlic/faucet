'use client'
import { useState } from 'react'
import Header from "@/components/Header";
import Content from "@/components/Content";


export default function Home() {
  const [selectedToken, setSelectedToken] = useState('LVS')
  return (
    <div className="bg-gray-950 w-screen h-screen">
      <Header />
      <Content />
    </div>
  );
}
