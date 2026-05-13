// components/RoleFilter.tsx
import { client } from "@/sanity/client";
import ActiveFilter from "../ActiveFilter";



export default async function RoleFilter() {
  // Här filtrerar vi i GROQ. 
  // Exempel: Bara titlar som matchar specifika namn, 
  // eller titlar där du checkat i en box "visaIFilter" i Sanity.
  const roles = await client.fetch(`
    *[_type == "role" && title in ["advokat", "delägare", "biträdande jurist", ]]{ 
      title, 
      "slug": slug.current 
    }
  `);

  return (
    <div className="flex gap-4">
      Filtrera:
      <ActiveFilter href="/medarbetare">Alla</ActiveFilter>
      
      {roles.map((role: any) => (
        <ActiveFilter 
          key={role.slug} 
          href={`/medarbetare/yrkesroll/${role.slug}`}
        >
          {role.title}
        </ActiveFilter>
      ))}
    </div>
  );
}
