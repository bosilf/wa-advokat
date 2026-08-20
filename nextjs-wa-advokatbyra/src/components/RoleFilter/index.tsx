import { client } from "@/sanity/client"
import { ROLES_QUERY } from "@/sanity/queries"
import RoleFilterClient from "../RoleFilterProps"

export default async function RoleFilter() {
  const roles = await client.fetch(ROLES_QUERY)

  const safeRoles = roles
    .filter(
      (role): role is { title: string; slug: string } =>
        Boolean(role.title) && Boolean(role.slug)
    )

  return <RoleFilterClient roles={safeRoles} />
}