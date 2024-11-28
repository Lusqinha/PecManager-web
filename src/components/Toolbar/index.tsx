import { CogIcon, FileTextIcon, HistoryIcon, HomeIcon } from "lucide-react";
import {
    SidebarGroup, SidebarMenuItem, SidebarMenuButton,
    SidebarGroupContent, SidebarGroupLabel,
    Sidebar, SidebarMenu, SidebarContent,
    SidebarFooter
} from "@/components/ui/sidebar";


export function Toolbar() {

    const items_menu = [
        {
            title: "Movimentação",
            url: "/movimentacao",
            icon: HomeIcon
        },
        {
            title: "Histórico",
            url: "/historico",
            icon: HistoryIcon
        },
        {
            title: "Relatórios",
            url: "/relatorios",
            icon: FileTextIcon
        },
    ]


    const items_footer = [
        {
            title: "Configurações",
            url: "/configuracoes",
            icon: CogIcon
        },
    ]

    return(
    <Sidebar collapsible="icon">
        <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>                                
                            {items_menu.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            < item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
            </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    {items_footer.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    < item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
    </Sidebar>
    )
}