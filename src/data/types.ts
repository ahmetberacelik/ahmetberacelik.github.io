export interface NavItem {
  label: string;
  sectionId: string;
}

export interface AboutRole {
  title: string;
  detail: string;
  year: string;
}

export interface LeadershipEventPhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface LeadershipEvent {
  title: string;
  description: string;
  photos: LeadershipEventPhoto[];
  /** Show the photo strip at the photos' natural ratios (no cropping). */
  naturalStrip?: boolean;
}

export interface LeadershipRoleLink {
  label: string;
  url: string;
}

export interface LeadershipRole {
  title: string;
  subtitle?: string;
  paragraph: string;
  links?: LeadershipRoleLink[];
  events?: LeadershipEvent[];
}

export interface ContactButton {
  label: string;
  href: string;
  download?: boolean;
  external?: boolean;
}

export interface SiteData {
  lang: 'en' | 'tr';
  meta: {
    siteTitle: string;
    siteDescription: string;
  };
  nav: {
    ariaLabel: string;
    items: {
      about: NavItem;
      projects: NavItem;
      leadership: NavItem;
      contact: NavItem;
    };
    langSwitchLabel: string;
    langSwitchAria: string;
  };
  hero: {
    sectionAriaLabel: string;
    name: string;
    eyebrow: string;
    roleLine: string;
    intro: string;
    primaryBtn: {
      label: string;
      href: string;
    };
    secondaryBtn: {
      label: string;
      href: string;
    };
    photoAlt: string;
    photoCredit: string;
  };
  about: {
    id: string;
    ariaLabel: string;
    portraitAlt: string;
    roles: AboutRole[];
    paragraph: string;
    education: string;
  };
  projectsSection: {
    id: string;
    heading: string;
    otherHeading: string;
    viewDetailLabel: string;
    backToProjectsLabel: string;
    projectIndexPrefix: string;
  };
  leadership: {
    id: string;
    heading: string;
    roles: LeadershipRole[];
  };
  contact: {
    id: string;
    heading: string;
    sentence: string;
    buttons: ContactButton[];
  };
  footer: {
    copyright: string;
    links: {
      label: string;
      href: string;
      external?: boolean;
    }[];
  };
}
