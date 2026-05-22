"use client";

import { useState } from "react";
import ActiveFilter from "../common/ActiveFilter";


interface RoleFilterClientProps {
  roles: Array<{ title: string }>;
}

export default function RoleFilterClient({ roles }: RoleFilterClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex my-2 gap-2 relative">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex cursor-pointer justify-center align-center select-none gap-1 bg-gray-100 p-2 rounded"
        >
        {isOpen ? <div onClick={() => setIsOpen(isOpen)} className="z-20 cursor-default fixed size-dvw"></div> : '' }
        <div>Filtrera</div>
        <div className="self-center">{isOpen ? <ChevronRightIcon className="w-5 h-5 text-black rotate-90 transition-all duration-300 self-center" /> : <ChevronRightIcon className="w-5 h-5 text-black transition-all duration-300 align-center justify-center" />}</div>
      </div>
      {isOpen && (
        <div 
          className="z-50 bg-white p-3 rounded-b-lg transition-all duration-300 absolute top-full left-0 flex flex-col gap-2 shadow-lg min-w-[150px]"
          onClick={() => setIsOpen(false)}
        >
          <ActiveFilter href="/medarbetare">Alla</ActiveFilter>
          {roles.map((role) => (
            <ActiveFilter 
              key={role.slug} 
              href={`/medarbetare/yrkesroll/${role.slug}`}
            >
              {role.title}
            </ActiveFilter>
          ))}
        </div>
      )}
    </div>
  );
}
