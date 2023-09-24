import Header from "@/components/header.component";

export default async function Home() {
  return (
    <>
      <Header />
      <section className="min-h-screen pt-10">
        <div className="max-w-4xl mx-auto rounded-md h-[20rem] flex justify-center items-center">
          <img className="pr-2" src="/images/jumbotron.svg" alt="" />
        </div>
      </section>
    </>
  );
}
