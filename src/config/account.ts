export enum TAB {
  PROFILE = "profile",
  TICKETS = "tickets",
  TRANSACTION = "transactions",
}

export const TabList = Array.from(Object.entries(TAB)).map(([key, value]) => ({
  id: value,
  title: `${value[0].toUpperCase()}${value.slice(1)}`,
  link: `/account/${value}`,
}))
