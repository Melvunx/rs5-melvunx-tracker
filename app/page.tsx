"use client";

import { FileForm } from "@/src/layout/File-Form";

export default function Home() {
  //Test
  // useEffect(
  //   () =>
  //     weapons
  //       .filter((weapon) => weapon.getType() === "Fusils d'assaut")
  //       .forEach(async (weapon) => {
  //         const { accuracy } = await weapon.getMaxAccuracy();
  //         console.log(`Précision ${weapon.getName()} : ${accuracy}`);
  //       }),
  //   []
  // );

  return (
    <div>
      <FileForm />
    </div>
  );
}
