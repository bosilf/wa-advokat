import { defineQuery } from 'next-sanity'
import { LINK_RESOLVER } from './linkResolver'

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage"][0] {
    hero {
      eyebrow,
      title,
      image {
        asset,
        crop,
        hotspot,
        alt
      }
    }
  }
`);

export const OM_OSS_PAGE_QUERY = defineQuery(`
  ${LINK_RESOLVER}

  *[
  _type == "aboutPage" &&
  _id == "about-page"
  ][0] {
    hero {
      eyebrow,
      title,

      image {
        asset,
        crop,
        hotspot,
        alt
      }
    },

    benefitsSection {
      items[] {
        _key,
        title,
        text,
        icon
      }
    },

    teamSection {
      eyebrow {
        text,
        "resolvedLink": wa::resolveLinkRef(link)
      },

      title,
      text,

      "teamMembers": teamMembers[]-> {
        _id,
        firstName,
        lastName,
        "slug": slug.current,
        excerpt,
        professionalTitle,

        image {
          asset,
          crop,
          hotspot,
          alt
        },

        "roles": roles[]-> {
          _id,
          title,
          "slug": slug.current
        }
      },

      cta {
        variant,
        hasIcon,
        icon,
        ariaLabel,
        "resolvedLink": wa::resolveNavItem(link)
      }
    },

    practiceAreasSection {
      eyebrow {
        text,
        "resolvedLink": wa::resolveLinkRef(link)
      },

      title,
      text,

      "services": services[]-> {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        image {
          asset,
          crop,
          hotspot,
          alt
        },
      },

      cta {
        variant,
        hasIcon,
        icon,
        ariaLabel,
        "resolvedLink": wa::resolveNavItem(link)
      }
    },

    adviceSection {
      eyebrow {
        text,
        "resolvedLink": wa::resolveLinkRef(link)
      },

      title,
      text,

      cta {
        variant,
        hasIcon,
        icon,
        ariaLabel,
        "resolvedLink": wa::resolveNavItem(link)
      }
    },

    coursesSection {
      eyebrow {
        text,
        "resolvedLink": wa::resolveLinkRef(link)
      },
      title,
      subheading,
      text,
    
      "courseAccordions": courses[]-> {
        "_key": _id,
        "title": courseName,
      
        "description": coalesce(
          pt::text(aimCourse),
          pt::text(aboutCourse)
        ),
      
        "btnHref": select(
          defined(slug.current) =>
            "/juridikkurser/" + slug.current,
          null
        ),
      
        "icon": true,

      },
    
      cta {
        variant,
        hasIcon,
        icon,
        ariaLabel,
        "resolvedLink": wa::resolveNavItem(link)
      },
    },

    contactSection {
      eyebrow {
        text,
        "resolvedLink": wa::resolveLinkRef(link)
      },

      title,
      text,
      showContactForm,

      form {
        title,
        nameLabel,
        emailLabel,
        phoneLabel,
        messagePlaceholder,
        submitLabel
      }
    },

    additionalSections[] {
      ...,
      eyebrow {
        text,
        "resolvedLink": wa::resolveLinkRef(link)
      },

      blocks[] {
        ...
      }
    },

    seo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      noIndex,
      socialImage {
        asset,
        crop,
        hotspot,
        alt
      }
    }
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_type == "tjansterPage"][0] {
    hero {
      eyebrow,
      title,
      image {
        asset,
        crop,
        hotspot,
        alt
      }
    }
  }
