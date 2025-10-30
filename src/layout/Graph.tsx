"use client";

import { getChallenges } from "@/app/actions/challenge";
import { Challenge } from "@/app/generated/prisma";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState, useTransition } from "react";
import { Chart } from "../components/Chart";
import { Loading } from "../components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { ButtonGroup } from "../components/ui/button-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import {
  ChartData,
  filteredDataDate,
  filteredWeapons,
  getAllWeaponName,
} from "../lib/utils";

export function Graph() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isPending, startTransition] = useTransition();
  const [timeRange, setTimeRange] = useState<{ label: string; value: string }>({
    label: "7 jours",
    value: "7d",
  });
  const [weaponName, setWeaponName] = useState("Toutes les armes");
  const [filteredData, setFilteredData] = useState<ChartData[]>([]);
  const allWeaponsNames = getAllWeaponName();

  useEffect(() => {
    const isMounted = true;
    if (!isMounted) return;

    const getChallengesData = () => {
      startTransition(async () => {
        // Reset state
        setFilteredData([]);

        const challenges = await getChallenges();

        const chartChallenges = challenges.filter(
          (challenge) =>
            challenge.challengeName === "STRAFING DUMMY" &&
            challenge.accuracy !== 0
        );

        setChallenges(chartChallenges);

        const data = filteredWeapons(
          chartChallenges,
          weaponName,
          timeRange.value
        );
        setFilteredData(data);
      });
    };

    getChallengesData();
  }, [timeRange.value, weaponName]);

  const onDateChange = (timeRange: string) => {
    startTransition(() => {
      switch (timeRange) {
        case "7d":
          setTimeRange({ label: "7 jours", value: "7d" });
          break;
        case "30d":
          setTimeRange({ label: "30 jours", value: "30d" });
          break;
        case "90d":
          setTimeRange({ label: "90 jours", value: "90d" });
          break;
        default:
          break;
      }

      const data = filteredDataDate(filteredData, timeRange);
      setFilteredData(data);
    });
  };

  const onWeaponChange = (weaponName: string) => {
    startTransition(() => {
      setWeaponName(weaponName);
      setFilteredData([]);

      const data = filteredWeapons(challenges, weaponName, timeRange.value);
      setFilteredData(data);
    });
  };

  if (isPending) return <Loading loadingString="Chargement du graphique" />;

  return (
    <Card>
      <CardHeader className="flex items-center mb-5 justify-between">
        <CardTitle className="border-b pb-2 text-lg font-semibold tracking-tight first:mt-0">
          Graphique de progrossion de l&apos;aim de Melvunx
        </CardTitle>
        <ButtonGroup>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`${
                  timeRange.value === "7d"
                    ? "text-lime-300"
                    : timeRange.value === "30d"
                    ? "text-orange-300"
                    : "text-rose-300"
                }`}
              >
                {timeRange.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtrer par période</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={timeRange.value}
                onValueChange={(value) => onDateChange(value)}
              >
                <DropdownMenuRadioItem
                  className={
                    timeRange.value === "90d"
                      ? "bg-primary/10 border-l-2 border-primary"
                      : "hover:bg-accent"
                  }
                  value="90d"
                >
                  90 derniers jours
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className={
                    timeRange.value === "30d"
                      ? "bg-primary/10 border-l-2 border-primary"
                      : "hover:bg-accent"
                  }
                  value="30d"
                >
                  30 derniers jours
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className={
                    timeRange.value === "7d"
                      ? "bg-primary/10 border-l-2 border-primary"
                      : "hover:bg-accent"
                  }
                  value="7d"
                >
                  7 derniers jours
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`${
                  weaponName === "Toutes les armes"
                    ? "text-cyan-100"
                    : "text-primary"
                }`}
              >
                {weaponName}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-center">
                Filtrer par arme
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                className="text-center h-56"
                value={weaponName}
                onValueChange={(value) => onWeaponChange(value)}
              >
                <DropdownMenuRadioItem value="Toutes les armes">
                  Toutes les armes
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                {Object.entries(allWeaponsNames).map(([type, weapons]) => (
                  <div key={type}>
                    <DropdownMenuLabel className="font-semibold text-xs uppercase bg-gray-400/10 text-muted-foreground italic px-2 py-1.5">
                      {type}
                    </DropdownMenuLabel>
                    {weapons.map((weapon) => {
                      const isSelected = weaponName === weapon.name;

                      return (
                        <DropdownMenuRadioItem
                          key={weapon.name}
                          value={weapon.name}
                          className={`flex w-full items-center my-1 rounded-sm transition-colors ${
                            isSelected
                              ? "bg-primary/10 border-l-2 border-primary"
                              : "hover:bg-accent"
                          }`}
                        >
                          <Avatar>
                            <AvatarImage src={weapon.path.badge} />
                            <AvatarFallback>
                              {weapon.name.slice(0, 3).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span
                            className={`ml-1 ${
                              isSelected ? "font-bold text-primary" : ""
                            }`}
                          >
                            {weapon.name}
                          </span>
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </div>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </CardHeader>
      <CardContent>
        <Chart
          data={filteredData}
          isChanges={isPending}
          timeRange={timeRange.value}
        />
      </CardContent>
      <CardFooter>
        <div>
          <p className="text-sm text-muted-foreground">
            {`Affichage des données pour ${
              weaponName === "Toutes les armes"
                ? "toutes les armes"
                : weaponName
            } sur les ${timeRange.label}.`}
          </p>
          {filteredData.length === 0 && (
            <p className="text-sm text-red-500">
              Aucune donnée disponible pour les filtres sélectionnés.
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
