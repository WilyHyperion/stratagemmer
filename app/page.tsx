"use client";
import Image from "next/image";
import Header from "./components/header";
import { useEffect, useState } from "react";
import Gem from "./components/gem";
const gems = require("../public/gems.json") as { name: string, code:string}[];
export default function Home() {
  const [unselectedgems, setUnselected] = useState([] as { name: string, code:string}[]);
  const [selectedgems, setSelected] = useState(gems);
  //#ffe80a
  return (
    <>
      <main className="bg-[#1A1A1A] min-w-full min-h-[100vh] pt-[10%]">
        <Header />
        <div className="h-full w-full flex items-center justify-center   ">
          <div className="text-4xl font-bold text-white bg-gray-500 px-16 py-16 rounded-xl flex items-center flex-col gap-5 w-[80%] ">
            Stratagemmer
            <div className=" w-full flex flex-row items-center">

            <div className = " flex items-center gap-5 border-r-4  flex-col w-[50%] h-[50vh] bg-[#1A1A1A]">
            <h2 className="white text-4xl">Unselected</h2>
              <ul className="bg-[#1A1A1A] overflow-scroll overflow-x-clip" id="selectTray">
                {unselectedgems.map((gem: { name: string, code:string ; }, i: number) => (
                  <li className="w-full" key={gem?.name} onClick={() => {
                    setUnselected(unselectedgems.filter((g) => g.name !== gem.name));
                    setSelected([...selectedgems, gem]);
                  }}>
                    <Gem name={gem.name} code={gem.code} />
                  </li>
                ))}
              </ul>
              </div>
              <div className = " flex items-center gap-5 border-r-4  flex-col w-[50%] h-[50vh] bg-[#2e1616]">
              <h2 className="white text-4xl">Selected</h2>
              <ul className="bg-[#1A1A1A] overflow-scroll overflow-x-clip" id="selectedtray">
                {selectedgems.map((gem: { name: string, code:string ; }, i: number) => (
                  <li className="w-full" key={gem?.name} onClick={() => {
                    setSelected(selectedgems.filter((g) => g.name !== gem.name));
                    setUnselected([...unselectedgems, gem]);
                  }}>
                    <Gem name={gem.name} code={gem.code} />
                  </li>
                ))}
                </ul>
                </div>
            </div>
            <button className="bg-[#505050] text-white px-4 py-2 rounded-lg" onClick={
              () => {
                window.location.href = "/game?gems=" + selectedgems.map((gem) => gem.name).join(",");
              }
            }>Start</button>
          </div>
        </div>
      </main>
    </>
  );
}
