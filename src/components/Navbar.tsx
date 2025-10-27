"use client";

import { LinkType } from "../lib/utils";
import { LinkButton } from "./LinkButton";
import { ButtonGroup } from "./ui/button-group";

type NavbarProps = {
  visible: boolean;
};

export function Navbar({ visible }: NavbarProps) {
  const links = [
    { link: "#graph", label: "Graphique", variant: "ghost", size: "lg" },
    { link: "#form", label: "Apex formulaire", variant: "ghost", size: "lg" },
    {
      link: "#carrousel",
      label: "Stats par armes",
      variant: "ghost",
      size: "lg",
    },
  ] satisfies LinkType[];

  return (
    <ButtonGroup
      className={`fixed top-0 left-0 right-0 transition-transform duration-300 z-50 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {links.map((l) => {
        const { link, label, variant, size } = l;
        return (
          <LinkButton key={link} link={link} variant={variant} size={size}>
            {label}
          </LinkButton>
        );
      })}
    </ButtonGroup>
  );
}
