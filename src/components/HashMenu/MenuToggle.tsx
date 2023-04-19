import * as React from "react";
import { motion } from "framer-motion";
import { type MenuToggleProps, type PathProps } from "~/types";

const Path = (props: PathProps) => (
  <motion.path
    fill="black"
    strokeWidth="3"
    stroke="black"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle }) => (
  <button onClick={toggle}>
    <svg className = 'ml-8' width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);
