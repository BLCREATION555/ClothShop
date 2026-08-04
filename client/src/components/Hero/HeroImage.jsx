import heroImage from "../../assets/hero-premium.png";

function HeroImage() {
  return (
    <div
     className="
  relative
  w-full

  flex
  justify-center
  items-center

  py-2

  lg:absolute
  lg:top-0
  lg:right-0
  lg:h-full

  overflow-hidden
"
    >
      {/* Top Blend */}
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-24

          bg-gradient-to-b
          from-[#E9CCA9]
          via-[#E9CCA9]/80
          to-transparent

          z-20
        "
      />

      {/* Image */}
      <div
        className="
          relative
          flex
          justify-center

          lg:absolute
          lg:top-0
          lg:right-0
          lg:block
        "
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 100%)",
        }}
      >
        <img
          src={heroImage}
          alt="BL CREATION"
          className="
  relative

  translate-x-0
  lg:translate-x-10

  mb-6
  lg:mb-0

  z-10

  w-[360px]
h-[520px]

  sm:w-[420px]
  sm:h-[560px]

  md:w-[520px]
  md:h-[720px]

  lg:w-auto
  lg:h-[1300px]

  object-contain

  drop-shadow-[0_45px_80px_rgba(0,0,0,0.18)]

  transition-all
  duration-500

  select-none
  pointer-events-none
"

        />
      </div>
    </div>
  );
}

export default HeroImage;