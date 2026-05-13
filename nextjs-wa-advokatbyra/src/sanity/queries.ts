import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    title,
    heroTitle,
    heroText,
    heroImage,
  }
`
const courseCategoryQuery = groq`
  *[_type == "course" && defined(category)] | order(category asc) {
    category
  } [0...100]
`

export const courseQuery = groq`
  *[_type == "course" && defined(slug.current)] | order(name asc) [0] {
    _id, 
    courseName, 
    lecturer, 
    slug,
    // Här kan du lägga till fler fält senare
  }
`
export const roleTypeQuery = groq `
  *[_type == "employee"]{
    name,
    "slug": slug.current,
    "roles": roles[]->title
  }
`