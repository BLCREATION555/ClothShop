import heroImage from "../../assets/hero-premium.png";

function HeroImageMobile() {
  return (
    <div className="flex justify-center mt-2">
   <img
  src={heroImage}
  alt="BL CREATION"
  className="
  w-full
  h-[540px]

  object-cover
  object-[65%_center]

  rounded-xl

  select-none
  pointer-events-none
"
/>
    </div>
  );
}

export default HeroImageMobile;