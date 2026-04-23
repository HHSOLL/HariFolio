import { AspiringDesigner, UserProfile } from "@/lib/types";

export const aspiringDesigners: AspiringDesigner[] = [
  {
    id: "a-01",
    slug: "hayeon",
    name: "김하연",
    district: "서울 강남구",
    profileImage: "/images/designers/designer-10.png",
    heroImage: "/images/heroes/hero-hayeon.png",
    bio: "성장하는 디자이너로 진심을 담아 시술합니다. 트렌드를 실무에 맞게 해석해 자연스러운 결과를 지향합니다.",
    instagram: "@hayen_hair",
    tags: ["레이어드컷", "허쉬컷", "빌드펌", "애쉬브라운", "톤다운"],
    stats: {
      likes: 1248,
      portfolioCount: 48,
      rating: 4.9,
      monthsActive: 8,
    },
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com/hayen_hair" },
      { label: "Blog", href: "https://blog.naver.com/hairfolio_hayeon" },
      { label: "Link", href: "https://hairfolio.app/aspiring-designers/hayeon" },
    ],
  },
  {
    id: "a-02",
    slug: "nayeon",
    name: "나연",
    district: "서울 강남구",
    profileImage: "/images/designers/designer-11.png",
    heroImage: "/images/heroes/hero-jiyu.png",
    bio: "탈색/애쉬 계열 컬러 포트폴리오를 중심으로 실전 경험을 쌓고 있습니다.",
    instagram: "@nayeon.colorlab",
    tags: ["탈색", "애쉬베이지", "염색"],
    stats: {
      likes: 804,
      portfolioCount: 31,
      rating: 4.8,
      monthsActive: 6,
    },
    socialLinks: [{ label: "Instagram", href: "https://instagram.com/nayeon.colorlab" }],
  },
  {
    id: "a-03",
    slug: "haon",
    name: "하온",
    district: "서울 강남구",
    profileImage: "/images/designers/designer-12.png",
    heroImage: "/images/heroes/hero-home.png",
    bio: "남성 숏컷과 다운펌 중심으로 디자인 역량을 키우고 있습니다.",
    instagram: "@haon_menshair",
    tags: ["다운펌", "가르마펌", "아이비리그컷"],
    stats: {
      likes: 697,
      portfolioCount: 27,
      rating: 4.7,
      monthsActive: 5,
    },
    socialLinks: [{ label: "Instagram", href: "https://instagram.com/haon_menshair" }],
  },
];

export const defaultUserProfile: UserProfile = {
  id: "u-01",
  name: "Hairfolio 유저",
  district: "강남구",
  avatar: "/images/designers/designer-05.png",
  bookmarks: ["d-01", "d-03", "d-07"],
  viewedDesigners: ["d-02", "d-06", "d-09"],
};
