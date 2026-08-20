import { defineQuery } from 'next-sanity'

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "home"][0]{
    homeTitle,
    homeEyebrow,
    introSection {
      introTitle,
      introText,
    },
    tjansterSection {
      tjansterTitle,
      tjansterEyebrow,
      tjansterText,
    },
    employeeSection {
      employeeTitle,
      employeeEyebrow,
      employeeText,
    },
    servicesCard {
      descriptionText,
      hideDescription,
      hideAccordion,
      hideImage,
      hideCardSmall,
      accordions[] {
        title,
        description,
        btnHref,
        icon
      }
    },
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

export const DATA_QUERY = defineQuery(`
  *[(_type == "post" || _type == "employee") && slug.current == $slug][0]{
    _type,
    _id,
    title,
    firstName,
    lastName,
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

export const ALL_COURSES_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(courseName asc){
    _id,
    courseName,
    "slug": slug.current,
    "categoryTitle": category->title,
    "lecturer": lecturer->{
      firstName,
      lastName,
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

export const COURSE_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(courseName asc) {
    _id,
    courseName,
    "slug": slug.current,
    "lecturer": lecturer->{
      firstName,
      lastName,
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
      firstName,
      lastName,
      "role": roles[0]->title,
      number, 
      image,
      email,
      slug
    }
  }
`)

// --- MEDARBETARE & ROLLER ---

export const EMPLOYEES_QUERY = defineQuery(`
  *[_type == "employee" && defined(slug.current)] | order(lastName asc){
    _id,
    firstName,
    lastName,
    number,
    email,
    bio,
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
    ] | order(lastName asc) {
      _id,
      firstName,
      lastName,
      "roles": roles[]->{ title, "slug": slug.current },
      "slug": slug.current,
      image
    }
  }
`)

export const ROLES_QUERY = defineQuery(`
  *[
    _type == "role" &&
    count(*[
      _type == "employee" &&
      references(^._id)
    ]) > 0
  ]
  | order(title asc) {
    title,
    "slug": slug.current
  }
`)

export const EMPLOYEE_PAGE_QUERY = defineQuery(`
  *[_type == "employee" && slug.current == $slug][0]{
    firstName,
    lastName,
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
      education,
      yearStart,
      yearEnd
    }
  }
`)