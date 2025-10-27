"use client";

import { WeaponStat } from "../lib/utils";
import { Loading } from "./Loading";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type CarrouselProps = {
  stats: WeaponStat[];
  pending: boolean;
};

export function Carrousel({ stats, pending }: CarrouselProps) {
  if (pending) return <Loading loadingString="Chargement des données" />;

  return (
    <Carousel
      className="w-full max-w-2xl mx-auto"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="flex items-center">
        {stats.map((stat) => (
          <div key={stat.weapon_name} className="py-1 px-3">
            <Card className="w-sm max-w-xs">
              <CardHeader className="flex flex-col items-center gap-2">
                <CardTitle className="flex w-1/2 max-w-md items-center px-2 justify-around scroll-m-20 text-2xl font-semibold tracking-tight">
                  <Avatar>
                    <AvatarImage src={stat.image_path.badge} />
                    <AvatarFallback>
                      {stat.weapon_name.slice(0, 3).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {stat.weapon_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="text-center text-3xl font-bold">
                    Précision globale : {stat.averge.accuracy.toFixed(2)} %
                  </div>
                  <div className="text-center text-lg font-medium">
                    <div className="text-center text-lg font-medium">
                      Taux de balles touchées :{" "}
                      {stat.averge.shots_hit.toFixed(2)}
                    </div>
                    Taux de frags : {stat.averge.kills.toFixed(0)}
                  </div>
                  <div className="text-center text-lg font-medium">
                    Taux de dégats : {stat.averge.damage.toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
