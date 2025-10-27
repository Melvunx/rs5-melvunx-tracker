"use client";

import clsx from "clsx";
import Link from "next/link";
import { Button } from "./ui/button";

type LinkButtonProps = {
  children: React.ReactNode;
  size?: "sm" | "lg";
  variant?: "outline" | "ghost" | "link" | "destructive" | "secondary";
  link: string;
  classname?: string;
};

export function LinkButton({
  children,
  link: href,
  size,
  variant,
  classname,
}: LinkButtonProps) {
  return (
    <Button
      className={clsx("cursor-pointer", classname)}
      size={size || "default"}
      variant={variant || "default"}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
