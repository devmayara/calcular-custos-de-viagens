export interface NavItem {
  name: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [{ name: "Design Tokens", href: "/style-guide" }],
  },
  {
    title: "Components",
    items: [
      // Componentes individuais serão adicionados pelo Prompt 2
    ],
  },
];
