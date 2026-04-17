import FeaturedCollections from "@/components/home/FeaturedCollections";
import Hero from "@/components/home/Hero";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import Newsletter from "@/components/home/Newsletter";
import ProductShowcase from "@/components/home/ProductShowcase";
import RoomBuilder from "@/components/home/RoomBuilder";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";
import React from "react";


export default function Home() {

  return (
    <div className="app">
      <Hero/>
      <MarqueeStrip/>
      <FeaturedCollections/>
      <WhyUs/>
      <ProductShowcase/>
      <RoomBuilder/>
      <Testimonials/>
      <Newsletter/>
    </div>
  );
}