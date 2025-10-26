"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="cursor-pointer"
      variant="ghost"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <span>
          Envoie en cours <Spinner />
        </span>
      ) : (
        "Envoyer"
      )}
    </Button>
  );
}
