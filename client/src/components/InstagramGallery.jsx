import SectionTitle from "./SectionTitle";

const images = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
  "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
];

function InstagramGallery() {
  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          title="Follow @BL_CREATION"
          subtitle="Join our fashion community."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

          {images.map((img, index) => (

            <img
              key={index}
              src={img}
              alt=""
              className="rounded-2xl h-72 w-full object-cover hover:scale-105 transition duration-500"
            />

          ))}

        </div>

      </div>

    </section>
  );
}

export default InstagramGallery;