`);

export const HOMEPAGE_QUERY = defineQuery(`
  ${LINK_RESOLVER}

  *[_type == "home"][0] {
    homeTitle,
    homeEyebrow,

    introSection {
      introTitle,
      introText
    },

    tjansterSection {
      tjansterTitle,
        
      tjansterEyebrow {
        text,
        "resolvedLink": wa::resolveLinkRef(link)
      },
    
      tjansterText,
    
      "tjansterAccordions": services[]-> {
        "_key": _id,
        title,
        "description": excerpt,
      
        "btnHref": select(
          defined(slug.current) =>
            "/rattsomraden/" + slug.current,
          null
        ),
      
        "icon": true
      },
    
      tjansterCta {
        _type == "button" => {
            "resolvedLink": wa::resolveNavItem(link)
          },
        variant,
        hasIcon,
        icon,
        ariaLabel,
        "resolvedLink": wa::resolveNavItem(link)
      }
    },

    employeeSection {
  employeeTitle,

  employeeEyebrow {
    text,
    "resolvedLink": wa::resolveLinkRef(link)
  },

  employeeText,

  "employees": teamMembers[]-> {
    _id,
    firstName,
    lastName,
    "slug": slug.current,
    excerpt,
    professionalTitle,

    image {
      asset,
      crop,
      hotspot,
      alt
    },

    "roles": roles[]-> {
      _id,
      title,
      "slug": slug.current
    }
  }
},

    contactSection {
      contactTitle,

      contactEyebrow {
        text,
        "resolvedLink": wa::resolveLinkRef(link)
      },

      contactText,

      contactCta {
        hasButton,
        "variant": btnProps.variant,
        "hasIcon": btnProps.hasIcon,
        "icon": btnProps.icon,
        "ariaLabel": btnProps.ariaLabel,
        
        "resolvedLink": select(
          hasButton == false => null,
          wa::resolveNavItem(btnProps.link)
        )
      }
    },

    seo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      noIndex,
      socialImage {
        asset,
        crop,
        hotspot,
        alt
      }
    }
  }
`);


export const NAVIGATION_QUERY = defineQuery(`
  ${LINK_RESOLVER}

  *[_type == "navigation"][0] {
    headerNavigation[] {
      _key,
      hasDropdown,
      dropdownSource,

      "resolvedLink": wa::resolveNavItem(@),

      "courses": select(
  dropdownSource == "courses" =>
    *[
      _type == "courseCategory" &&
      defined(slug.current)
    ]
    | order(title asc) {
      "_key": _id,
      title,
      "slug": slug.current,
      "href": "/juridikkurser/" + slug.current,

      "courses": *[
        _type == "course" &&
        category._ref == ^._id &&
        defined(slug.current)
      ]
      | order(courseName asc) {
        _id,
        "_key": _id,
        "title": courseName,
        "href":
          "/juridikkurser/" +
          category->slug.current +
          "/" +
          slug.current
      }
    },

  []
),

      "dropdownItems": select(
        dropdownSource == "employees" =>
          *[
            _type == "employee" &&
            defined(slug.current)
          ]
          |  {
            _id,
            firstName,
            lastName,

            "title": firstName + " " + lastName,
            "href":
              "/om-oss/" +
              slug.current,

            image {
              ...,
              asset-> {
                _id,
                _type,
                url,
                metadata {
                  dimensions,
                  lqip
                }
              }
            },

            "jobTitles": roles[]->title
          },

        dropdownSource == "services" =>
          *[
            _type == "service" &&
            defined(slug.current)
          ]
          | order(title asc) {
            _id,
            title,

            "href":
              "/rattsomraden/" +
              slug.current
          },

        dropdownSource == "manual" =>
          dropdownItems[] {
            "_id": _key,
            _key,

            "title":
              wa::resolveNavItem(@).label,

            "href":
              wa::resolveNavItem(@).href
          },

        []
      )
    },

    footerNavigation[] {
      _key,
      "resolvedLink": wa::resolveNavItem(@)
    },

    footerCourseNavigation[] {
      _key,
      "resolvedLink": wa::resolveNavItem(@)
    },

    footerPracticeAreaNavigation[] {
      _key,
      "resolvedLink": wa::resolveNavItem(@)
    },

    legalNavigation[] {
      _key,
      "resolvedLink": wa::resolveNavItem(@)
    }
  }
