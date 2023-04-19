import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { type MenuItemProps } from "~/types";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    opacity: 1,
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    opacity: 0,
  }
};

export const Navigation: React.FC<MenuItemProps> = ({isOpen, toggle}) => (
  <motion.ul variants={variants} className = 'bg-slate-200 w-screen z-0 px-6 py-4'>
    <MenuItem isOpen = {isOpen} toggle = {toggle} />
  </motion.ul>
);
