"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "../../constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
const Sidebar = ({ user }: SiderbarProps) => {
    const pathName = usePathname();
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-6">
                <Link
                    href="/"
                    className="flex mb-12 cursor-pointer items-center gap-2"
                >
                    <Image
                        src="/icons/logo.svg"
                        alt="logo"
                        width={34}
                        height={34}
                        className="size-[24px] max-xl:size-14"
                    />
                    <h1 className="sidebar-logo">Akahu Finance</h1>
                </Link>
                {sidebarLinks.map((item) => {
                    const isActive =
                        pathName === item.route ||
                        pathName.startsWith(`${item.route}/`);

                    return (
                        <Link
                            href={item.route}
                            className={cn("sidebar-link", {
                                "bg-bank-gradient": isActive, // When link is active makes the bg blue
                            })}
                            key={item.label}
                        >
                            <div className="relative size-6">
                                <Image
                                    src={item.imgURL}
                                    alt={item.label}
                                    fill
                                    className={cn({
                                        "brightness-[3] invert-0": isActive, //make it so when it active the ICON is white instead of grey
                                    })}
                                ></Image>
                            </div>
                            <p
                                className={cn("sidebar-label", {
                                    "!text-white": isActive, //make it so when it active the ICON is white instead of grey
                                })}
                            >
                                {item.label}
                            </p>
                        </Link>
                    );
                })}
                USER
            </nav>
            FOOTER
        </section>
    );
};

export default Sidebar;
