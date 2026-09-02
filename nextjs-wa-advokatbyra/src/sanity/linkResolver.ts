export const LINK_RESOLVER = /* groq */ `
  fn wa::resolveLinkRef($linkRef) = $linkRef->{
    "label": coalesce(
      title,
      internalReference->courseName,
      internalReference->title,
      internalReference->firstName + " " + internalReference->lastName
    ),

    "href": select(
      linkType == "external" =>
        href,

      internalReference->_type == "home" =>
        "/",

      internalReference->_type == "contactPage" =>
        "/kontakt",

      internalReference->_type == "aboutPage" =>
        "/om-oss",

      internalReference->_type == "courseMainPage" =>
        "/juridikkurser",

      internalReference->_type == "employee" &&
      defined(internalReference->slug.current) =>
        "/medarbetare/" + internalReference->slug.current,

      internalReference->_type == "service" &&
      defined(internalReference->slug.current) =>
        "/tjanster/" + internalReference->slug.current,

      internalReference->_type == "course" &&
      defined(internalReference->slug.current) =>
        "/juridikkurser/" + internalReference->slug.current,

      internalReference->_type == "article" &&
      defined(internalReference->slug.current) =>
        "/artiklar/" + internalReference->slug.current,

      null
    ),

    linkType,
    "referenceType": internalReference->_type
  };

  fn wa::resolveNavItem($item) = $item {
    "label": coalesce(
      label,
      link->title,
      link->internalReference->courseName,
      link->internalReference->title,
      link->internalReference->firstName + " " +
        link->internalReference->lastName
    ),

    "href": select(
      link->linkType == "external" =>
        link->href,

      link->internalReference->_type == "home" =>
        "/",

      link->internalReference->_type == "contactPage" =>
        "/kontakt",

      link->internalReference->_type == "aboutPage" =>
        "/om-oss",

      link->internalReference->_type == "courseMainPage" =>
        "/juridikkurser",

      link->internalReference->_type == "employee" &&
      defined(link->internalReference->slug.current) =>
        "/medarbetare/" + link->internalReference->slug.current,

      link->internalReference->_type == "service" &&
      defined(link->internalReference->slug.current) =>
        "/tjanster/" + link->internalReference->slug.current,

      link->internalReference->_type == "course" &&
      defined(link->internalReference->slug.current) =>
        "/juridikkurser/" + link->internalReference->slug.current,

      link->internalReference->_type == "article" &&
      defined(link->internalReference->slug.current) =>
        "/artiklar/" + link->internalReference->slug.current,

      null
    ),

    "linkType": link->linkType,
    "referenceType": link->internalReference->_type
  };
`;