"use client"
import { Button, Container, Text } from "@nextui-org/react"
import MainLayout from "~/layouts/MainLayout"
import { motion } from "framer-motion"
const HeroTitle = motion(Text)
export default function Home() {
  return (
    <MainLayout>
      <div className="relative items-center justify-around flex flex-grow container py-4 !max-w-[1400px] mx-auto">
        <motion.section
          initial={{ y: -20, opacity: 0, clipPath: "circle(0.3% at 0 0)" }}
          animate={{ y: 0, opacity: 1, clipPath: "circle(140.9% at 0 0)" }}
          transition={{ duration: 1.5 }}
          className="flex flex-col hero-section px-4 pb-[20vw] md:pb-4 pt-[76px] gap-4 justify-center md:justify-start"
        >
          <HeroTitle
            h1
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
            className="text-center md:text-left text-[60px] md:text-[120px]"
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
            <Button
              as="a"
              href="/list"
              className="flex-grow"
              color="gradient"
              shadow
            >
              Explore
            </Button>
            <Button className="flex-grow" bordered color="gradient">
              About me
            </Button>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ y: [0, -10, 0], opacity: 1 }}
          transition={{ duration: 3 }}
          className="self-end hidden md:block hero-image w-[40vw] h-[50vh] max-h-[500px]"
        >
          <img
            className="w-full h-full object-contain"
            src="https://static.vecteezy.com/system/resources/previews/008/525/719/large_2x/3d-illustration-character-high-school-boy-free-png.png"
          />
        </motion.section>
      </div>
    </MainLayout>
  )
}
