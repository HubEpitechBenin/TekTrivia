import { SidebarProvider, SidebarInset } from '../ui/sidebar';
import AppSidebar from './AppSidebar';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
        <div className="flex min-h-screen w-full bg-muted/40">
            <AppSidebar />
            <SidebarInset className="flex flex-col">
                {children}
            </SidebarInset>
        </div>
    </SidebarProvider>
  )
}

export default DashboardLayout;
