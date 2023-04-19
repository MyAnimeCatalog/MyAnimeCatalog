import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";


export const HamburgerMenu = () => {
  const [isOpen, toggleOpen] = useCycle<boolean>(false, true);
  const containerRef = useRef(null);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      className = 'fixed top-6 lg:hidden'
    >
      <MenuToggle toggle={() => toggleOpen()} />
      <Navigation isOpen = {isOpen} toggle={() => toggleOpen()}  />
    </motion.nav>
  );
};
