"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Monitor, Sun, Layers, Car, ArrowRight } from "lucide-react"

const categories = [
  {
    id: "control",
    name: "Control",
    description: "Advanced control solutions for seamless operation and monitoring.",
    subcategories: [
      {
        id: "matrix",
        name: "Matrix",
        products: [
          { name: "DSCON2100-0416H", subtitle: "Lamps Plus 1.5U EMBEDDED MULTI-SCREEN CONTROLLER", image: "/images/matrix_3.png" },
          { name: "DSCON2100-0412H", subtitle: "Lamps Plus 1.5U EMBEDDED MULTI-SCREEN CONTROLLER", image: "/images/matrix_3.png" },
          { name: "DSCON2100-0410H", subtitle: "Lamps Plus 1.5U EMBEDDED MULTI-SCREEN CONTROLLER", image: "/images/matrix_3.png" },
          { name: "DSCON3000-7U", subtitle: "Multi-screen Controller", image: "/images/matrix_2.png" },
          { name: "DSCON3000-4U", subtitle: "Multi-screen Controller", image: "/images/matrix_2.png" },
          { name: "M70-D-0205HO(-H)", subtitle: "2 Channel HDMI Distributed Decoding Box", image: "/images/matrix_1.png" },
          { name: "DSCON3000-M", subtitle: "Multi-screen Controller", image: "/images/matrix_3.png" },
          { name: "M60-7U", subtitle: "Multi-service Video Management Platform", image: "/images/matrix_2.png" },
          { name: "M70-4U-E", subtitle: "Multi-service Video Management Platform", image: "/images/matrix_2.png" },
          { name: "M60-12U", subtitle: "Multi-service Video Management Platform", image: "/images/matrix_2.png" },
        ]
      },
      {
        id: "keyboards",
        name: "Keyboards",
        products: [
          { name: "NKB5200(-F)", subtitle: "Android Network Control Keyboard", image: "/images/keyboard_1.png" },
          { name: "NKB1000-E", subtitle: "Network Keyboard", image: "/images/keyboard_2.png" },
          { name: "NKB1000", subtitle: "Network Keyboard", image: "/images/keyboard_2.png" },
        ]
      },
      {
        id: "decoders",
        name: "Decoders",
        products: [
          { name: "NVD0200FX-A01", subtitle: "Lamps Plus 2CH UHD NETWORK VIDEO DECODER", image: "/images/decoder_1.png" },
          { name: "NVD1605DU-4I-8K-2U2H", subtitle: "Lamps Plus 16CH UHD NETWORK VIDEO DECODER", image: "/images/decoder_1.png" },
          { name: "NVD2005DU-4I-8K-4H", subtitle: "Lamps Plus 20CH UHD NETWORK VIDEO DECODER", image: "/images/decoder_1.png" },
          { name: "NVD1205DU-4I-8K", subtitle: "Lamps Plus 12CH UHD NETWORK VIDEO DECODER", image: "/images/decoder_1.png" },
          { name: "NVD0405DU-2I-8K", subtitle: "Ultra-HD Network Video Decoder", image: "/images/decoder_1.png" },
          { name: "NVD0105DH-4K", subtitle: "Ultra-HD Network Video Decoder", image: "/images/decoder_1.png" },
          { name: "NVD2105DH-4I-4K", subtitle: "Ultra-HD Network Video Decoder", image: "/images/decoder_1.png" },
          { name: "NVD1805DH-4I-4K", subtitle: "Ultra-HD Network Video Decoder", image: "/images/decoder_1.png" },
          { name: "NVD1505DH-4I-4K", subtitle: "Ultra-HD Network Video Decoder", image: "/images/decoder_1.png" },
          { name: "NVD1205DH-4I-4K", subtitle: "Ultra-HD Network Video Decoder", image: "/images/decoder_1.png" },
        ]
      },
      {
        id: "encoder",
        name: "Encoder",
        products: [
          { name: "NEB0105HI-4K", subtitle: "1 Channel Distributed Encoding Box", image: "/images/encoder_1.png" },
        ]
      }
    ]
  },
  {
    id: "lcd-video-walls",
    name: "LCD Video Walls",
    description: "Immersive, seamless LCD Video Walls for high-impact visual experiences.",
    subcategories: [
      {
        id: "essential",
        name: "Essential Series",
        products: [
          { name: "LS490UCM-EF", subtitle: "49\" FHD Video Wall Display Unit (Ultra Narrow Bezel 3.5mm)", image: "/images/lcd_video_wall_1.png" },
          { name: "LS550UEM-EF", subtitle: "55\" FHD Video Wall Display Unit (Ultra Narrow Bezel 0.88mm)", image: "/images/lcd_video_wall_1.png" },
          { name: "LS550UEH-EF", subtitle: "55\" FHD Video Wall Display Unit (Ultra Narrow Bezel 0.88mm)", image: "/images/lcd_video_wall_1.png" },
          { name: "LS550UCM-EF", subtitle: "55\" FHD Video Wall Display Unit (Ultra Narrow Bezel 3.5mm)", image: "/images/lcd_video_wall_1.png" },
        ]
      },
      {
        id: "basic",
        name: "Basic Series",
        products: []
      },
      {
        id: "ultra",
        name: "Ultra Series",
        products: [
          { name: "LS650KCM-UF", subtitle: "Lamps Plus 65 inch 3.5mm LCD Display Wall Unit (LCD DISPLAY)", image: "/images/lcd_video_wall_2.png" },
          { name: "LS550UEM-UF", subtitle: "Lamps Plus 55 inch 0.88mm LCD Display Wall Unit (LCD DISPLAY)", image: "/images/lcd_video_wall_2.png" },
          { name: "LS550UEH-UF", subtitle: "Lamps Plus 55 inch 0.88mm LCD Display Wall Unit (LCD DISPLAY)", image: "/images/lcd_video_wall_2.png" },
          { name: "LS550KDM-UF", subtitle: "55\" UHD Video Wall Display Unit (Ultra Narrow Bezel 1.7mm)", image: "/images/lcd_video_wall_2.png" },
          { name: "LS550KDH-UF", subtitle: "55\" UHD Video Wall Display Unit (Ultra Narrow Bezel 1.7mm)", image: "/images/lcd_video_wall_2.png" },
          { name: "LS460UDM-UF", subtitle: "46\" FHD Video Wall Display Unit (Ultra Narrow Bezel 1.7mm)", image: "/images/lcd_video_wall_2.png" },
          { name: "LS550UDM-UF", subtitle: "55\" FHD Video Wall Display Unit (Ultra Narrow Bezel 1.7mm)", image: "/images/lcd_video_wall_2.png" },
          { name: "LS550UEH-UG", subtitle: "55\" FHD Video Wall Display Unit (Ultra Narrow Bezel 0.88mm)", image: "/images/lcd_video_wall_2.png" },
          { name: "LS550UCM-UF", subtitle: "55\" FHD Video Wall Display Unit (Ultra Narrow Bezel 3.5mm)", image: "/images/lcd_video_wall_2.png" },
          { name: "LS490UCM-UF", subtitle: "49\" FHD Video Wall Display Unit (Ultra Narrow Bezel 3.5mm)", image: "/images/lcd_video_wall_2.png" },
        ]
      }
    ]
  },
  {
    id: "lcd-digital-signage",
    name: "LCD Digital Signage",
    description: "Dynamic digital signage solutions for modern retail and business.",
    subcategories: [
      {
        id: "lite",
        name: "Lite Series",
        products: [
          { name: "LDH65-LAI400L", subtitle: "Lamps Plus 65 inch LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDH55-LAI400L", subtitle: "Lamps Plus 55 inch LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDH50-LAI400L", subtitle: "Lamps Plus 50 inch LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDH43-LAI400L", subtitle: "Lamps Plus 43 inch LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
        ]
      },
      {
        id: "standard",
        name: "Standard Series",
        products: [
          { name: "LDH55-SAI400TL", subtitle: "Lamps Plus 55 inch Indoor Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDH43-SAI400TL", subtitle: "Lamps Plus 43 Inch Indoor Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDH55-SAI400L", subtitle: "Lamps Plus 55 inch Indoor Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDH65-SAI400L", subtitle: "Lamps Plus 65 inch Indoor Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDH43-SAI400L", subtitle: "Lamps Plus 43 inch Indoor Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "DHI-LDH43-SWI200", subtitle: "43\" Wall-mounted Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDH32-SAI200L", subtitle: "Lamps Plus 32 inch Indoor Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDH22-SAI200L", subtitle: "Lamps Plus 21.5 inch Indoor Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDV65-SAI400TL", subtitle: "Lamps Plus 65 inch Indoor Vertical LCD Digital Signage", image: "/images/lcd_digital_signage_vertical.png" },
          { name: "LDV55-SAI400TL", subtitle: "Lamps Plus 55 inch Indoor Vertical LCD Digital Signage", image: "/images/lcd_digital_signage_vertical.png" },
          { name: "LDV43-SAI400TL", subtitle: "Lamps Plus 43 inch Indoor Vertical LCD Digital Signage", image: "/images/lcd_digital_signage_vertical.png" },
          { name: "LDV75-SAI400L", subtitle: "Lamps Plus 75 inch Vertical LCD Digital Signage", image: "/images/lcd_digital_signage_vertical.png" },
          { name: "LDV65-SAI400L", subtitle: "Lamps Plus 65 inch Indoor Vertical LCD Digital Signage", image: "/images/lcd_digital_signage_vertical.png" },
          { name: "LDV55-SAI400L", subtitle: "Lamps Plus 55 inch Indoor Vertical LCD Digital Signage", image: "/images/lcd_digital_signage_vertical.png" },
          { name: "LDV43-SAI400L", subtitle: "Lamps Plus 43 inch Indoor Vertical LCD Digital Signage", image: "/images/lcd_digital_signage_vertical.png" },
          { name: "LDV43-SAI400K", subtitle: "Lamps Plus 43 inch Vertical LCD Digital Signage", image: "/images/lcd_digital_signage_vertical.png" },
        ]
      },
      {
        id: "pro",
        name: "Pro Series",
        products: [
          { name: "LDH65-WAI200L", subtitle: "Lamps Plus 65 Inch LCD Digital Signage", image: "/images/lcd_digital_signage_hanging.png" },
          { name: "LDH55-WAI200L", subtitle: "Lamps Plus 55 Inch LCD Digital Signage", image: "/images/lcd_digital_signage_hanging.png" },
          { name: "LDH43-WAI200L", subtitle: "Lamps Plus 43 Inch LCD Digital Signage", image: "/images/lcd_digital_signage_hanging.png" },
          { name: "LDH32-WAI200L", subtitle: "Lamps Plus 32 Inch LCD Digital Signage", image: "/images/lcd_digital_signage_hanging.png" },
          { name: "LDH65-HAI400L", subtitle: "Lamps Plus 65 inch Indoor Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDH55-HAI400L", subtitle: "Lamps Plus 55 inch Indoor Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
          { name: "LDH43-HAI400L", subtitle: "Lamps Plus 43 inch Indoor Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_1.png" },
        ]
      },
      {
        id: "outdoor",
        name: "Outdoor Series",
        products: [
          { name: "LDH65-EAO400L", subtitle: "Lamps Plus 65 inch Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_outdoor_wall.png" },
          { name: "LDH55-EAO400L", subtitle: "Lamps Plus 55 inch Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_outdoor_wall.png" },
          { name: "LDH43-EAO400L", subtitle: "Lamps Plus 43 inch Wall-mounted LCD Digital Signage", image: "/images/lcd_digital_signage_outdoor_wall.png" },
          { name: "LDV65-EAO400L", subtitle: "Lamps Plus 65 inch Vertical LCD Digital Signage", image: "/images/lcd_digital_signage_outdoor_vertical.png" },
          { name: "LDV55-EAO400L", subtitle: "Lamps Plus 55 inch Vertical LCD Digital Signage", image: "/images/lcd_digital_signage_outdoor_vertical.png" },
          { name: "LDV43-EAO400L", subtitle: "Lamps Plus 43 inch Vertical LCD Digital Signage", image: "/images/lcd_digital_signage_outdoor_vertical.png" },
        ]
      },
      {
        id: "media-player",
        name: "Media Player",
        products: [
          { name: "DS04-AI400", subtitle: "Lamps Plus Media Player Box", image: "/images/lcd_digital_signage_media_player.png" },
        ]
      },
      {
        id: "others",
        name: "Others",
        products: [
          { name: "LD-AI-W", subtitle: "USB Wi-Fi dongle", image: "/images/lcd_digital_signage_others_wifi.png" },
          { name: "PVM10-SAI100", subtitle: "Lamps Plus 10.1\" Wall-mounted Digital Signage", image: "/images/lcd_digital_signage_others_10inch.png" },
        ]
      }
    ]
  },
  {
    id: "led-displays",
    name: "LED Displays",
    description: "High-brightness and fine-pitch LED displays for indoor and outdoor use.",
    subcategories: [
      {
        id: "indoor-fine-pixel",
        name: "Indoor Fine Pixel",
        products: [
          { name: "DHI-PHSIA1.2-CK", subtitle: "Lamps Plus indoor 640x480 Front Maintenance fixed screen LED_P1.2", image: "/images/prod_12.webp" },
          { name: "PHSIA4-SC", subtitle: "Lamps Plus indoor 640x480 Front Maintenance fixed screen LED_P4", image: "/images/prod_12.webp" },
          { name: "PHSIA3-SC", subtitle: "Lamps Plus indoor 640x480 Front Maintenance fixed screen LED_P3", image: "/images/prod_12.webp" },
          { name: "PHSIA2.5-SC", subtitle: "Lamps Plus indoor 640x480 Front Maintenance fixed screen LED_P2.5", image: "/images/prod_12.webp" },
          { name: "PHSIA2-SC", subtitle: "Lamps Plus indoor 640x480 Front Maintenance fixed screen LED_P2", image: "/images/prod_12.webp" },
          { name: "PHSIA1.8-SC", subtitle: "Lamps Plus indoor 640x480 Front Maintenance fixed screen LED_P1.8", image: "/images/prod_12.webp" },
          { name: "PHSIA1.5-SC", subtitle: "Lamps Plus indoor 640x480 Front Maintenance fixed screen LED_P1.5", image: "/images/prod_12.webp" },
          { name: "PHGIA3.91-SE", subtitle: "Lamps Plus Indoor Front Maintenance fixed screen LED_P3.91", image: "/images/prod_12.webp" },
          { name: "PHSIA1.5-AH", subtitle: "Flip COB Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
          { name: "PHSIA1.2-AH", subtitle: "Flip COB Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
          { name: "PHSIA0.9-AH", subtitle: "Flip COB Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
          { name: "PHSIA1.5-CH", subtitle: "Flip COB Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
          { name: "PHSIA1.2-CH", subtitle: "Flip COB Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
          { name: "PHSIA0.9-CH", subtitle: "Flip COB Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
          { name: "PHSIA1.8-SS", subtitle: "Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
          { name: "PHSIA1.5-SS", subtitle: "Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
          { name: "PHSIA1.2-SS", subtitle: "Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
          { name: "PHSIA0.9-SS", subtitle: "Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
          { name: "PHSIA1.5-LS", subtitle: "Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
          { name: "PHSIA1.2-LS", subtitle: "Indoor Fine Pixel Pitch LED", image: "/images/prod_12.webp" },
        ]
      },
      {
        id: "indoor-fixed",
        name: "Indoor Fixed",
        products: [
          { name: "PHGIA4.81-SH", subtitle: "Lamps Plus General Indoor Fixed LED", image: "/images/prod_12.webp" },
          { name: "PHGIA3.91-SH", subtitle: "Lamps Plus General Indoor Fixed LED", image: "/images/prod_12.webp" },
          { name: "PHGIA2.97-SH", subtitle: "Lamps Plus General Indoor Fixed LED", image: "/images/prod_12.webp" },
          { name: "PHGIA2.61-SH", subtitle: "Lamps Plus General Indoor Fixed LED", image: "/images/prod_12.webp" },
          { name: "PHGIA1.95-SH", subtitle: "Lamps Plus General Indoor Fixed LED", image: "/images/prod_12.webp" },
        ]
      },
      {
        id: "outdoor-fixed",
        name: "Outdoor Fixed",
        products: [
          { name: "DHI-PHGOA10-PH", subtitle: "Lamps Plus outdoor 960x960 front and rear maintenance fixed screen", image: "/images/prod_12.webp" },
          { name: "PHGOA10-PH", subtitle: "Lamps Plus General Outdoor Fixed LED", image: "/images/prod_12.webp" },
          { name: "PHGOA8-PH", subtitle: "Lamps Plus General Outdoor Fixed LED", image: "/images/prod_12.webp" },
          { name: "PHGOA6-PH", subtitle: "Lamps Plus General Outdoor Fixed LED", image: "/images/prod_12.webp" },
          { name: "PHGOA5-PH", subtitle: "Lamps Plus General Outdoor Fixed LED", image: "/images/prod_12.webp" },
          { name: "PHGOA4.81-PH", subtitle: "Lamps Plus General Outdoor Fixed LED", image: "/images/prod_12.webp" },
          { name: "PHGOA3.91-PH", subtitle: "Lamps Plus General Outdoor Fixed LED", image: "/images/prod_12.webp" },
          { name: "PHGOA2.97-PH", subtitle: "Lamps Plus General Outdoor Fixed LED", image: "/images/prod_12.webp" },
        ]
      },
      {
        id: "indoor-rental",
        name: "Indoor Rental",
        products: [
          { name: "PHRIA2.61-SH", subtitle: "Lamps Plus Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA1.95-SH", subtitle: "Lamps Plus Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA3.91-SH", subtitle: "Lamps Plus Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA2.97-SH", subtitle: "Lamps Plus Indoor Rental LED", image: "/images/prod_12.webp" },
        ]
      },
      {
        id: "outdoor-rental",
        name: "Outdoor Rental",
        products: [
          { name: "PHROA4.81-MH", subtitle: "Lamps Plus Outdoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHROA3.91-MH", subtitle: "Lamps Plus Outdoor Rental LED", image: "/images/prod_12.webp" },
        ]
      },
      {
        id: "stadium",
        name: "Stadium",
        products: [
          { name: "PHVOA10-EH", subtitle: "Lamps Plus Outdoor Stadium LED", image: "/images/prod_12.webp" },
        ]
      },
      {
        id: "commercial",
        name: "Commercial",
        products: [
          { name: "PHMIA135-AC", subtitle: "Lamps Plus Commercial All-In-One LED", image: "/images/prod_12.webp" },
        ]
      },
      {
        id: "conference-all-in-one",
        name: "Conference All-In-One",
        products: [
          { name: "PHMIA216-EH", subtitle: "Lamps Plus Indoor ALL-In-One LED", image: "/images/prod_12.webp" },
          { name: "PHMIA163-EH", subtitle: "Lamps Plus Indoor ALL-In-One LED", image: "/images/prod_12.webp" },
          { name: "PHMIA135-EH", subtitle: "Lamps Plus Indoor ALL-In-One LED", image: "/images/prod_12.webp" },
          { name: "PHMIA108-EH", subtitle: "Lamps Plus Indoor ALL-In-One LED", image: "/images/prod_12.webp" },
        ]
      },
      {
        id: "led-module",
        name: "LED Module",
        products: [
          { name: "IFS-EOA10S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
          { name: "IFS-EOA8S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
          { name: "IFS-EOA6S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
          { name: "IFS-EOA5S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
          { name: "IFS-EOA4S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
          { name: "IFS-EOA3S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
          { name: "IFS-EOA2.5S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
          { name: "IFS-EIA2.5S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
          { name: "IFS-EIA2S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
          { name: "IFS-EIA1.8S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
          { name: "IFS-EIA1.2S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
          { name: "IFS-EIA1.5S-C", subtitle: "Lamps Plus LED Module", image: "/images/prod_12.webp" },
        ]
      },
      {
        id: "rental-led-display",
        name: "Rental LED Display",
        products: [
          { name: "PHRIA1.95-RF", subtitle: "Lamps Plus Creative Flexible Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHROA3.91-REL-V2", subtitle: "Lamps Plus Ultimate Convenience Outdoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHROA2.97-REL-V2", subtitle: "Lamps Plus Ultimate Convenience Outdoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA3.91-RE-V2", subtitle: "Lamps Plus Ultimate Convenience Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA2.97-RE-V2", subtitle: "Lamps Plus Ultimate Convenience Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA2.61-RE-V2", subtitle: "Lamps Plus Ultimate Convenience Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA1.95-RE-G-V2", subtitle: "Lamps Plus Ultimate Convenience Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA3.91-RC", subtitle: "Lamps Plus General Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA2.97-RC", subtitle: "Lamps Plus General Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA2.61-RC", subtitle: "Lamps Plus General Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA1.95-RC", subtitle: "Lamps Plus General Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHROA4.81-REL", subtitle: "Lamps Plus General Outdoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHROA3.91-REL", subtitle: "Lamps Plus General Outdoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA3.91-RE", subtitle: "Lamps Plus General Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA2.97-RE", subtitle: "Lamps Plus General Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA2.61-RE", subtitle: "Lamps Plus General Indoor Rental LED", image: "/images/prod_12.webp" },
          { name: "PHRIA1.95-RE", subtitle: "Lamps Plus General Indoor Rental LED", image: "/images/prod_12.webp" },
        ]
      }
    ]
  },
  {
    id: "intelligent-energy",
    name: "Intelligent Energy",
    description: "Smart and efficient energy solutions for modern infrastructure.",
    subcategories: [
      {
        id: "smart-power-saving",
        name: "Smart Power Saving",
        products: []
      },
      {
        id: "smart-lighting-pole",
        name: "Smart Lighting Pole",
        products: []
      },
      {
        id: "educational-illumination",
        name: "Educational Illumination",
        products: []
      }
    ]
  }
]

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" })
  const [activeTab, setActiveTab] = useState(categories[0].id)
  const [activeSubTab, setActiveSubTab] = useState(categories[0].subcategories[0].id)
  const [currentPage, setCurrentPage] = useState(1)

  const activeCategory = categories.find(c => c.id === activeTab) || categories[0]
  const activeSubcategory = activeCategory.subcategories.find(s => s.id === activeSubTab) || activeCategory.subcategories[0]

  // When active category changes, reset active sub tab to its first subcategory and reset page
  useEffect(() => {
    const newActiveCategory = categories.find(c => c.id === activeTab) || categories[0]
    setActiveSubTab(newActiveCategory.subcategories[0].id)
    setCurrentPage(1)
  }, [activeTab])

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(activeSubcategory.products.length / itemsPerPage));
  const paginatedProducts = activeSubcategory.products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="bg-[#050505] relative overflow-hidden min-h-[100svh] flex flex-col justify-center py-12 lg:py-0"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E60000] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[var(--container-max)] mx-auto px-[var(--section-pad-x)] relative z-10 w-full">
        
        {/* Massive Typography Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 lg:mb-16"
        >
          <p className="font-sans text-[0.65rem] font-bold tracking-[0.25em] text-[#E60000] uppercase mb-4">
            Our Technologies
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium text-white leading-[1.05] tracking-tight max-w-4xl">
            Engineered to <span className="text-white/40 italic">captivate.</span>
          </h2>
        </motion.div>

        {/* Interactive Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left: Category Tabs */}
          <div className="lg:w-[40%] flex flex-col w-full">
            {categories.map((category, idx) => {
              const isActive = activeTab === category.id
              return (
                <div key={category.id} className="border-t border-white/10 last:border-b">
                  <button
                    onClick={() => setActiveTab(category.id)}
                    className="w-full text-left py-5 lg:py-6 group"
                  >
                    <div className="flex items-start gap-4 lg:gap-6">
                      <span className={`
                        font-sans text-xs font-bold tracking-widest mt-1.5 transition-colors duration-500
                        ${isActive ? 'text-[#E60000]' : 'text-white/20 group-hover:text-white/50'}
                      `}>
                        0{idx + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className={`
                          font-serif text-[clamp(1.5rem,2.5vw,2.2rem)] font-light leading-tight transition-all duration-500
                          ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}
                        `}>
                          {category.name}
                        </h3>
                        
                        {/* Expandable Content */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 pb-1">
                                <p className="font-sans text-[0.9rem] text-white/60 leading-relaxed max-w-md">
                                  {category.description}
                                </p>
                                <div className="mt-5">
                                  <a 
                                    href="#contact" 
                                    className="inline-flex items-center gap-2 font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white hover:text-[#E60000] transition-colors"
                                  >
                                    <span className="w-6 h-[1px] bg-current" />
                                    Explore Specs
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>

          {/* Right: Subcategory Tabs & Gallery */}
          <div className="lg:w-[60%] w-full flex flex-col gap-6 mt-4 lg:mt-0">
            
            {/* Subcategory Navigation */}
            {activeCategory.subcategories.length > 1 && (
              <div className="flex flex-wrap gap-2 lg:gap-4 mb-2">
                {activeCategory.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setActiveSubTab(sub.id)
                      setCurrentPage(1)
                    }}
                    className={`
                      px-4 py-2 rounded-full font-sans text-[0.8rem] tracking-wide transition-all duration-300 border font-medium
                      ${activeSubTab === sub.id 
                        ? 'bg-[#E60000] text-white border-[#E60000] shadow-[0_0_15px_rgba(230,0,0,0.3)]' 
                        : 'bg-[#111111] text-white/60 border-white/10 hover:border-white/30 hover:text-white'}
                    `}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}

            {/* Gallery */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSubTab}
                initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 gap-4 lg:gap-6"
              >
                {paginatedProducts.map((prod, idx) => (
                  <div 
                    key={`${prod.name}-${idx}`} 
                    className="group flex flex-col gap-3"
                  >
                    <div className="relative aspect-video rounded-[16px] lg:rounded-[20px] overflow-hidden bg-[#111111] border border-white/5 shadow-2xl">
                      <Image 
                        src={prod.image}
                        alt={prod.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                        width={600} 
                        height={337}
                        loading={idx < 2 ? "eager" : "lazy"}
                      />
                      {/* Elegant dark gradient overlay to frame the image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/10 to-transparent opacity-80" />
                    </div>
                    
                    <div className="flex items-start justify-between px-1">
                       <div className="flex-1 pr-2">
                         <h4 className="font-sans text-[0.95rem] font-medium text-white tracking-wide">
                           {prod.name}
                         </h4>
                         {/* @ts-ignore */}
                         {prod.subtitle && (
                           <p className="font-sans text-[0.65rem] text-white/50 mt-1.5 uppercase tracking-widest leading-snug">
                             {/* @ts-ignore */}
                             {prod.subtitle}
                           </p>
                         )}
                       </div>
                       <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[0.16,1,0.3,1] mt-0.5">
                         <ArrowRight className="w-3 h-3 text-white" />
                       </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-[#E60000] text-white' 
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  )
}
