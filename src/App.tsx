import "./global.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import { Loading } from "./components/Loading";
import clsx from "clsx";

interface PokemonTypeData {
  type: {
    name: string;
  };
}

interface PokemonData {
  id: number;
  name: string;
  types: PokemonTypeData[];
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

function App() {
  const [input, setInput] = useState("");
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${input}/`
    ).then((res) =>
      res.json().then((data) => {
        if (data.name === input) {
          setPokemon({
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            sprites: data.sprites,
            types: data.types.map((typeData: any) => ({
              type: {
                name: typeData.type.name,
              },
            })),
          });
        }
      })
    );
  }

  const trueWeight = pokemon?.weight ? pokemon?.weight / 10 : "";
  const trueHeight = pokemon?.height ? pokemon?.height / 10 : "";

  return (
    <div className="h-screen w-screen bg-gray-200 flex items-center justify-center">
      <Card className="w-52 scale-[2.5] bg-red-500 ring-4 ring-red-900 m-4 rounded shadow-[rgba(0,_0,_0,_0.5)_0px_10px_10px]">
        <hr className="relative w-23 h-0.25 mt-4 bg-gray-900 border-0 translate-x-[114px]" />
        <hr className="relative w-10 h-0.25 mx-auto mt-4 bg-gray-900 border-0 rotate-120" />
        <hr className="relative w-23 h-0.25 mr-0 mt-4 bg-gray-900 border-0" />
        <button className="absolute h-6 w-6 rounded-full ring-2 ring-blue-300 translate-x-6 translate-y-4 bg-blue-200" />
        <CardHeader
          floated={false}
          className="flex justify-center items-center bg-blue-gray-100 border-8 shadow-inner"
        >
          {input != "" ? (
            <img className="w-28 h-28" src={pokemon?.sprites.front_default} />
          ) : (
            <Loading />
          )}
        </CardHeader>
        <CardBody className="mx-4 mt-2 p-1 h-30 rounded-md justify-center items-center border-2 border-gray-700 bg-gray-900 text-center text-xs">
          <div className="flex justify-center items-center">
            <span
              className={clsx("border-2 text-xs px-0.5 rounded", {
                "bg-blue-100 border-blue-300 text-blue-500":
                  pokemon?.types[0].type.name === "water",
                "bg-cyan-100 border-cyan-300  text-cyan-500":
                  pokemon?.types[0].type.name === "ice",
                "bg-gray-200 border-gray-700 text-zinc-600":
                  pokemon?.types[0].type.name === "normal",
                "bg-gray-500 border-gray-700 text-gray-900":
                  pokemon?.types[0].type.name === "rock",
                "bg-orange-500 border-red-600 text-red-900":
                  pokemon?.types[0].type.name === "fire",
                "bg-green-300 border-green-700 text-green-900":
                  pokemon?.types[0].type.name === "grass",
                "bg-lime-100 border-lime-500 text-lime-700":
                  pokemon?.types[0].type.name === "bug",
                "bg-yellow-300 border-yellow-700 text-yellow-900":
                  pokemon?.types[0].type.name === "electric",
                "bg-indigo-300 border-indigo-700 text-indigo-900":
                  pokemon?.types[0].type.name === "dragon",
                "bg-red-700 border-brown text-gray-900":
                  pokemon?.types[0].type.name === "fighting",
                "bg-purple-300 border-purple-500 text-white":
                  pokemon?.types[0].type.name === "ghost",
                "bg-amber-800 border-brown text-black":
                  pokemon?.types[0].type.name === "ground",
                "bg-purple-100 border-purple-300 text-purple-600":
                  pokemon?.types[0].type.name === "poison",
                "bg-pink-100 border-pink-300 text-pink-800 ":
                  pokemon?.types[0].type.name === "fairy",
                "bg-pink-500 border-pink-700 text-pink-900":
                  pokemon?.types[0].type.name === "psychic",
              })}
            >
              {pokemon?.types[0].type.name}
            </span>
          </div>
          <p>Weight: {trueWeight}kg</p>
          <p>Height: {trueHeight} m</p>
          <p>Nº: {pokemon?.id}</p>
        </CardBody>
        <CardFooter className="flex justify-center py-0.5 m-1">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="w-full px-2 border-2 border-gray-400 rounded-md text-sm"
              onChange={(e) => setInput(e.target.value.toLowerCase())}
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
