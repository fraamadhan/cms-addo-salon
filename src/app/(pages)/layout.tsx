import React from "react";
import SideNav from "../components/nav/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Side navbar */}
            <div className="w-64 h-full sticky top-0 flex-shrink-0">
                <SideNav />
            </div>
            {/* children */}
            <div className="flex-grow h-full overflow-y-auto">
                {children}
            </div>
        </div>
    )
}