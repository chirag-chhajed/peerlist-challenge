import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function PeerlistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      {/* <div className="flex h-screen relative overflow-hidden"> */}
      {/* <nav className="grid items-center px-2 text-sm font-medium lg:px-4 bg-foreground">
          {Array.from({ length: 10 }).map((_, index) => (
            <Link
              key={`links-${index}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-background font-semibold transition-all "
              href={`/peerlist/day-${index + 1}`}
            >
              Day {index + 1}
            </Link>
          ))}
        </nav> */}
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="font-semibold">
                {Array.from({ length: 10 }).map((item, index) => (
                  <SidebarMenuItem key={`links-${index}`}>
                    <SidebarMenuButton asChild>
                      <Link href={`/peerlist/day-${index + 1}`}>
                        <span>Day {index + 1}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-center gap-2">
              <span className="">
                Made by{" "}
                <a
                  className="font-semibold underline"
                  href="https://x.com/ChiragChhajed18/"
                >
                  Chirag
                </a>
              </span>
              <a href="https://github.com/chirag-chhajed">
                <GitHubLogoIcon />
              </a>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarTrigger />
      {children}

      {/* {children} */}
      {/* </div> */}
    </SidebarProvider>
  );
}
