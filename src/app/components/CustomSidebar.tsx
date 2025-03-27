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
// import { MenuItem } from "../../config/menuItems";
import { MenuItem, SubMenuItem, menuItems } from "../../../config/menuItems";

// Regular menu item component
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
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={item.expandable ? toggleExpand : handleClick}
          style={{ width: "90%" }}
          className={cn(
            "ml-2 mt-1 rounded-md hover:bg-white transition-colors duration-200",
            isActive && !item.expandable && "bg-white shadow-sm font-medium text-blue-700"
          )}
        >
          <Icon className={cn("text-blue-600", isActive && !item.expandable && "text-blue-700")} />
          <span>{item.name}</span>
          {item.expandable &&
            (isExpanded ? <ChevronDownIcon className="ml-auto w-4 h-4" /> : <ChevronRightIcon className="ml-auto w-4 h-4" />)}
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Render sub-items if expanded */}
      {item.expandable && isExpanded && item.subItems && (
        <div className="pl-8">
          {item.subItems.map((subItem, index) => (
            <SidebarMenuItem key={`${item.name}-sub-${index}`}>
              <SidebarMenuButton
                onClick={() => handleSubItemClick(subItem)}
                className={cn(
                  "rounded-md hover:bg-gray-100 transition-colors duration-200",
                  subItem.name === activeSubItem && "bg-white shadow-sm font-medium text-blue-700"
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

interface CustomSidebarProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function CustomSidebar({ title = "Acme Inc", subtitle = "Workspace", children }: CustomSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // State to track active items
  const [activeItemName, setActiveItemName] = useState<string | undefined>();
  const [activeSubItemName, setActiveSubItemName] = useState<string | undefined>();

  // State to track which menu item is expanded
  const [expandedItemName, setExpandedItemName] = useState<string | undefined>();

  // Update active items when pathname changes
  useEffect(() => {
    const currentActivePath = pathname || "/";

    // Find matching main item
    const mainItem = menuItems.find((item) => item.path === currentActivePath);

    // Find parent item with matching subitem
    const parentWithSub = menuItems.find((item) => item.subItems?.some((sub) => sub.path === currentActivePath));

    const subItem = parentWithSub?.subItems?.find((sub) => sub.path === currentActivePath);

    const newActiveItem = mainItem?.name || parentWithSub?.name;
    setActiveItemName(newActiveItem);
    setActiveSubItemName(subItem?.name);

    // Auto-expand the active parent item with submenu
    if (parentWithSub?.name) {
      setExpandedItemName(parentWithSub.name);
    }
  }, [pathname]);

  const handleItemSelect = (name: string, path?: string) => {
    // For immediate UI feedback before navigation
    const clickedItem = menuItems.find((item) => item.name === name);
    const isMainItem = !!clickedItem;

    if (isMainItem) {
      setActiveItemName(name);
      setActiveSubItemName(undefined);

      // If this is not an expandable item, close any open expandable items
      if (!clickedItem.expandable) {
        setExpandedItemName(undefined);
      }
    } else {
      // Find which parent contains this subitem
      const parent = menuItems.find((item) => item.subItems?.some((sub) => sub.name === name));

      if (parent) {
        setActiveItemName(parent.name);
        setActiveSubItemName(name);
      }
    }

    // Navigate if path provided
    if (path) {
      // router.push(path);
    }
  };

  const handleToggleExpand = (name: string) => {
    // If clicking the currently expanded item, close it
    if (expandedItemName === name) {
      setExpandedItemName(undefined);
    } else {
      // Otherwise, close the current one and open the new one
      setExpandedItemName(name);
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar className="w-64 bg-gray-50" style={{ borderRight: "none" }}>
          {/* Header with Title */}
          <SidebarHeader className="p-4 flex flex-row justify-between items-center gap-3">
            <div>Flex</div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{title}</span>
              <span className="text-xs text-gray-500">{subtitle}</span>
            </div>
          </SidebarHeader>

          {/* Sidebar Menu */}
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

        {/* Main Content */}
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
