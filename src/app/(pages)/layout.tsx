import React from "react";
import SideNav from "../components/nav/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full">
            {/* Side navbar */}
            <div className="w-64 h-screen sticky top-0 flex-shrink-0">
                <SideNav />
            </div>
            {/* children */}
            <div className="flex-grow h-full overflow-y-auto">
                {children}
            </div>
        </div>
    )
}