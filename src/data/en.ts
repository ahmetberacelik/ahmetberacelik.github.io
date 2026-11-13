import type { SiteData } from './types';

export const enData: SiteData = {
  lang: 'en',
  meta: {
    siteTitle: 'Ahmet Bera Çelik · Computer Engineering & Autonomous Systems',
    siteDescription:
      'Final-year computer engineering student building working products in robotics, embedded systems, AI, and the web. Software team manager of TEKNOFEST 2026 finalist ZUGA-İDA.',
  },
  nav: {
    ariaLabel: 'Main menu',
    items: {
      about: { label: 'About', sectionId: 'about' },
      projects: { label: 'Projects', sectionId: 'projects' },
      leadership: { label: 'Leadership', sectionId: 'leadership' },
      contact: { label: 'Contact', sectionId: 'contact' },
    },
    langSwitchLabel: 'TR',
    langSwitchAria: 'TR · Türkçe sayfaya geç',
  },
  hero: {
    sectionAriaLabel: 'Introduction',
    name: 'Ahmet Bera Çelik',
    eyebrow: 'ZUGA-İDA · Software team manager',
    roleLine: 'Autonomous unmanned surface vehicle software',
    intro:
      'I am a final-year computer engineering student. My team and I built ZUGA-İDA, a TEKNOFEST 2026 finalist; I managed the software team.',
    primaryBtn: { label: 'Projects', href: '#projects' },
    secondaryBtn: { label: 'Contact', href: '#contact' },
    photoAlt: 'ZUGA-İDA team with the unmanned surface vehicle in front of them',
    photoCredit: 'Photograph · ZUGA-İDA team, TEKNOFEST 2026',
  },
  about: {
    id: 'about',
    ariaLabel: 'About',
    portraitAlt: 'Ahmet Bera Çelik',
    roles: [
      {
        title: 'Community President',
        detail: 'RTEU Computer Engineering Community',
        year: '· 2025–',
      },
      {
        title: 'Software Team Manager',
        detail: 'ZUGA-İDA unmanned surface vehicle · TEKNOFEST 2026 finalist',
        year: '· 2026–',
      },
      {
        title: 'Project Developer',
        detail: 'Embedded AI and full-stack web projects',
        year: '· 2024–',
      },
    ],
    paragraph:
      'I am a final-year computer engineering student. I build working products in robotics, embedded systems, AI, and the web. I take part in the team side of the work as much as the technical side: I managed the software team of an unmanned surface vehicle, I serve as president of the Computer Engineering Community, and I have taught workshops there.',
    education:
      'Recep Tayyip Erdoğan University · Computer Engineering · 2022–2027',
  },
  projectsSection: {
    id: 'projects',
    heading: 'Projects',
    otherHeading: 'Other projects',
    viewDetailLabel: 'Project details',
    backToProjectsLabel: 'All projects',
    projectIndexPrefix: 'Project',
  },
  leadership: {
    id: 'leadership',
    heading: 'Leadership',
    roles: [
      {
        title: 'Community President · RTEU Computer Engineering Community · 2025–',
        subtitle: 'Previously project coordinator · 2024–2025',
        paragraph:
          "I lead the department's student community: I plan each term's events, bring the team together, and connect students with industry and with other universities. Before becoming president, I spent a year coordinating the community's event organization.",
        links: [
          {
            label: 'Website',
            url: 'https://bilgisayarmuhendisligi-topluluk.erdogan.edu.tr/',
          },
          {
            label: 'LinkedIn',
            url: 'https://www.linkedin.com/company/rte%C3%BC-bilgisayarm%C3%BChendisli%C4%9Fi-toplulu%C4%9Fu',
          },
          {
            label: 'Instagram',
            url: 'https://www.instagram.com/rteubmt',
          },
        ],
        events: [
          {
            title: 'Project Development Workshop · November 2025',
            description:
              'A two-session hands-on training: the project development process, Git and GitHub, and data structures. Four of us taught the first session together; I taught the second.',
            photos: [
              {
                src: 'topluluk-workshop-2025-11-gun1.jpg',
                alt: 'Instructors and students during the first session of the Project Development Workshop',
                caption: 'Project Development Workshop · Session 1',
              },
              {
                src: 'topluluk-workshop-2025-11-gun2-a.jpg',
                alt: 'Ahmet Bera Çelik presenting at the second session of the Project Development Workshop',
                caption: 'Project Development Workshop · Session 2',
              },
              {
                src: 'topluluk-workshop-2025-11-gun2-b.jpg',
                alt: 'Students working in the lecture hall during the second workshop session',
                caption: 'Project Development Workshop · Session 2',
              },
            ],
          },
          {
            title: 'AI summits trip · October 2025',
            description:
              'We took community members to two AI summits in Ankara, organized by MÜSİAD and BTK Akademi. We organized the trip with support from the Ministry of Youth and Sports.',
            naturalStrip: true,
            photos: [
              {
                src: 'topluluk-ankara-zirve-2025-10-afis.jpg',
                alt: 'Community members in front of the AI summit backdrop',
                caption: 'AI summit · October 2025',
              },
              {
                src: 'topluluk-ankara-zirve-2025-10.jpg',
                alt: 'Community members group photo during the AI summits trip',
                caption: 'The group after the summits · October 2025',
              },
            ],
          },
          {
            title: 'Smart Innovation Ideathon · December 2025',
            description:
              'I organized the community\'s participation in a three-day idea competition at Karadeniz Technical University; I was on the competing team. We developed a project from idea to prototype on embedded system boards.',
            photos: [
              {
                src: 'topluluk-ideathon-2025-12-calisma.jpg',
                alt: 'Team working on embedded system boards at a table during the Smart Innovation Ideathon',
                caption: 'Smart Innovation Ideathon · Prototype work',
              },
              {
                src: 'topluluk-ideathon-2025-12-grup.jpg',
                alt: 'Community participants group photo at the Smart Innovation Ideathon',
                caption: 'Smart Innovation Ideathon · Team',
              },
            ],
          },
        ],
      },
      {
        title: 'Software Team Manager · ZUGA-İDA · 2026–',
        paragraph:
          'I manage the software team of an unmanned surface vehicle team: I divide the work, make technical decisions together with the team, and track progress. Details are in the Projects section.',
      },
    ],
  },
  contact: {
    id: 'contact',
    heading: 'Contact',
    sentence: 'You can reach me through any of the following.',
    buttons: [
      { label: 'Email', href: 'mailto:ahmetberacelik@hotmail.com' },
      { label: 'Phone', href: 'tel:+905457290161' },
      {
        label: 'GitHub',
        href: 'https://github.com/ahmetberacelik',
        external: true,
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/ahmet-bera-%C3%A7elik-647928295/',
        external: true,
      },
      {
        label: 'CV (PDF)',
        href: '/cv/Ahmet_Bera_Celik_CV_EN.pdf',
        download: true,
      },
    ],
  },
  footer: {
    copyright: 'Ahmet Bera Çelik · 2026',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/ahmetberacelik',
        external: true,
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/ahmet-bera-%C3%A7elik-647928295/',
        external: true,
      },
      {
        label: 'Email',
        href: 'mailto:ahmetberacelik@hotmail.com',
      },
    ],
  },
};
