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

        setChallenges(chartChallenges.slice(0, 100));
      });
    };

    getChallengesData();
  }, []);

  const onDateChange = (value: string) => {
    startTransition(() => {
      setFilteredData([]);

      switch (value) {
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

      const data = filteredDataDate(filteredData, value);
      setFilteredData(data);
    });
  };

  const onWeaponChange = (value: string) => {
    startTransition(() => {
      setWeaponName(value);
      setFilteredData([]);

      const data = filteredWeapons(challenges, value);
      setFilteredData(data);
    });
  };

  if (isPending) return <Loading loadingString="Chargement du graphique" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test pour la précision</CardTitle>
        <ButtonGroup>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{timeRange.label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtrer par période</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={timeRange.value}
                onValueChange={(value) => onDateChange(value)}
              >
                <DropdownMenuRadioItem value="90d">
                  90 derniers jours
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="30d">
                  30 derniers jours
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="7d">
                  7 derniers jours
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{weaponName}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtrer par arme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={weaponName}
                onValueChange={(value) => onWeaponChange(value)}
              >
                <DropdownMenuRadioItem value="Toutes les armes">
                  Toutes les armes
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                {allWeaponsNames.map((w) => (
                  <DropdownMenuRadioItem
                    key={w.name}
                    value={w.name}
                    className="flex items-center justify-center gap-2"
                  >
                    <Avatar>
                      <AvatarImage src={w.path.badge} />
                      <AvatarFallback>
                        {w.name.slice(0, 3).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {w.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </CardHeader>
      <CardContent>
        <Chart data={filteredData} isChanges={isPending} />
      </CardContent>
    </Card>
  );
}