`);

export const PAGE_BY_PATH_QUERY = defineQuery(`
  *[
    _type == "page" &&
    path.current == $path
  ][0] {
    _id,
    title,
    "path": path.current,

    sections[] {
      _key,
      _type,
      heading,
      theme,

      eyebrow {
        text,
        link-> {
          title,
          linkType,
          href,
          internalReference-> {
            _type,
            title,
            courseName,
            firstName,
            lastName,
            "slug": slug.current
          }
        }
      },

      blocks[] {
        ...,

        _type == "employeeGridBlock" => {
          ...,

          "employees": select(
            selectionMode == "all" =>
              *[
                _type == "employee" &&
                defined(slug.current)
              ] | order(lastName asc) {
                _id,
                firstName,
                lastName,
                "slug": slug.current,
                professionalTitle,
                image {
                  asset,
                  crop,
                  hotspot,
                  alt
                },
                "roles": roles[]->{
                  title
                }
              },

            employees[]-> {
              _id,
              firstName,
              lastName,
              "slug": slug.current,
              professionalTitle,
              image {
                asset,
                crop,
                hotspot,
                alt
              },
              "roles": roles[]->{
                title
              }
            }
          )
        },

        _type == "serviceGridBlock" => {
          ...,
          "services": services[]-> {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            image {
              asset,
              crop,
              hotspot,
              alt
            }
          }
        }
      }
    },

    seo
  }
`);

export const ARTICLE_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc)[0...12]{
    _id, 
    title, 
    "slug": slug.current, 
    publishedAt
  }
`);

export const DATA_QUERY = defineQuery(`
  *[(_type == "post" || _type == "employee") && slug.current == $slug][0]{
    _type,
    _id,
    title,
    firstName,
    lastName,
    role,
    image {
      asset,
      crop,
      hotspot,
      alt
    },
    bio,
    body,
    publishedAt,
    educationList[]{
      school,
      year
    }
  }
`);

export const COURSE_MAIN_PAGE_QUERY = defineQuery(`
  *[_type == "courseMainPage"][0] {
    title,
    eyebrow,

    image {
      asset,
      crop,
      hotspot,
      alt
    },

    introSection {
      eyebrow {
        ...
      },
      title,
      text {
        ...,
        block[] {
          ...
        }
      }
    },

    courseOpportunities {
      title,
      textContent {
        ...,
        block[] {
          ...
        }
      }
    },

    "cardContainers": courseCategories[] {
      _key,

      description {
        ...,
        block[] {
          ...
        }
      },

      chosenCourseCategory-> {
        _id,
        title,
        slug,

        image {
          asset,
          crop,
          hotspot,
          alt
        },

        courseLecturerSection {
          "lecturer": lecturer-> {
            _id,
            firstName,
            lastName,
            professionalTitle,
            slug,

            image {
              asset,
              crop,
              hotspot,
              alt
            },

            roles[]-> {
              _id,
              title
            }
          }
        }
      },

      "links": courseList[]-> {
        _id,
        "title": courseName,

        "href": select(
          defined(category->slug.current) &&
          defined(slug.current) =>

          "/juridikkurser/" +
          category->slug.current +
          "/" +
          slug.current,

          null
        )
      }
    },

    courseInfo {
      infoEyebrow {
        ...
      },
      info {
        ...
      },
      infoBody {
        ...,
        block[] {
          ...
        }
      }
    },

    courseCategoryBlock {
      infoEyebrow {
        ...
      },
      info {
        ...
      },
      infoBody {
        ...,
        block[] {
          ...
        }
      }
    },

    slug,

    seo {
      ...
    }
  }
`);

