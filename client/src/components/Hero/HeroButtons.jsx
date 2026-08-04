import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function HeroButtons({ desktop, tablet, mobile }) {
  return (
    <div
      className={`
        flex
        gap-5

        ${desktop ? "mt-8 justify-start flex-row" : ""}

        ${tablet ? "mt-12 justify-center flex-row" : ""}

       ${mobile ? "flex flex-col gap-4 mt-0 items-start" : ""}
      `}
    >
      <Link
  to="/men"
  className="
    group
    inline-flex
    items-center
    justify-center
    gap-3

    rounded-2xl
    bg-black

   w-[130px]
max-w-none

    px-9
    py-4

    lg:w-auto
    lg:max-w-none
    lg:px-10
    lg:py-5

    text-lg
    font-semibold
    text-white

    shadow-xl

    transition-all
    duration-300

    hover:bg-[#D89B00]
    hover:text-black
    hover:-translate-y-1
  "
>
  Shop Men

  <FiArrowRight
    size={22}
    className="
      transition-transform
      duration-300
      group-hover:translate-x-2
    "
  />
</Link>
<Link
  to="/kids"
  className="
    inline-flex
    items-center
    justify-center

    rounded-2xl

    border-2
    border-black

    w-[130px]
    max-w-[280px]

    px-9
    py-4

    lg:w-auto
    lg:max-w-none
    lg:px-10
    lg:py-5

    text-lg
    font-semibold

    transition-all
    duration-300

    hover:bg-black
    hover:text-white
  "
>
  Shop Kids
</Link>
    </div>
  );
}

export default HeroButtons;