import { defineQuery } from 'next-sanity'

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0]{
    title,
    heroTitle,
    heroText,
    heroImage,
  }
`)

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...12]{
    _id, title, slug, publishedAt
  }
`)

export const COURSE_CATEGORY_QUERY = defineQuery(`
  *[_type == "course" && defined(category)] | order(category asc) {
    category
  } [0...100]
`)

export const COURSE_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(name asc) [0] {
    _id, 
    courseName, 
    lecturer, 
    slug,
  }
`)

// export const EMPLOYEE_ROLE_QUERY = defineQuery( `
//   *[_type == "employee"]{
//     name,
//     "slug": slug.current,
//     "roles": roles[]->title
//   }
// `)

export const EMPLOYEE_ROLE_QUERY = defineQuery(`
  {
    "role": *[_type == "role" && slug.current == $role][0] { title },
    "employees": *[
      _type == "employee" &&
      $role in roles[]->slug.current &&
      defined(slug.current)
    ] | order(name asc) {
      _id,
      name,
      "roles": roles[]->{ title, "slug": slug.current },
      "slug": slug.current,
      image
    }
  }
`);

export const EMPLOYEES_QUERY = defineQuery(`
  *[_type == "employee" && defined(slug.current)]
  | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    image,
    "roles": roles[]->{ title, "slug": slug.current }
  }
`)

export const EMPLOYEE_PAGE_QUERY = defineQuery(`
  *[_type == "employee" && slug.current == $slug][0]{

    name,
    "slug": slug.current,
    number,
    email,
    bio,
    image{
      asset,
      alt
    },
    "roles": roles[]->{ title, "slug": slug.current },
    educationList[]{
      school,
      yearStart,
      yearEnd
    }
  }
`);

export const COURSE_CATEGORIES_QUERY = defineQuery(`
  *[_type == "courseCategory"]{
    _id,
    title,
    "slug": slug.current
  } | order(title asc)
`);

export const COURSE_DETAIL_PAGE_QUERY = defineQuery(`*[_type == "course" && slug.current == $slug]{
  courseName,
  aimCourse,
  aboutCourse,
  courseSections[]{
    sectionTitle,
    sectionText
  },
  "categoryTitle": category->title, 
  length,
  conditionsCourse,
  category,
  "lecturer": lecturer->{
    name,
    role,
    number, 
    image,
    email,
    courseSections,
    slug
  }
} [0]`)

export const WORK_PAGE_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0]{
    courseName,
    content,
    image,
    "categoryTitle": category->title, 
    "lecturer": lecturer->{
      name,
      role,
      number,
      image,
      email,
      slug 
    }
  }
`);