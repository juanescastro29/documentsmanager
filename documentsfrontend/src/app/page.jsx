import Peep from "./icons/Peep";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center p-5">
        <Peep />
        <h2 className="font-mono text-4xl text-center p-2">
          Welcome to Document Manager.
        </h2>
        <p className="font-mono text-slate-400 text-center p-1">
          You can keep your documents safe.
        </p>
      </div>
    </div>
  );
};

export default Home;
