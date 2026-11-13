import type { SiteData } from './types';

export const trData: SiteData = {
  lang: 'tr',
  meta: {
    siteTitle: 'Ahmet Bera Çelik · Bilgisayar Mühendisliği ve Otonom Sistemler',
    siteDescription:
      'Robotik, gömülü sistemler, yapay zekâ ve web alanlarında çalışan ürünler geliştiren bilgisayar mühendisliği son sınıf öğrencisi. TEKNOFEST 2026 finalisti ZUGA-İDA yazılım ekibi yöneticisi.',
  },
  nav: {
    ariaLabel: 'Ana menü',
    items: {
      about: { label: 'Hakkımda', sectionId: 'hakkimda' },
      projects: { label: 'Projeler', sectionId: 'projeler' },
      leadership: { label: 'Liderlik', sectionId: 'liderlik' },
      contact: { label: 'İletişim', sectionId: 'iletisim' },
    },
    langSwitchLabel: 'EN',
    langSwitchAria: 'EN · Switch to English',
  },
  hero: {
    sectionAriaLabel: 'Tanıtım',
    name: 'Ahmet Bera Çelik',
    eyebrow: 'ZUGA-İDA · Yazılım ekibi yöneticisi',
    roleLine: 'İnsansız otonom deniz aracı yazılımı',
    intro:
      "Bilgisayar mühendisliği son sınıf öğrencisiyim. TEKNOFEST 2026 finalisti ZUGA-İDA'yı takımımla geliştirdik; yazılım ekibini ben yönettim.",
    primaryBtn: { label: 'Projeler', href: '#projeler' },
    secondaryBtn: { label: 'İletişim', href: '#iletisim' },
    photoAlt: 'ZUGA-İDA takımı, önlerinde insansız deniz aracı',
    photoCredit: 'Fotoğraf · ZUGA-İDA takımı, TEKNOFEST 2026',
  },
  about: {
    id: 'hakkimda',
    ariaLabel: 'Hakkımda',
    portraitAlt: 'Ahmet Bera Çelik',
    roles: [
      {
        title: 'Topluluk Başkanı',
        detail: 'RTEÜ Bilgisayar Mühendisliği Topluluğu',
        year: '· 2025–',
      },
      {
        title: 'Yazılım Ekibi Yöneticisi',
        detail: 'ZUGA-İDA insansız deniz aracı · TEKNOFEST 2026 finalisti',
        year: '· 2026–',
      },
      {
        title: 'Proje Geliştirici',
        detail: 'Gömülü yapay zekâ ve full-stack web projeleri',
        year: '· 2024–',
      },
    ],
    paragraph:
      "Bilgisayar mühendisliği son sınıf öğrencisiyim. Robotik, gömülü sistemler, yapay zekâ ve web alanlarında çalışan ürünler geliştiriyorum. İşin teknik tarafı kadar ekip tarafında da yer alıyorum: bir insansız deniz aracının yazılım ekibini yönettim, Bilgisayar Mühendisliği Topluluğu'nun başkanlığını yapıyorum ve toplulukta eğitimler verdim.",
    education:
      'Recep Tayyip Erdoğan Üniversitesi · Bilgisayar Mühendisliği · 2022–2027',
  },
  projectsSection: {
    id: 'projeler',
    heading: 'Projeler',
    otherHeading: 'Diğer projeler',
    viewDetailLabel: 'Proje ayrıntısı',
    backToProjectsLabel: 'Tüm projeler',
    projectIndexPrefix: 'Proje',
  },
  leadership: {
    id: 'liderlik',
    heading: 'Liderlik',
    roles: [
      {
        title: 'Topluluk Başkanı · RTEÜ Bilgisayar Mühendisliği Topluluğu · 2025–',
        subtitle: 'Öncesinde proje koordinatörü · 2024–2025',
        paragraph:
          'Bölümün öğrenci topluluğunu yönetiyorum: dönemin etkinliklerini planlıyor, ekibi bir araya getiriyor ve öğrencileri sektörle ve başka üniversitelerle buluşturuyorum. Başkanlıktan önce bir yıl topluluğun etkinlik organizasyonunu koordine ettim.',
        links: [
          {
            label: 'İnternet sitesi',
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
            title: 'Proje Geliştirme Workshop · Kasım 2025',
            description:
              'İki oturumluk uygulamalı eğitim: proje geliştirme süreci, Git ve GitHub, veri yapıları. İlk oturumu dört kişi birlikte, ikinci oturumu ben anlattım.',
            photos: [
              {
                src: 'topluluk-workshop-2025-11-gun1.jpg',
                alt: 'Proje Geliştirme Workshop birinci oturumunda eğitmenler ve katılımcılar',
                caption: 'Proje Geliştirme Workshop · 1. Oturum',
              },
              {
                src: 'topluluk-workshop-2025-11-gun2-a.jpg',
                alt: 'Ahmet Bera Çelik Proje Geliştirme Workshop ikinci oturumunda anlatım yaparken',
                caption: 'Proje Geliştirme Workshop · 2. Oturum',
              },
              {
                src: 'topluluk-workshop-2025-11-gun2-b.jpg',
                alt: 'İkinci oturumda amfide uygulamalı eğitimi takip eden öğrenciler',
                caption: 'Proje Geliştirme Workshop · 2. Oturum',
              },
            ],
          },
          {
            title: 'Yapay zekâ zirveleri gezisi · Ekim 2025',
            description:
              "Topluluk üyelerini Ankara'da MÜSİAD ve BTK Akademi'nin düzenlediği iki yapay zekâ zirvesine götürdük. Geziyi Gençlik ve Spor Bakanlığı desteğiyle düzenledik.",
            naturalStrip: true,
            photos: [
              {
                src: 'topluluk-ankara-zirve-2025-10-afis.jpg',
                alt: 'Topluluk üyeleri yapay zekâ zirvesinin afişi önünde',
                caption: 'Yapay zekâ zirvesi · Ekim 2025',
              },
              {
                src: 'topluluk-ankara-zirve-2025-10.jpg',
                alt: 'Yapay zekâ zirveleri gezisinde topluluk üyeleri grup fotoğrafı',
                caption: 'Gezi sonunda topluluk · Ekim 2025',
              },
            ],
          },
          {
            title: 'Smart Innovation Ideathon · Aralık 2025',
            description:
              "Karadeniz Teknik Üniversitesi'ndeki üç günlük fikir yarışmasına topluluğun katılımını organize ettim; ben de yarışan ekipteydim. Gömülü sistem kartlarıyla fikirden prototipe proje geliştirdik.",
            photos: [
              {
                src: 'topluluk-ideathon-2025-12-calisma.jpg',
                alt: 'Smart Innovation Ideathon sırasında gömülü sistem kartlarıyla çalışan ekip',
                caption: 'Smart Innovation Ideathon · Prototip çalışması',
              },
              {
                src: 'topluluk-ideathon-2025-12-grup.jpg',
                alt: 'Smart Innovation Ideathon katılımcıları grup fotoğrafı',
                caption: 'Smart Innovation Ideathon · Ekip',
              },
            ],
          },
        ],
      },
      {
        title: 'Yazılım Ekibi Yöneticisi · ZUGA-İDA · 2026–',
        paragraph:
          'İnsansız deniz aracı takımının yazılım ekibini yönetiyorum: iş bölümünü yapıyor, teknik kararları ekiple birlikte veriyor ve ilerlemeyi takip ediyorum. Ayrıntısı Projeler bölümünde.',
      },
    ],
  },
  contact: {
    id: 'iletisim',
    heading: 'İletişim',
    sentence: 'Bana aşağıdaki yollardan ulaşabilirsiniz.',
    buttons: [
      { label: 'E-posta', href: 'mailto:ahmetberacelik@hotmail.com' },
      { label: 'Telefon', href: 'tel:+905457290161' },
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
        href: '/cv/Ahmet_Bera_Celik_CV_TR.pdf',
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
        label: 'E-posta',
        href: 'mailto:ahmetberacelik@hotmail.com',
      },
    ],
  },
};
