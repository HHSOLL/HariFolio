export const routes = {
  home: "/",
  designers: "/designers",
  salons: "/salons",
  models: "/models",
  styleGuide: "/search/designers?style=레이어드컷",
  events: "/search/salons?sort=new",
  login: "/auth/login",
  signup: "/auth/signup",
  recover: "/auth/recover",
  mypage: "/mypage",
  designerSearch: "/search/designers",
  salonSearch: "/search/salons",
} as const;

export function designerDetailRoute(slug: string) {
  return `/designers/${slug}`;
}

export function salonDetailRoute(slug: string) {
  return `/salons/${slug}`;
}

export function aspiringProfileRoute(slug: string) {
  return `/aspiring-designers/${slug}`;
}
