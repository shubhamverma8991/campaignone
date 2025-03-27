"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuItem, SubMenuItem, menuItems } from "../../../config/menuItems";

// MenuItem Component
const MenuItemComponent = ({
  item,
  isActive = false,
  activeSubItem = "",
  isExpanded = false,
  onItemClick,
  onToggleExpand,
}: {
  item: MenuItem;
  isActive?: boolean;
  activeSubItem?: string;
  isExpanded?: boolean;
  onItemClick?: (name: string, path?: string) => void;
  onToggleExpand?: (name: string) => void;
}) => {
  const Icon = item.icon;

  const toggleExpand = (e: React.MouseEvent) => {
    if (item.expandable && onToggleExpand) {
      e.stopPropagation();
      onToggleExpand(item.name);
    }
  };

  const handleClick = () => {
    if (item.onClick) item.onClick();
    if (onItemClick) onItemClick(item.name, item.path);
  };

  const handleSubItemClick = (subItem: SubMenuItem) => {
    if (subItem.onClick) subItem.onClick();
    if (onItemClick) onItemClick(subItem.name, subItem.path);
  };

  return (
    <>
      <SidebarMenuItem className="w-full">
        <SidebarMenuButton
          onClick={item.expandable ? toggleExpand : handleClick}
          className={cn(
            "w-full ml-2 mt-1 rounded-md transition-colors duration-200",
            isActive ? "bg-blue-100 shadow-sm font-medium text-blue-700" : "hover:bg-gray-100"
          )}
        >
          <Icon className={cn("text-blue-600", isActive && "text-blue-700")} />
          <span>{item.name}</span>
          {item.expandable &&
            (isExpanded ? <ChevronDownIcon className="ml-auto w-4 h-4" /> : <ChevronRightIcon className="ml-auto w-4 h-4" />)}
        </SidebarMenuButton>
      </SidebarMenuItem>

      {item.expandable && isExpanded && item.subItems && (
        <div className="pl-8">
          {item.subItems.map((subItem, index) => (
            <SidebarMenuItem key={`${item.name}-sub-${index}`}>
              <SidebarMenuButton
                onClick={() => handleSubItemClick(subItem)}
                className={cn(
                  "rounded-md transition-colors duration-200",
                  subItem.name === activeSubItem ? "bg-blue-100 shadow-sm font-medium text-blue-700" : "hover:bg-gray-100"
                )}
              >
                {subItem.icon && <subItem.icon className={cn("text-blue-600", subItem.name === activeSubItem && "text-blue-700")} />}
                <span>{subItem.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </div>
      )}
    </>
  );
};

// Sidebar Component
export default function CustomSidebar({
  title = "Acme Inc",
  subtitle = "Workspace",
  children,
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeItemName, setActiveItemName] = useState<string | undefined>();
  const [activeSubItemName, setActiveSubItemName] = useState<string | undefined>();
  const [expandedItemName, setExpandedItemName] = useState<string | undefined>();

  useEffect(() => {
    const currentActivePath = pathname || "/";

    const mainItem = menuItems.find((item) => item.path === currentActivePath);
    const parentWithSub = menuItems.find((item) => item.subItems?.some((sub) => sub.path === currentActivePath));
    const subItem = parentWithSub?.subItems?.find((sub) => sub.path === currentActivePath);

    setActiveItemName(mainItem?.name || parentWithSub?.name);
    setActiveSubItemName(subItem?.name);

    if (parentWithSub?.name) {
      setExpandedItemName(parentWithSub.name);
    }
  }, [pathname]);

  const handleItemSelect = (name: string, path?: string) => {
    const clickedItem = menuItems.find((item) => item.name === name);
    const isMainItem = !!clickedItem;

    if (isMainItem) {
      setActiveItemName(name);
      setActiveSubItemName(undefined);

      if (!clickedItem.expandable) {
        setExpandedItemName(undefined);
      }
    } else {
      const parent = menuItems.find((item) => item.subItems?.some((sub) => sub.name === name));

      if (parent) {
        setActiveItemName(parent.name);
        setActiveSubItemName(name);
      }
    }

    if (path) {
      const newPath = path.startsWith("/home") ? path : `/home${path}`;
      router.push(newPath);
    }
  };

  const handleToggleExpand = (name: string) => {
    setExpandedItemName((prev) => (prev === name ? undefined : name));
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
        <Sidebar className="w-64 bg-gray-50 fixed h-full border-r">
          <SidebarHeader className="p-4 flex flex-row items-center gap-3">
            <img
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
              alt="User Avatar"
              className="w-10 h-10 rounded-md"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{title}</span>
              <span className="text-xs text-gray-500">{subtitle}</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <MenuItemComponent
                  key={item.name}
                  item={item}
                  isActive={item.name === activeItemName}
                  activeSubItem={activeSubItemName}
                  isExpanded={item.name === expandedItemName}
                  onItemClick={handleItemSelect}
                  onToggleExpand={handleToggleExpand}
                />
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <SidebarTrigger className="mb-4" />
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
