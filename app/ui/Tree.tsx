"use client";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import LinkList from "@/app/ui/link_list";

export default function Tree() {
  const linkList = LinkList();
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();
  const get_index_link = () => {
    return linkList.findIndex((link) => {
      return link.href === pathname;
    });
  };
  const [hidden, setHidden] = useState(true);
  const [selected, setSelected] = useState(get_index_link());

  const changeLink = (number: number) => {
    if (selected + number >= 0 && selected + number < linkList.length) {
      links.current[selected + number]?.focus();
      setSelected(selected + number);
    }
  };

  return (
    <aside id="tree" className="overflow-y-auto border-r-2 border-zinc-600 ">
      <nav className="w-72 text-white text-lg">
        <div className="group flex items-center py-1">
          <h1 className="text-lg text-cyan-100 font-semibold ml-4">Neo-tree</h1>
        </div>
        <div className="group flex items-center">
          <h2 className="text-lg font-mono ml-4">~/work/projects/mattszein</h2>
        </div>

        {linkList.map((link, index) => (
          <Link
            key={index}
            className={clsx(
              "group flex items-center space-x-2 hover:bg-gray-700 py-1",
              { "px-2": link.level == 1 },
              {
                "bg-gray-800": index === get_index_link() && index !== selected,
              },
              { "bg-gray-700": index === selected },
            )}
            href={link.href}
          >
            <link.icon
              className={clsx("group-hover:text-blue-400 ml-6", {
                "ml-8": link.level === 1,
              })}
            />
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
