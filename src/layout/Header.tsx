"use client";

import { useEffect, useState } from "react";
import { LinkButton } from "../components/LinkButton";
import { Navbar } from "../components/Navbar";
import { LinkType } from "../lib/utils";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOnTop, setIsOnTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const links = [
    { link: "#graph", label: "Graphique" },
    { link: "#form", label: "Ajouter des stats" },
    {
      link: "#carrousel",
      label: "Stats par armes",
    },
  ] satisfies LinkType[];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 70) {
        setIsOnTop(false);
        if (currentScrollY > lastScrollY)
          setIsVisible(false); // Scroller vers le bas
        else setIsVisible(true); // Scroller vers le haut
      } else {
        setIsVisible(false); // En haut
        setIsOnTop(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="mb-14">
      <nav
        className={`fixed top-0 left-0 right-0 transition-transform duration-300 z-50 ${
          isOnTop ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="croll-m-20 ml-4 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            R5 Melvunx tracker
          </h1>
          <ul className="max-w-lg w-full flex justify-evenly">
            {links.map((l) => {
              const { link, label } = l;
              return (
                <li key={link}>
                  <LinkButton
                    variant="outline"
                    classname="backdrop-blur-sm"
                    link={link}
                  >
                    {label}
                  </LinkButton>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <Navbar visible={isVisible} />
    </header>
  );
}
