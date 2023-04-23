import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

//This whole set of components is for the hamburger menu.  Check out the framer motion docs if you want to learn more about this 
//(This is taken from the example in the docs with only slight modifications)
// https://www.framer.com/motion/examples/
export const HamburgerMenu = () => {
  const [isOpen, toggleOpen] = useCycle<boolean>(false, true);
  const containerRef = useRef(null);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      className = 'fixed top-6 navBig:hidden'
    >
      <MenuToggle toggle={() => toggleOpen()} />
      <Navigation isOpen = {isOpen} toggle={() => toggleOpen()}  />
    </motion.nav>
  );
};
