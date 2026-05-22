import { client } from "@/sanity/client";
import { ROLES_QUERY } from "@/sanity/queries";
import RoleFilterClient from "../RoleFilterProps";
// import { FilterProp } from "@/sanity/types";


export default async function RoleFilter() {
  // const yrkesrollSelection = {}yrkesroll
// yrkesroll={yrkesrollSelection}
  const roles = await client.fetch(ROLES_QUERY);
  return <RoleFilterClient roles={roles}  />;
}
