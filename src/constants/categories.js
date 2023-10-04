export const MENU_OPTIONS = ["ילדים", "דוגמנים", "ביטים", "ניצבים", "שחקנים"];

export const CATEGORIES_MENU_TO_USER_CATEGORY = {
  [MENU_OPTIONS[0]]: "ילדים",
  [MENU_OPTIONS[1]]: "דוגמן",
  [MENU_OPTIONS[2]]: "ביט",
  [MENU_OPTIONS[3]]: "ניצב",
  [MENU_OPTIONS[4]]: "משחק",
};

const CATEGORIES = [
  {
    label: "משחק",
    value: "משחק",
  },
  {
    label: "ביטים",
    value: "ביט",
  },
  {
    label: "ילדים",
    value: "ילדים",
  },
];

export const MALE_CATEGORIES = [
  ...CATEGORIES,
  {
    label: "דוגמנים",
    value: "דוגמן",
  },
  {
    label: "ניצבים",
    value: "ניצב",
  },
];

export const FEMALE_CATEGORIES = [
  ...CATEGORIES,
  {
    label: "דוגמנות",
    value: "דוגמן",
  },
  {
    label: "ניצבות",
    value: "ניצב",
  },
];
