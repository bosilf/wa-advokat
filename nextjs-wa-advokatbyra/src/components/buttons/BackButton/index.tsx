'use client'

import Icon, { IconsProps } from "@/components/Icon"
import { useRouter } from "next/navigation"

type BackButtonTypes = {
  text: string,
  className?: string,
  icon?: IconsProps,
}

export default function BackButton({
  text,
  className,
  icon
}:
  BackButtonTypes
) {
  const router = useRouter()
  return (
    <button 
      className={className}
      type="button" 
      onClick={() => router.back()}
    >
      <span>{text || 'Tillbaka'}</span>
      {icon && 
        <Icon 
          name={icon.name} 
          className={icon.className} 
          size={icon.size} 
        />
      }
    </button>
  )
}