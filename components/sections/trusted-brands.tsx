import Image from 'next/image';

const logos = [
  "Screenshot 2026-06-15 130527.png", "Screenshot 2026-06-15 130536.png", "Screenshot 2026-06-15 130544.png",
  "Screenshot 2026-06-15 130553.png", "Screenshot 2026-06-15 130558.png", "Screenshot 2026-06-15 130607.png",
  "Screenshot 2026-06-15 130620.png", "Screenshot 2026-06-15 130625.png", "Screenshot 2026-06-15 130633.png",
  "Screenshot 2026-06-15 130640.png", "Screenshot 2026-06-15 130646.png", "Screenshot 2026-06-15 130652.png",
  "Screenshot 2026-06-15 130703.png", "Screenshot 2026-06-15 130709.png", "Screenshot 2026-06-15 130719.png",
  "Screenshot 2026-06-15 130733.png", "Screenshot 2026-06-15 130742.png", "Screenshot 2026-06-15 130752.png",
  "Screenshot 2026-06-15 130805.png", "Screenshot 2026-06-15 130811.png", "Screenshot 2026-06-15 130820.png",
  "Screenshot 2026-06-15 130827.png", "Screenshot 2026-06-15 130837.png", "Screenshot 2026-06-15 130842.png",
  "Screenshot 2026-06-15 130850.png", "Screenshot 2026-06-15 130858.png", "Screenshot 2026-06-15 130906.png",
  "Screenshot 2026-06-15 130913.png", "Screenshot 2026-06-15 130928.png", "Screenshot 2026-06-15 130935.png",
  "Screenshot 2026-06-15 130955.png", "Screenshot 2026-06-15 131001.png", "Screenshot 2026-06-15 131006.png",
  "Screenshot 2026-06-15 131015.png", "Screenshot 2026-06-15 131026.png", "Screenshot 2026-06-15 131034.png",
  "Screenshot 2026-06-15 131039.png", "Screenshot 2026-06-15 131044.png", "Screenshot 2026-06-15 131049.png",
  "Screenshot 2026-06-15 131054.png", "Screenshot 2026-06-15 131102.png", "Screenshot 2026-06-15 131112.png",
  "Screenshot 2026-06-15 131117.png", "Screenshot 2026-06-15 131122.png", "Screenshot 2026-06-15 131127.png",
  "Screenshot 2026-06-15 131130.png", "Screenshot 2026-06-15 131134.png", "Screenshot 2026-06-15 131141.png",
  "Screenshot 2026-06-15 131151.png", "Screenshot 2026-06-15 131156.png", "Screenshot 2026-06-15 131202.png",
  "Screenshot 2026-06-15 131212.png", "Screenshot 2026-06-15 131220.png", "Screenshot 2026-06-15 131232.png",
  "Screenshot 2026-06-15 131242.png", "Screenshot 2026-06-15 131248.png", "Screenshot 2026-06-15 131255.png",
  "Screenshot 2026-06-15 131300.png", "Screenshot 2026-06-15 131306.png", "Screenshot 2026-06-15 131310.png",
  "Screenshot 2026-06-15 131320.png", "Screenshot 2026-06-15 131331.png", "Screenshot 2026-06-15 131338.png",
  "Screenshot 2026-06-15 131346.png", "Screenshot 2026-06-15 131403.png", "Screenshot 2026-06-15 131408.png",
  "Screenshot 2026-06-15 131413.png", "Screenshot 2026-06-15 131420.png", "Screenshot 2026-06-15 131427.png",
  "Screenshot 2026-06-15 131437.png", "Screenshot 2026-06-15 131443.png", "Screenshot 2026-06-15 131452.png"
];

export function TrustedBrands() {
  const row1 = logos.slice(0, 18);
  const row2 = logos.slice(18, 36);
  const row3 = logos.slice(36, 54);
  const row4 = logos.slice(54, 72);

  const rows = [
    { items: row1, duration: 40, direction: "left" },
    { items: row2, duration: 45, direction: "right" },
    { items: row3, duration: 35, direction: "left" },
    { items: row4, duration: 50, direction: "right" }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden" aria-label="Trusted Brands">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right linear infinite;
        }
      `}</style>
      
      <div className="max-w-[100vw] mx-auto">
        <h2 className="text-center text-sm md:text-base font-bold tracking-[0.2em] text-gray-400 uppercase mb-16 font-sans px-6">
          Trusted by UAE's Leading Brands
        </h2>
        
        <div className="flex flex-col gap-10">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative w-full flex overflow-hidden group">
              <div 
                className={`flex w-max shrink-0 gap-10 md:gap-16 pr-10 md:pr-16 group-hover:[animation-play-state:paused] ${row.direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
                style={{ animationDuration: `${row.duration}s` }}
              >
                {[...row.items, ...row.items].map((logo, idx) => (
                  <div 
                    key={idx} 
                    className="relative w-28 h-16 md:w-36 md:h-20 flex-shrink-0 flex items-center justify-center transition-transform hover:scale-105 duration-300"
                  >
                    <Image 
                      src={`/images/trustedbrands/${logo}`}
                      alt={`Trusted Brand ${rowIndex}-${idx}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 33vw, 20vw"
                      quality={75}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
