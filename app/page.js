import Hero from "../components/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
      <section className="min-h-screen bg-harbor text-mist grid place-items-center px-6">
        <p className="font-display text-3xl md:text-5xl max-w-3xl text-center leading-tight">
          The road keeps going. So does the page.
        </p>
      </section>
    </main>
  );
}
