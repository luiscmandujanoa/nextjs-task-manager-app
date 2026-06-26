"use client";
import Link from "next/link";
import React from "react";
import {
  FaHouse,
  FaListCheck,
  FaCheck,
  FaClipboardList,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathName = usePathname();

  return (
    <div className="bg-colorBg2 border-borderColor2 flex w-[15rem] flex-col justify-between rounded-xl border border-3 p-[2rem]">
      <p>USER2</p>
      <ul>
        <li
          className={`hover:bg-activeNavLinkHover mx-[0.3rem] my-0 p-[0.5rem] ${pathName === "/" ? "bg-activeNavLink" : ""}`}
        >
          <Link href="/" className="flex gap-4">
            <FaHouse size={20} /> All Tasks
          </Link>
        </li>
        <li
          className={`hover:bg-activeNavLinkHover mx-[0.3rem] my-0 p-[0.5rem] ${pathName === "/completed" ? "bg-activeNavLink" : ""}`}
        >
          <Link href="/completed" className="flex gap-4">
            <FaListCheck size={20} /> Completed
          </Link>
        </li>
        <li
          className={`hover:bg-activeNavLinkHover mx-[0.3rem] my-0 p-[0.5rem] ${pathName === "/important" ? "bg-activeNavLink" : ""}`}
        >
          <Link href="/important" className="flex gap-4">
            <FaCheck size={20} /> Important
          </Link>
        </li>
        <li
          className={`hover:bg-activeNavLinkHover mx-[0.3rem] my-0 p-[0.5rem] ${pathName === "/incomplete" ? "bg-activeNavLink" : ""}`}
        >
          <Link href="/incomplete" className="flex gap-4">
            <FaClipboardList size={20} /> Incomplete
          </Link>
        </li>
      </ul>
      <p>BUTTON</p>
    </div>
  );
}

export default Sidebar;
