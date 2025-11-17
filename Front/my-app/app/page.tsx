import BioProp from "./components/BioProp";
import ChemInfo from "./components/ChemInfo";
import GenInfo from "./components/GenInfo";
import Sample from "./components/Sample";
import Source from "./components/Source";

export default function Home() {
  return (
    <div>
      <header className="bg-green-700 text-white h-15 font-bold text-xl text-center p-4"> BRnpKG </header>
      <div className="flex flex-row justify-center
">
        <div>
          <GenInfo />
          <Sample />
          <Source />
          <BioProp />
        </div>


        <div className="flex items-center gap-2">
          <ChemInfo />
        </div>
      </div>

    </div>
  );
}
