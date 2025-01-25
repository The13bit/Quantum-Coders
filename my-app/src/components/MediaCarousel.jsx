"use client";
import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function MediaCarousel({
  images
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    (<Card className="w-full">
      <CardContent className="p-0 relative">
        <div className="relative h-64 md:h-96">
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Project image ${currentIndex + 1}`}
            fill
            style={{ objectFit: "cover" }} />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 transform -translate-y-1/2"
          onClick={prevSlide}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={nextSlide}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"}`} />
          ))}
        </div>
      </CardContent>
    </Card>)
  );
}

