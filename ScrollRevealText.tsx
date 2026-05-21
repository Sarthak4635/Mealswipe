import { motion } from 'motion/react';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function ScrollRevealText({ text, className = "", delay = 0, once = true }: ScrollRevealTextProps) {
  // Split into words, preserving spaces
  const words = text.split(" ");
  
  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      }
    }
  };
  
  const childVars = {
    hidden: { 
      opacity: 0,
      y: "110%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] // Custom snappy spring-like bezier
      }
    }
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVars}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.22em] py-0.5">
          <motion.span variants={childVars} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
