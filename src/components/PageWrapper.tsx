"use client"
import React from "react"
import { motion } from "framer-motion"
export default function PageWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="pt-16"
    >
      <motion.div
        transition={{ duration: 0.7 }}
        initial={{ clipPath: "polygon(0 1%, 100% 0, 100% 100%, 0% 100%)" }}
        animate={{ clipPath: "polygon(0 1%, 0 0, 0 100%, 0% 100%)" }}
        exit={{ clipPath: "polygon(0 1%, 100% 0, 100% 100%, 0% 100%)" }}
        className="top-0 left-0 absolute w-[50vw] h-screen z-[50]"
      ></motion.div>
      <motion.div
        transition={{ duration: 0.7 }}
        initial={{ clipPath: "polygon(0 1%, 100% 0, 100% 100%, 0 100%)" }}
        animate={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
        exit={{ clipPath: "polygon(0 1%, 100% 0, 100% 100%, 0 100%)" }}
        className="top-0 right-0 absolute w-[50vw] h-screen z-[50]"
      ></motion.div>
      {children}
    </motion.div>
  )
}
