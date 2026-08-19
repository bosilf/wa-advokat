
// // Document types
// import page from './documents/page'

import page from "./documents/page"
import { cardContainer } from "./objects/cardContainer"
import { courseCategories } from "./objects/courseCategories"
import { courses } from "./documents/courses"
import { employee } from "./documents/employee"
import { role } from "./documents/role"
import { tjanster } from "./documents/tjanster"
import settings from "./singletons/settings"
import { home } from "./singletons/home"
import { section } from "./objects/section"
import { menu } from "../schemaTypes/menu"

const documents = [
  page,
  courses,
  employee,
  tjanster,
  role,
  menu
]

const objects = [
  cardContainer,
  courseCategories
]

export const schemaTypes = [...objects, ...documents, settings, home, section]