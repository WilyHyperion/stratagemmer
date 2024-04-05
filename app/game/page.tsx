'use client'
import { useSearchParams } from 'next/navigation'
import Header from '../components/header'
import { use, useEffect, useState } from 'react'
import Image from 'next/image'
const gems = require('../../public/gems.json') as { name: string, code: string }[]
function codeToArrow(code: string) {
    let res = ''
    for (let c of code) {
        if (c === 'U') {
            res += '↑'
        } else if (c === 'R') {
            res += '→'
        } else if (c === 'D') {
            res += '↓'
        } else if (c === 'L') {
            res += '←'
        }
    }
    return res
}

export default function Game() {
    const params = useSearchParams()
    let selectedgems = params.get('gems')?.split(',') || [] as any
    selectedgems = selectedgems.map((name: string) => gems.find((gem) => gem.name === name)) as any
    const [currentGem, setCurrentGem] = useState(selectedgems[0])
    const [score, setScore] = useState(0)
    const [time, setTime] = useState(1000)
    const [inputted, setInputted] = useState('')
   
    useEffect(() => {
        function checkNew(inputted: string){
            if (inputted.length === currentGem.code.length) {
                if (inputted === currentGem.code) {
                    setScore(score + 1)
                    setCurrentGem(selectedgems[Math.floor(Math.random() * selectedgems.length)])
                    setInputted('')
                } else {
                    return
                }
            }
        }
        checkNew(inputted)
    }, [currentGem.code, inputted, score, selectedgems])
    window.onkeydown =  (e) => {
        if (inputted.length === currentGem.code.length) {
            if (inputted === currentGem.code) {
                setScore(score + 1)
                setCurrentGem(selectedgems[Math.floor(Math.random() * selectedgems.length)])
                setInputted('')
            } else {
                return
            }
        }
        if (e.key == 'w' || e.key == 'ArrowUp') {
            if (currentGem.code[inputted.length] == 'U') {
                setInputted(inputted + 'U', )
                return
            }
        } else if (e.key == 'a' || e.key == 'ArrowLeft') {
            if (currentGem.code[inputted.length] == 'L') {
                setInputted(inputted + 'L')
                return
            }
        }
        else if (e.key == 's' || e.key == 'ArrowDown') {
            if (currentGem.code[inputted.length] == 'D') {
                setInputted(inputted + 'D')
                return
            }
        }
        else if (e.key == 'd' || e.key == 'ArrowRight') {
            if (currentGem.code[inputted.length] == 'R') {
                setInputted(inputted + 'R')
                return
            }
        }
        setInputted('')


    }
    return (
        <>
            <Header />
            <div id="game" className="flex flex-row items-center justify-center bg-gray-500 w-full min-h-[100vh]">
                <div className="flex flex-col items-center gap-5 w-[80%] bg-black text-white">
                    <Image src={'/gems/' + currentGem.name + '.svg'} alt={currentGem.name} width={100} height={100} />
                    <h1 className='font-bold text-xl'>{currentGem.name}<br />
                        {codeToArrow(currentGem.code) }<br/>
                        {codeToArrow(inputted) + " "}
                    </h1>
                </div>
            </div>
        </>
    )
}