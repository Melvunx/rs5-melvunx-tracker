import { FileForm } from "@/src/layout/File-Form";
import { Graph } from "@/src/layout/Graph";

export default function Page() {
  return (
    <main className="h-min-screen flex items-center flex-col max-w-7xl mx-auto pt-8 px-4">
      <div className="max-w-4xl w-full" id="#graph">
        <Graph />
      </div>
      <div id="#form">
        <FileForm />
      </div>
      <div id="#carrousel">Caroussel</div>
    </main>
  );
}
