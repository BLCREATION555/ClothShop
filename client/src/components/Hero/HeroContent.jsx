import HeroButtons from "./HeroButtons";
import HeroFeatures from "./HeroFeatures";

function HeroContent({ desktop, mobile }) {
  return (
    <div
      className={`
        relative z-20
        ${desktop ? "text-left" : "text-center"}
      `}
    >
      {/* Badge */}

    
      {/* Heading */}

      <h1
        className="
          mt-8
          font-black
          leading-[1]
          tracking-tight

          text-[42px]
          sm:text-[64px]
          lg:text-[74px]
        "
      >
        Luxury

        <span className="text-[#D89B00]">
          {" "}Men's
        </span>

        <br />

        & Kids

        <span className="text-[#D89B00]">
          {" "}Fashion
        </span>
      </h1>

      {/* Gold Line */}

      <div
        className={`
          mt-6
          h-1
          w-20
          bg-[#D89B00]
          rounded-full

          ${desktop ? "" : "mx-auto"}
        `}
      />

      {/* Description */}

      <p
        className={`
          mt-6
          text-gray-700
          leading-8

          text-base
          lg:text-[20px]

          max-w-[320px]
sm:max-w-[520px]

          ${desktop ? "" : "mx-auto"}
        `}
      >
        Upgrade your wardrobe with premium quality clothing crafted
        for style, comfort and confidence.

        <br />
        <br />

        Discover the latest collection only at

        <span className="font-bold text-black">
          {" "}BL CREATION.
        </span>
      </p>

{desktop && (
  <>
    <div className="mt-12">
      <HeroButtons />
    </div>

    <div className="mt-16">
      <HeroFeatures />
    </div>
  </>
)}

{mobile && null}

    </div>
  );
}

export default HeroContent;