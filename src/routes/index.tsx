import { createFileRoute } from "@tanstack/react-router";
import heroPizza from "@/assets/pizza-making.jpg";
import logo from "@/assets/bradley-pizza-logo.png";
import { Phone, MapPin, Clock, Mail, Pizza, Navigation } from "lucide-react";

const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=311+Bradley+Ave+Staten+Island+NY+10314";
const MAP_EMBED_URL = "https://www.google.com/maps?q=311+Bradley+Ave+Staten+Island+NY+10314&output=embed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bradley Pizza — Authentic NY Pizza in Staten Island" },
      { name: "description", content: "Bradley Pizza on Staten Island serves classic New York slices, specialty pies, wraps, pasta and more. Order by phone or visit us at 311 Bradley Ave." },
      { property: "og:title", content: "Bradley Pizza — Staten Island" },
      { property: "og:description", content: "Classic NY slices, specialty pies, wraps, pastas & more in Staten Island." },
      { property: "og:image", content: heroPizza },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const HOURS = [
  ["Monday", "Closed"],
  ["Tuesday", "11:00 AM – 9:00 PM"],
  ["Wednesday", "11:00 AM – 9:00 PM"],
  ["Thursday", "11:00 AM – 9:00 PM"],
  ["Friday", "11:00 AM – 10:00 PM"],
  ["Saturday", "11:00 AM – 10:00 PM"],
  ["Sunday", "11:00 AM – 9:00 PM"],
];

const MENU = {
  Pizza: [
    ["Large Pie Special", "$12.99"],
    ["Cheesesteak Pie", "$16.99 – $30.00"],
    ["Chicken Francese Pie", "$16.00 – $30.00"],
    ["Chicken Marsala Pie", "$16.00 – $30.00"],
    ["Meatlover Pie", "$16.00 – $30.00"],
    ["Everything Pie", "$15.00 – $30.00"],
    ["Clam Red or White", "$14.00 – $28.00"],
    ["Chicken & Broccoli Alfredo", "$16.00 – $28.00"],
  ],
  Appetizers: [
    ["Garlic Bread", "$6.99"],
    ["Garlic Bread w/ Cheese", "$7.99"],
    ["Garlic Knots (6)", "$5.00"],
    ["Mozzarella Sticks (6)", "$9.99"],
    ["Fried Calamari", "$14.99"],
    ["Chicken Fingers (6)", "$11.99"],
    ["Chicken Fingers w/ Fries", "$13.99"],
    ["Wings (8)", "$13.99"],
    ["French Fries", "$6.99"],
    ["Waffle Fries", "$7.99"],
  ],
  Wraps: [
    ["Grilled Chicken Wrap", "$16.99"],
    ["Buffalo Wrap", "$16.99"],
    ["Crispy Chicken Wrap", "$16.99"],
    ["Philly Steak Wrap", "$16.99"],
    ["Caesar Wrap", "$16.99"],
    ["Veggie Wrap", "$16.99"],
    ["Vodka Wrap", "$16.99"],
    ["Delafield Wrap", "$16.99"],
  ],
  Salads: [
    ["Tossed Salad", "$11.99"],
    ["Caesar Salad", "$11.99"],
    ["Tossed w/ Grilled Chicken", "$16.99"],
    ["Caesar w/ Grilled Chicken", "$16.99"],
    ["Antipasto Salad", "$16.99"],
    ["Chef Salad", "$16.99"],
    ["Strawberry & Walnut", "$13.99"],
    ["Caesar w/ Shrimp", "$17.99"],
  ],
  "Lunch Specials": [
    ["Chicken Parmigiana Hero", "$12.99"],
    ["Eggplant Parm Hero", "$12.99"],
    ["Meatball Parm Hero", "$12.99"],
    ["Sausage & Peppers Hero", "$12.99"],
    ["Spaghetti & Meatballs", "$12.99"],
    ["Penne Vodka", "$12.99"],
    ["Baked Ziti", "$12.99"],
    ["Lasagna", "$12.99"],
  ],
  "Dinner Specials": [
    ["Chicken Parm w/ Ziti", "$16.99"],
    ["Spaghetti & Meatballs", "$15.99"],
    ["Baby Shrimp w/ Linguine", "$16.99"],
    ["Grilled Chicken w/ Broccoli & Rigatoni", "$14.99"],
    ["Stuffed Shells (6)", "$13.99"],
    ["Penne Vodka", "$13.99"],
    ["Eggplant Parm w/ Penne", "$12.95"],
  ],
  Seafood: [
    ["Super Delafield Platter", "$23.99"],
    ["Shrimp Parmigiana", "$22.99"],
    ["Linguini w/ Clam Sauce", "$19.99"],
    ["Calamari Linguini", "$19.99"],
  ],
  Desserts: [
    ["Zeppoles (6)", "$5.00"],
    ["Zeppoles w/ Cinnamon", "$5.00"],
    ["Chocolate Mousse Cake", "$7.00"],
  ],
};

