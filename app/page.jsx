import Feed from "@/components/Feed";

function Home() {
  return (
    <>
    <section className="w-full flex-center flex-col">
      <h1 className="text-center head_text font-bold">Discover & Share</h1>
      <br className="max-md:hidden"/>
      <h1 className="text-center text-7xl font-bold font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">AI-Powered Prompts</h1>
    <p className="desc text-center">
    PromptCraft is an open-source AI prompting tool for modern world to discover, create and share creative prompts
    </p>
    </section>
    <Feed/>
    </>
  );
}

export default Home;
