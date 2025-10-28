"use client";

import { useEffect, useState } from "react";
import { LinkType } from "../lib/utils";
import { LinkButton } from "./LinkButton";
import { ButtonGroup } from "./ui/button-group";

type NavbarProps = {
  visible: boolean;
};

export function Navbar({ visible }: NavbarProps) {
  const [section, setSection] = useState("#graph");
  const [lastScrollY, setLastScrollY] = useState(0);

  const links = [
    {
      link: "#graph",
      label: "Graphique",
      classname: "text-indigo-200",
    },
    {
      link: "#form",
      label: "Apex formulaire",
      classname: "text-amber-200",
    },
    {
      link: "#carrousel",
      label: "Stats par armes",
      classname: "text-lime-200",
    },
  ] satisfies LinkType[];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 333) setSection("#graph");
      else if (currentScrollY >= 334 && currentScrollY <= 666)
        setSection("#form");
      else setSection("#carrousel");

      console.log(lastScrollY);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <ButtonGroup
      className={`fixed top-3 right-1/2 translate-1/2 transition-all duration-500 z-50 ${
        visible ? "translate-y-0" : "-translate-y-16"
      }`}
    >
      {links.map((l) => {
        const { link, label, classname } = l;
        return (
          <LinkButton
            key={link}
            classname={`backdrop-blur-sm italic ${
              section === link ? classname : ""
            }`}
            link={link}
            variant="outline"
            size="lg"
          >
            {label}
          </LinkButton>
        );
      })}
    </ButtonGroup>
  );
}