const SPECIALS = [
  { title: "Family Special #1", price: "$49.99", desc: "Feeds the whole crew — a Bradley favorite." },
  { title: "Family Special #2", price: "$39.99", desc: "Big value, big flavor for family night." },
  { title: "Crazy 8's", price: "$35.99", desc: "Our signature combo deal." },
  { title: "Student Special", price: "$7.00", desc: "2 regular slices + a can of soda." },
  { title: "Large Pie Special", price: "$12.99", desc: "Classic NY large cheese pie." },
];

function Index() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 font-display text-xl font-bold text-primary">
            <img src={logo} alt="Bradley Pizza logo" width={40} height={40} className="h-10 w-10 rounded-md object-contain bg-[#0d0d0d] p-1" />
            <span className="hidden sm:inline">Bradley Pizza</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="#menu" className="hover:text-primary transition-colors">Menu</a>
            <a href="#specials" className="hover:text-primary transition-colors">Specials</a>
            <a href="#hours" className="hover:text-primary transition-colors">Hours</a>
            <a href="#visit" className="hover:text-primary transition-colors">Visit</a>
          </nav>
          <a
            href="tel:+17186821703"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            <Phone className="h-4 w-4" /> <span className="hidden sm:inline">(718) 682-1703</span><span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-semibold tracking-widest uppercase">Staten Island • Since the slice was hot</span>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05]">
              Hot slices.<br />
              <span className="text-primary">Real New York.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Bradley Pizza serves classic NY pies, specialty slices, hot heroes, fresh salads
              and Italian dinners — right on Bradley Avenue.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+17186821703" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold shadow-[var(--shadow-warm)] hover:translate-y-[-1px] transition">
                <Phone className="h-4 w-4" /> Call to Order
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Today ({today}): <span className="font-medium text-foreground">{HOURS.find(h => h[0] === today)?.[1]}</span>
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-[var(--gradient-warm)] rounded-full blur-3xl opacity-20" aria-hidden />
            <img
              src={heroPizza}
              alt="Fresh NY-style pizza from Bradley Pizza"
              width={1536}
              height={1536}
              className="relative rounded-3xl shadow-[var(--shadow-warm)] w-full aspect-square object-cover"
            />
          </div>
        </div>
      </section>

      {/* Specials */}
      <section id="specials" className="bg-secondary/50 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-accent-foreground/80 text-sm font-semibold tracking-widest uppercase">Deals</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">Crowd Favorites</h2>
            </div>
            <p className="text-muted-foreground max-w-sm">Hand-picked specials our regulars come back for.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPECIALS.map((s) => (
              <article key={s.title} className="bg-card rounded-2xl p-6 shadow-[var(--shadow-card)] border border-border hover:border-primary/40 transition">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-bold">{s.title}</h3>
                  <span className="text-primary font-bold text-lg whitespace-nowrap">{s.price}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-accent-foreground/80 text-sm font-semibold tracking-widest uppercase">Menu</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">The full board</h2>
          <p className="mt-4 text-muted-foreground">A taste of everything we make — from classic slices to Italian dinners.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(MENU).map(([cat, items]) => (
            <div key={cat} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-card)]">
              <h3 className="font-display text-2xl font-bold text-primary mb-5 pb-3 border-b border-border">{cat}</h3>
              <ul className="space-y-3">
                {items.map(([name, price]) => (
                  <li key={name} className="flex items-baseline gap-3 text-sm">
                    <span className="flex-1">{name}</span>
                    <span className="flex-1 border-b border-dotted border-border/70" aria-hidden />
                    <span className="font-semibold text-foreground whitespace-nowrap">{price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Menu items and prices subject to change. Call us for the full daily menu.
        </p>
      </section>

      {/* Hours + Visit */}
      <section id="hours" className="bg-[var(--brand-charcoal)] text-[oklch(0.96_0.02_80)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 grid md:grid-cols-2 gap-12">
          <div id="visit">
            <p className="text-[oklch(0.75_0.13_75)] text-sm font-semibold tracking-widest uppercase">Visit</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">Come see us</h2>
            <p className="mt-4 text-[oklch(0.85_0.02_70)] max-w-md">
              We're on Bradley Avenue in Staten Island. Stop in for a slice or call ahead — we'll have it ready.
            </p>
            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <MapPin className="h-5 w-5 mt-1 text-[oklch(0.75_0.13_75)] shrink-0" />
                <div>
                  <p className="font-semibold">Address</p>
                  <a
                    href="https://maps.google.com/?q=311+Bradley+Ave+Staten+Island+NY+10314"
                    target="_blank" rel="noopener noreferrer"
                    className="text-[oklch(0.85_0.02_70)] hover:text-white"
                  >
                    311 Bradley Ave<br />Staten Island, NY 10314
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="h-5 w-5 mt-1 text-[oklch(0.75_0.13_75)] shrink-0" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:+17186821703" className="text-[oklch(0.85_0.02_70)] hover:text-white">(718) 682-1703</a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="h-5 w-5 mt-1 text-[oklch(0.75_0.13_75)] shrink-0" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:delafieldpizza731@gmail.com" className="text-[oklch(0.85_0.02_70)] hover:text-white break-all">delafieldpizza731@gmail.com</a>
                </div>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+17186821703" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold">
                <Phone className="h-4 w-4" /> Call to Order
              </a>
              <a href="https://maps.google.com/?q=311+Bradley+Ave+Staten+Island+NY+10314" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/10">
                <MapPin className="h-4 w-4" /> Get Directions
              </a>
            </div>
          </div>

          <div>
            <p className="text-[oklch(0.75_0.13_75)] text-sm font-semibold tracking-widest uppercase">Hours</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 flex items-center gap-3">
              <Clock className="h-8 w-8 text-[oklch(0.75_0.13_75)]" /> Open daily
            </h2>
            <ul className="mt-8 rounded-2xl border border-white/10 overflow-hidden">
              {HOURS.map(([day, time]) => {
                const isToday = day === today;
                return (
                  <li
                    key={day}
                    className={`flex justify-between px-5 py-3.5 text-sm border-b border-white/10 last:border-0 ${
                      isToday ? "bg-primary/20 font-semibold" : ""
                    }`}
                  >
                    <span>{day}{isToday && <span className="ml-2 text-[oklch(0.75_0.13_75)] text-xs">• Today</span>}</span>
                    <span className={time === "Closed" ? "text-[oklch(0.85_0.02_70)]" : ""}>{time}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <Pizza className="h-5 w-5 text-primary" /> Bradley Pizza
          </div>
          <p>© {new Date().getFullYear()} Bradley Pizza • Staten Island, NY</p>
        </div>
      </footer>
    </div>
  );
}
