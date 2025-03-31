export const ROOT_APP = "/app";

export const enum ROUTES {
  HOME = ROOT_APP,
  QUIZES = `${ROOT_APP}/quizes`,
  GROUPS = `${ROOT_APP}/groups`,
  CBT_GENIE_AI = `${ROOT_APP}/cbt-genie-ai`,
  PROFILE = `${ROOT_APP}/profile`,
}

export type NavLinkType = {
  name: string;
  url: ROUTES;
  slug: string;
  icon: React.ReactNode;
};

export const navLinks: NavLinkType[] = [
  {
    name: "home",
    url: ROUTES.HOME,
    slug: "home",
    icon: <i className="pi pi-home" />,
  },
  {
    name: "quizes",
    url: ROUTES.QUIZES,
    slug: "quizes",
    icon: <i className="pi pi-graduation-cap" />,
  },
  {
    name: "groups",
    url: ROUTES.GROUPS,
    slug: "groups",
    icon: <i className="pi pi-users" />,
  },
  {
    name: "cbt genie ai",
    url: ROUTES.CBT_GENIE_AI,
    slug: "cbt_genie_ai",
    icon: <i className="pi pi-question" />,
  },
  {
    name: "Profile",
    url: ROUTES.PROFILE,
    slug: "profile",
    icon: <i className="pi pi-user" />,
  },
];
