
import React, { createElement } from 'react';
import Image from 'next/image';
interface gemProps  {
    name: string,
    code : string,
}
function codeToArrow(code : string) {
    let res = ''
    for(let c of code){
        if(c === 'U'){
            res += '↑'
        }else if(c === 'R'){
            res += '→'
        }else if(c === 'D'){
            res += '↓'
        }else if(c === 'L'){
            res += '←'
        }
    }
    return res
}

export default function Gem(props : gemProps) {

    return (<div className='flex w-full text-left flex-row items-end '>
        <Image   src = {'/gems/' + props.name + '.svg'  } width={80} height={80} alt = {props.name} />
        <div>
        <p className='p-0 '>{props.name}</p>
        <p>{codeToArrow(props.code)}</p>
        </div>
    </div>)
}