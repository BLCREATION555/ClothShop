import HeroImageMobile from "./HeroImageMobile";
import HeroButtons from "./HeroButtons";
import HeroFeatures from "./HeroFeatures";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

function Hero() {
  return (
    <section className="relative overflow-visible bg-[#F1DDC0]">

      {/* Background */}

      <div className="absolute inset-0">

        {/* Main Background */}

        <div className="absolute inset-0 bg-[#E9CCA9]"/>

        {/* Wall Texture */}       

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.12) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />

      </div>

      <div className="relative max-w-[1800px] mx-auto">

   {/* ===========================
      DESKTOP
=========================== */}

<div className="hidden lg:block max-w-[1700px] mx-auto px-16 py-12">

  {/* Top Badge */}

<div className="grid grid-cols-[38%_62%] gap-10 mt-8 items-start lg:min-h-[900px]">

  {/* LEFT */}

  <div>

    <span className="inline-flex items-center rounded-full bg-black text-white px-6 py-3 text-sm font-semibold tracking-[0.18em] shadow-xl">
      🔥 NEW COLLECTION 2026
    </span>

    <div className="mt-8">
      <HeroContent desktop />
    </div>

  </div>

  {/* RIGHT */}

  <HeroImage desktop />

</div>

</div>
{/* ===========================
    MOBILE
=========================== */}
<div className="lg:hidden px-5 pt-8">

  {/* Badge */}
  <div className="flex justify-center">
    <span className="inline-flex items-center rounded-full bg-black text-white px-5 py-2.5 text-xs font-semibold tracking-[0.18em] shadow-xl">
      🔥 NEW COLLECTION 2026
    </span>
  </div>

{/* Heading */}
<HeroContent mobile />

{/* Buttons + Image */}
<div className="relative mt-8 -mx-4">
  <HeroImageMobile />

  <div className="absolute left-0 top-8 z-20">
    <HeroButtons mobile />
  </div>
</div>

{/* Features */}
<div className="mt-6 pb-8">
  <HeroFeatures />
</div>
</div>
      </div>

    </section>
  );
}

export default Hero;