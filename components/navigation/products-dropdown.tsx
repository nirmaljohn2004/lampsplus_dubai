import { ArrowRight } from "lucide-react"

const productCategories = [
  {
    title: "Control & LCD",
    products: [
      { name: "Matrix Controllers", href: "#products" },
      { name: "Keyboards", href: "#products" },
      { name: "Decoders", href: "#products" },
      { name: "LCD Video Walls", href: "#products" },
      { name: "LCD Digital Signage", href: "#products" },
    ],
  },
  {
    title: "LED Indoor",
    products: [
      { name: "Indoor Fine Pixel", href: "#products" },
      { name: "Indoor Fixed", href: "#products" },
      { name: "Indoor Rental", href: "#products" },
      { name: "Conference All-In-One", href: "#products" },
      { name: "Commercial LED", href: "#products" },
    ],
  },
  {
    title: "LED Outdoor & Modules",
    products: [
      { name: "Outdoor Fixed", href: "#products" },
      { name: "Outdoor Rental", href: "#products" },
      { name: "Stadium LED", href: "#products" },
      { name: "Rental LED Display", href: "#products" },
      { name: "LED Modules", href: "#products" },
    ],
  },
  {
    title: "Intelligent Energy",
    products: [
      { name: "Smart Power Saving", href: "#products" },
      { name: "Smart Lighting Pole", href: "#products" },
      { name: "Educational Illumination", href: "#products" },
    ],
  },
]

export function ProductsDropdown() {
  return (
    <div className="px-[var(--section-pad-x)] py-8">
      <div className="max-w-[var(--container-max)] mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {productCategories.map((category) => (
            <div key={category.title}>
              <h3 className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2.5">
                {category.products.map((product) => (
                  <li key={product.name}>
                    <a
                      href={product.href}
                      className="font-sans text-[0.875rem] text-[var(--text-body)] hover:text-[var(--accent)] transition-colors"
                    >
                      {product.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Featured card */}
        <div className="mt-8 p-5 bg-[var(--accent-light)] rounded-[var(--radius-md)] flex items-center justify-between">
          <p className="font-sans text-[0.9rem] text-[var(--text-body)]">
            Need help choosing? Our experts will recommend the right screen for your space.
          </p>
          <a
            href="#contact"
            className="flex items-center gap-2 font-sans text-[0.875rem] font-medium text-[var(--accent)] hover:underline whitespace-nowrap"
          >
            Talk to an Expert
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Featured products */}
        <div className="mt-8 grid grid-cols-2 gap-8">
          <a href="#products" className="group flex flex-col gap-3">
            <div className="relative aspect-[21/9] bg-[#1A1A1A] rounded-[var(--radius-md)] overflow-hidden">
              <img 
                src="/images/matrix_1.png" 
                alt="DSCON2100-0410H" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div>
              <h4 className="font-sans text-[1rem] font-semibold text-[var(--text-heading)]">DSCON2100-0410H</h4>
              <p className="font-sans text-[0.75rem] text-[var(--accent)] uppercase tracking-wider mt-1">LAMPS PLUS 1.5U EMBEDDED MULTI-SCREEN CONTROLLER</p>
            </div>
          </a>
          <a href="#products" className="group flex flex-col gap-3">
            <div className="relative aspect-[21/9] bg-[#1A1A1A] rounded-[var(--radius-md)] overflow-hidden">
              <img 
                src="/images/matrix_3.png" 
                alt="DSCON3000-7U" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div>
              <h4 className="font-sans text-[1rem] font-semibold text-[var(--text-heading)]">DSCON3000-7U</h4>
              <p className="font-sans text-[0.75rem] text-[var(--accent)] uppercase tracking-wider mt-1">MULTI-SCREEN CONTROLLER</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
