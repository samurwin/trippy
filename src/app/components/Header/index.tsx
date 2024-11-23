import Image from "next/image";

import logo from "../../../../public/images/trouvaille-logo.png";

export default function Header(){
  return(
    <header>
      <Image src={logo} alt="Trouvaille Trip Planner Logo" priority/>
      <nav>
        <a className="navItem" href="#">login / signup</a>
      </nav>
    </header>
  )
}