export const COURSE_CATEGORY_PAGE_QUERY =
  defineQuery(`
    ${LINK_RESOLVER}

    *[
      _type == "courseCategory" &&
      slug.current == $categorySlug
    ][0] {
      _id,
      _type,
      title,
      excerpt,

      "slug": slug.current,

      image {
        asset,
        crop,
        hotspot
      },

      introTitle,

      introText {
        ...,
        block[] {
          ...
        }
      },

      companyCourseSection {
        title {
          ...
        },

        text {
          ...,
          block[] {
            ...
          }
        }
      },

      courseLecturerSection {
        image {
          asset,
          crop,
          hotspot,
          alt
        },

        lecturer-> {
          _id,
          _type,
          firstName,
          lastName,
          email,
          phone,
          excerpt,

          "slug": slug.current,

          "jobTitles":
            roles[]->title,

          image {
            asset,
            crop,
            hotspot,
            alt
          }
        },

        text {
          ...,
          block[] {
            ...
          }
        },

        cta {
          ...,

          "resolvedLink":
            wa::resolveNavItem(link),

          link {
            ...,

            internalReference-> {
              _id,
              _type,
              title,
              courseName,
              firstName,
              lastName,

              "slug":
                slug.current,

              "categorySlug":
                category->slug.current
            }
          }
        }
      },

      courseListSection {
        title {
          ...
        },

        text {
          ...,
          block[] {
            ...
          }
        },

        "accordions":
          courseList[]-> {
            "_key": _id,
            "title": courseName,
            "description":
              seo.metaDescription,

            "btnHref":
              "/juridikkurser/" +
              category->slug.current +
              "/" +
              slug.current,

            "icon": true
          }
      },

      courseInfoSection {
        title {
          ...
        },

        text {
          ...,
          block[] {
            ...
          }
        },

        "accordions":
          courseInfo[] {
            _key,
            title,
            description
          }
      },

      contactSection {
        ...
      },

      courseInfoLongSection {
        title {
          ...
        },

        text {
          ...,
          block[] {
            ...
          }
        }
      },

      courseQuotesSection[] {
        _key,
        _type,
        quote,
        person,

        courseTaken-> {
          _id,
          _type,
          courseName,

          "slug":
            slug.current,

          category-> {
            _id,
            title,

            "slug":
              slug.current
          }
        }
      },

      seo {
        ...
      }
    }
  `);

export const COURSE_PAGE_QUERY = defineQuery(`
  ${LINK_RESOLVER} 
  *[_type == "course" &&
    slug.current == $courseSlug][0] {
    _id,
    courseSlug,
    courseName,
    intro,
    aimCourse,
    aboutCourse,
    courseSections,
    length,
    conditionsCourse,
    lecturer-> {
      _id,
      firstName,
      lastName,
      image {
        hotspot,
        asset,
        crop,
        alt
      },
      "slug": slug.current,
      professionalTitle[],
      email,
      phone
    },
    category-> {
      "slug": slug.current,
      title,
      courseListSection {
        ...,
        courseList[]-> {
          ...,
          courseName,
          "slug": slug.current,
        }
      }
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`);

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
      image {
        asset,
        crop,
        hotspot,
        alt
      }
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

export const COURSE_CATEGORY_QUERY = defineQuery(`
  *[_type == "course" && defined(category)] | order(category asc) {
    category
  }[0...100]
`);

export const COURSE_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(courseName asc) {
    _id,
    courseName,
    "slug": slug.current,
    "lecturer": lecturer->{
      firstName,
      lastName,
      role,
      image {
        asset,
        crop,
        hotspot,
        alt
      }
    }
  }
`);

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
    image {
      asset,
      crop,
      hotspot,
      alt
    },
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
      image {
        asset,
        crop,
        hotspot,
        alt
      },
      email,
      slug
    }
  }
`);

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
    image {
      asset,
      crop,
      hotspot,
      alt
    },
    "roles": roles[]->{ _id, title, "slug": slug.current }
  }
`);

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
      "roles": roles[]->{ _id, title, "slug": slug.current },
      "slug": slug.current,
      image {
        asset,
        crop,
        hotspot,
        alt
      }
    }
  }
`);

export const ROLES_QUERY = defineQuery(`
  *[
    _type == "role" &&
    count(*[
      _type == "employee" &&
      references(^._id)
    ]) > 0
  ]
  | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`);

export const EMPLOYEE_PAGE_QUERY = defineQuery(`
  *[_type == "employee" && slug.current == $employeeSlug][0]{
    firstName,
    lastName,
    "slug": slug.current,
    phone,
    email,
    bio,
    employeeDescription,
    image {
      asset,
      crop,
      hotspot,
      alt
    },
    expertise[] {
      service-> { _id, title, "slug": slug.current }
    },
    hasCourses,
    courses[]-> {
      _id,
      courseName,
      "slug": slug.current,
      category-> { _id, title, "slug": slug.current }
    },
    jobHistory[] {
      jobTitle,
      employer,
      yearStart,
      yearEnd
    },
    roles[]->{ _id, title, "slug": slug.current },
    educationList[]{
      school,
      education,
      yearStart,
      yearEnd
    }
  }
`)