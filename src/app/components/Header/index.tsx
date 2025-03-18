import Image from "next/image";

import logo from "../../../../public/images/trippy.png";

export default function Header(){
  return(
    <header>
      <div>
      <Image src={logo} alt="Trippy Trip Planner Logo" priority/>
      <nav>
        <a className="navItem" href="#">login / signup</a>
      </nav>
      </div>
    </header>
  )
}