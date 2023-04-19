import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { type MenuItemProps } from "~/types";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export const MenuItem: React.FC<MenuItemProps> = ({isOpen, toggle}) => {
  return (
    
    <>
      {isOpen && (
        <>
          <motion.li
            variants={variants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='text-black py-1 w-0'
          >
            <Link href="/" onClick = {toggle}> Home </Link>
          </motion.li>
          <motion.li
            variants={variants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='text-black py-1 w-32'
          >
            <Link href="/DailySchedule" onClick = {toggle}> Daily Schedule </Link>
          </motion.li>
          <motion.li
            variants={variants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='text-black py-1 w-0'
          >
            <Link href="/MyList" onClick = {toggle}> MyList </Link>
          </motion.li>
        </>
      )}
    </>
  );
};
