export const SITE_METADATA = {
  title: `Hadrien's blog in the cloud`,
  author: 'Hadrien Mazelier',
  headerTitle: `adh.dev (github)`,
  description:
    "My brain in the cloud to share with others and not forget when I'll be old and grey",
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.adh.dev',
  siteRepo: 'https://github.com/hmazelier/adh.dev',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.jpg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/social-banner.png`,
  email: 'hadrien@mazeconsult.ing',
  github: 'https://github.com/hmazelier',
  x: 'https://x.com/adhdev_x',
  linkedin: 'https://www.linkedin.com/in/hmazelier',
  instagram: 'https://www.instagram.com/adhdev_ig',
  locale: 'en-US',
  stickyNav: true,
  goodreadsBookshelfUrl: 'https://www.goodreads.com/review/list/189949899?shelf=read',
  goodreadsFeedUrl: 'https://www.goodreads.com/review/list_rss/189949899',
  analytics: {
    umamiAnalytics: {
      websiteId: process.env.NEXT_UMAMI_ID,
      shareUrl: 'https://cloud.umami.is/share/QKDIwLifZVviRJuN/adh.dev',
    },
  },
  search: {
    kbarConfigs: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}
