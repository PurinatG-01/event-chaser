"use client"
import { Container, Text } from "@nextui-org/react"
import MainLayout from "~/layouts/MainLayout"

export default function Home() {
  return (
    <MainLayout>
      <div className="flex-grow container py-4 !max-w-[1400px]">
        <section className="hero-section px-4 pb-4 pt-[76px] w-screen h-screen top-0 left-0 absolute z-10">
          <Text
            h1
            className="text-center md:text-left "
            css={{
              textGradient: "45deg, $blue600 -20%, $red600 50%",
            }}
          >
            Event Chaser
          </Text>
          <Text p className="text-center">
            Your Ultimate Event Ticket Seller! Experience the thrill of
            concerts, sports, and live performances. Simple, secure booking, and
            unparalleled selection. Join the chase today!.
          </Text>
        </section>
      </div>
    </MainLayout>
  )
}

// https://c4.wallpaperflare.com/wallpaper/764/590/391/inception-leonardo-dicaprio-movie-posters-2400x3500-entertainment-movies-hd-art-wallpaper-preview.jpg
