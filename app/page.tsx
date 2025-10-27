import { AccountStats } from "@/src/layout/Account-Stats";
import { FileForm } from "@/src/layout/File-Form";
import { Graph } from "@/src/layout/Graph";

export default function Page() {
  return (
    <main className="h-min-screen flex items-center flex-col gap-3 max-w-7xl w-full mx-auto pt-8 px-4">
      <div className="max-w-4xl w-full" id="#graph">
        <Graph />
      </div>
      <div className="max-w-4xl w-full" id="#form">
        <FileForm />
      </div>
      <div id="#carrousel">
        <AccountStats />
      </div>
    </main>
  );
}
