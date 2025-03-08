
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { BarChart2, Layers } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const campaigns = [
  {
    id: 1,
    name: "Yhangy Campaign",
    status: "active",
  }
];

export function CampaignSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your Campaigns</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {campaigns.map((campaign) => (
                <SidebarMenuItem key={campaign.id}>
                  <SidebarMenuButton asChild className={
                    location.pathname === `/campaign/${campaign.id}` 
                      ? "bg-accent text-accent-foreground" 
                      : ""
                  }>
                    <Link to={`/campaign/${campaign.id}`}>
                      <BarChart2 />
                      <span>{campaign.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={
                  location.pathname === "/" 
                    ? "bg-accent text-accent-foreground" 
                    : ""
                }>
                  <Link to="/">
                    <Layers />
                    <span>Launch Campaign</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
