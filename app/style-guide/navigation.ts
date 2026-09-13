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
      {
        name: "CalculatorForm",
        href: "/style-guide/components/calculator-form",
      },
      {
        name: "CalculationResultCard",
        href: "/style-guide/components/calculation-result-card",
      },
      {
        name: "HistoryTable",
        href: "/style-guide/components/history-table",
      },
    ],
  },
];
