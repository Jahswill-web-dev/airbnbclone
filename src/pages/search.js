import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import InfoCard from "@/Components/InfoCard";
import { format } from "date-fns";
import { useRouter } from "next/router";

function Search({ results }) {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numberOfGuests}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays for {range} for {numberOfGuests} guests{" "}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-5800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="flex flex-col">
            {results?.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const results = await fetch("https://www.jsonkeeper.com/b/5NPS").then((res) =>
    res.json()
  );
  return {
    props: {
      results,
    },
  };
}
