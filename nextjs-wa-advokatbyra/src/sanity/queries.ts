import { defineQuery } from 'next-sanity'

// --- STARTSIDA & BLOGG ---

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0]{
    title,
    heroTitle,
    heroText,
    heroImage
  }
`)

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...12]{
    _id, 
    title, 
    "slug": slug.current, 
    publishedAt
  }
`)

// Universell sökning för dynamiska [slug]-sidor som hanterar både inlägg och medarbetare
export const DATA_QUERY = defineQuery(`
  *[(_type == "post" || _type == "employee") && slug.current == $slug][0]{
    _type,
    _id,
    title,
    name,
    role,
    image,
    bio,
    body,
    publishedAt,
    educationList[]{
      school,
      year
    }
  }
`)

// --- KURSER & UTBILDNINGAR ---

export const ALL_COURSES_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(courseName asc){
    _id,
    courseName,
    "slug": slug.current,
    "categoryTitle": category->title,
    "lecturer": lecturer->{
      name,
      role,
      image
    }
  }
`);


export const COURSE_CATEGORIES_QUERY = defineQuery(`
  *[_type == "courseCategory"]{
    _id,
    title,
    "slug": slug.current
  } | order(title asc)
`)

export const COURSE_CATEGORY_QUERY = defineQuery(`
  *[_type == "course" && defined(category)] | order(category asc) {
    category
  }[0...100]
`)

// Hämtar en lista med kurser (Här lades -> till på lecturer för att få riktig data)
export const COURSE_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(name asc){
    _id, 
    courseName, 
    "slug": slug.current,
    "lecturer": lecturer->{
      name,
      role,
      image
    }
  }
`)

export const COURSE_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "courseCategory" && slug.current == $category][0]{
    title,
    description,
    "courses": *[_type == "course" && category._ref == ^._id] | order(courseName asc) {
      _id,
      courseName,
      "slug": slug.current
    }
  }
`);


// Detaljerad kurssida (Hanterar både gamla WORK_PAGE och DETAIL_PAGE i ett svep)
export const COURSE_DETAIL_PAGE_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0]{
    courseName,
    aimCourse,
    aboutCourse,
    content,
    image,
    length,
    conditionsCourse,
    "categoryTitle": category->title, 
    courseSections[]{
      sectionTitle,
      sectionText
    },
    "lecturer": lecturer->{
      name,
      role,
      number, 
      image,
      email,
      slug
    }
  }
`)

// --- MEDARBETARE & ROLLER ---

export const EMPLOYEES_QUERY = defineQuery(`
  *[_type == "employee" && defined(slug.current)] | order(name asc){
    _id,
    name,
    "slug": slug.current,
    image,
    "roles": roles[]->{ title, "slug": slug.current }
  }
`)

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
`)
