import {
  LayoutDashboardIcon,
  UsersIcon,
  BuildingIcon,
  ClockIcon,
  BoxIcon,
  MegaphoneIcon,
  Share2Icon,
  StarIcon,
  FileTextIcon,
  HashIcon,
  LayoutIcon,
} from "lucide-react";

// Define types for our menu items
export type SubMenuItem = {
  name: string;
  icon?: React.ComponentType;
  onClick?: () => void;
  path?: string;
};

export type MenuItem = {
  name: string;
  icon: React.ComponentType;
  expandable?: boolean;
  subItems?: SubMenuItem[];
  onClick?: () => void;
  path?: string;
};

// Menu item data
export const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
  { name: "Leads", icon: UsersIcon, path: "/leads" },
  { name: "Companies", icon: BuildingIcon, path: "/companies" },
  { name: "Segments", icon: ClockIcon, path: "/segments" },
  {
    name: "Components",
    icon: BoxIcon,
    expandable: true,
    subItems: [
      { name: "Sub Component 1", path: "/components/sub1" },
      { name: "Sub Component 2", path: "/components/sub2" },
    ],
  },
  { name: "Campaign", icon: MegaphoneIcon, path: "/campaign" },
  {
    name: "Channels",
    icon: Share2Icon,
    expandable: true,
    subItems: [
      { name: "Email", path: "/channels/email" },
      { name: "SMS", path: "/channels/sms" },
    ],
  },
  {
    name: "Points",
    icon: StarIcon,
    expandable: true,
    subItems: [
      { name: "Earned Points", path: "/points/earned" },
      { name: "Used Points", path: "/points/used" },
    ],
  },
  { name: "Stages", icon: LayoutIcon, path: "/stages" },
  { name: "Reports", icon: FileTextIcon, path: "/reports" },
  { name: "Tags", icon: HashIcon, path: "/tags" },
];
