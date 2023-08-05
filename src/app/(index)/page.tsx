"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import PageWrapper from "~/components/PageWrapper"

const ExploreButton = motion(Link)
const HeroTitle = motion.h1

export default function Home() {
  return (
    <PageWrapper>
      <div className="relative items-center justify-around flex flex-grow container py-4 !max-w-[1400px] mx-auto">
        <motion.section className="flex flex-col hero-section px-4 pb-[20vw] md:pb-4 pt-[76px] gap-4 justify-center md:justify-start">
          <HeroTitle
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="font-bold text-center md:text-left text-[60px] md:text-[120px]"
          >
            Event
            <br />
            Chaser
          </HeroTitle>
          <p className="indent-4 text-center md:text-left md:max-w-[40vw]">
            Your Ultimate Event Ticket Seller! Experience the thrill of
            concerts, sports, and live performances. Simple, secure booking, and
            unparalleled selection. Join the chase today!.
          </p>
          <div className="self-center md:self-start flex gap-4 flex-wrap items-center justify-center md:justify-start max-w-[500px] w-full">
            <ExploreButton className="btn btn-outline w-full" href="/list">
              Explore
            </ExploreButton>
          </div>
        </motion.section>
        <motion.section
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.2 }}
          className="self-end hidden md:block hero-image w-[40vw] h-[50vh] max-h-[500px]"
        >
          <img
            className="w-full h-full object-contain"
            src="https://static.vecteezy.com/system/resources/previews/008/525/719/large_2x/3d-illustration-character-high-school-boy-free-png.png"
          />
        </motion.section>
      </div>
    </PageWrapper>
  )
}
