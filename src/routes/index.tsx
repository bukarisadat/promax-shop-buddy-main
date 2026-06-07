import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Apple, MapPin, Phone, ShoppingBag, Shield, Truck, CheckCircle2, Star, Send, RotateCw, X, Instagram, Facebook, MessageCircle, MessagesSquare, Music4 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import heroPhone from "@/assets/hero-iphone.jpg";

import p17pmF from "@/assets/iphones/17promax-front.jpg";
import p17pmB from "@/assets/iphones/17promax-back.jpg";
import p17F from "@/assets/iphones/17-front.jpg";
import p17B from "@/assets/iphones/17-back.jpg";
import p16pmF from "@/assets/iphones/16promax-front.jpg";
import p16pmB from "@/assets/iphones/16promax-back.jpg";
import p16F from "@/assets/iphones/16-front.jpg";
import p16B from "@/assets/iphones/16-back.jpg";
import p15pmF from "@/assets/iphones/15promax-front.jpg";
import p15pmB from "@/assets/iphones/15promax-back.jpg";
import p15F from "@/assets/iphones/15-front.jpg";
import p15B from "@/assets/iphones/15-back.jpg";
import p14pmF from "@/assets/iphones/14promax-front.jpg";
import p14pmB from "@/assets/iphones/14promax-back.jpg";
import p13F from "@/assets/iphones/13-front.jpg";
import p13B from "@/assets/iphones/13-back.jpg";
import p12F from "@/assets/iphones/12-front.jpg";
import p12B from "@/assets/iphones/12-back.jpg";
import p11F from "@/assets/iphones/11-front.jpg";
import p11B from "@/assets/iphones/11-back.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Big Joe Kumasi — Certified iPhone Dealer in Kumasi" },
      { name: "description", content: "Shop authentic iPhones in Kumasi. Adum location. Order online, pay via MoMo, fast delivery across Ghana." },
      { property: "og:title", content: "Big Joe Kumasi — Certified iPhone Dealer" },
      { property: "og:description", content: "Authentic iPhones · Adum, Kumasi · MoMo payments · Nationwide delivery" },
    ],
  }),
  component: Home,
});

type Product = {
  id: string;
  model: string;
  storage: string;
  price: number;
  badge?: string;
  color: string;
  front: string;
  back: string;
};

const PRODUCTS: Product[] = [
  { id: "17pm-512", model: "iPhone 17 Pro Max", storage: "512GB", price: 22500, badge: "New", color: "Natural Titanium", front: p17pmF, back: p17pmB },
  { id: "17pm-256", model: "iPhone 17 Pro Max", storage: "256GB", price: 19500, badge: "Hot", color: "Natural Titanium", front: p17pmF, back: p17pmB },
  { id: "17-256",   model: "iPhone 17",         storage: "256GB", price: 14800, color: "Teal", front: p17F, back: p17B },
  { id: "17-128",   model: "iPhone 17",         storage: "128GB", price: 12900, color: "Teal", front: p17F, back: p17B },
  { id: "16pm-256", model: "iPhone 16 Pro Max", storage: "256GB", price: 18200, badge: "Top", color: "Desert Titanium", front: p16pmF, back: p16pmB },
  { id: "16pm-512", model: "iPhone 16 Pro Max", storage: "512GB", price: 21000, color: "Desert Titanium", front: p16pmF, back: p16pmB },
  { id: "16-128",   model: "iPhone 16",         storage: "128GB", price: 11500, color: "Ultramarine", front: p16F, back: p16B },
  { id: "16-256",   model: "iPhone 16",         storage: "256GB", price: 12900, color: "Ultramarine", front: p16F, back: p16B },
  { id: "15pm-256", model: "iPhone 15 Pro Max", storage: "256GB", price: 16500, color: "Natural Titanium", front: p15pmF, back: p15pmB },
  { id: "15pm-512", model: "iPhone 15 Pro Max", storage: "512GB", price: 19200, color: "Natural Titanium", front: p15pmF, back: p15pmB },
  { id: "15-128",   model: "iPhone 15",         storage: "128GB", price: 10500, color: "Pink", front: p15F, back: p15B },
  { id: "15-256",   model: "iPhone 15",         storage: "256GB", price: 11800, color: "Pink", front: p15F, back: p15B },
  { id: "14pm-256", model: "iPhone 14 Pro Max", storage: "256GB", price: 12800, badge: "Deal", color: "Deep Purple", front: p14pmF, back: p14pmB },
  { id: "14pm-128", model: "iPhone 14 Pro Max", storage: "128GB", price: 11200, color: "Deep Purple", front: p14pmF, back: p14pmB },
  { id: "13-128",   model: "iPhone 13",         storage: "128GB", price: 7200,  color: "Midnight", front: p13F, back: p13B },
  { id: "13-256",   model: "iPhone 13",         storage: "256GB", price: 8400,  color: "Midnight", front: p13F, back: p13B },
  { id: "12-64",    model: "iPhone 12",         storage: "64GB",  price: 5400,  color: "Black", front: p12F, back: p12B },
  { id: "12-128",   model: "iPhone 12",         storage: "128GB", price: 6200,  color: "Black", front: p12F, back: p12B },
  { id: "11-64",    model: "iPhone 11",         storage: "64GB",  price: 3800,  badge: "Budget", color: "White", front: p11F, back: p11B },
  { id: "11-128",   model: "iPhone 11",         storage: "128GB", price: 4500,  color: "White", front: p11F, back: p11B },
];

const WHATSAPP_NUMBER = "233241659435";
const MOMO_NUMBER = "0241659435";

function PhoneCard({ p, onOrder }: { p: Product; onOrder: (p: Product) => void }) {
  return (
    <div className="group relative">
      {p.badge && (
        <span className="absolute -right-1 -top-1 z-20 rounded-full gradient-brand px-2.5 py-0.5 text-[10px] font-bold uppercase text-brand-foreground shadow-glow">
          {p.badge}
        </span>
      )}
      <button
        type="button"
        onClick={() => onOrder(p)}
        aria-label={`Order ${p.model}`}
        className="relative block aspect-square w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary to-muted shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
      >
        <img
          src={p.back}
          alt={`${p.model} back`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-4"
        />
        <span className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-foreground/80 px-2.5 py-1 text-[10px] font-medium text-background backdrop-blur">
          <RotateCw className="h-3 w-3" /> Back side
        </span>
      </button>
      <div className="mt-3 px-1">
        <p className="text-xs text-muted-foreground">{p.color} · {p.storage}</p>
        <h3 className="font-semibold leading-tight">{p.model}</h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-lg font-bold">GHS {p.price.toLocaleString()}</p>
          <Button size="sm" onClick={() => onOrder(p)} className="gradient-brand text-brand-foreground border-0 hover:opacity-90">
            <ShoppingBag className="mr-1 h-3.5 w-3.5" /> Order
          </Button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Kumasi",
    payment: "MoMo",
    notes: "",
  });

  const total = useMemo(() => (selected ? selected.price : 0), [selected]);

  const openOrder = (p: Product) => {
    setSelected(p);
    setOrderOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) {
      toast.error("Please pick an iPhone first");
      return;
    }
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill name, phone and address");
      return;
    }
    const msg =
`*NEW ORDER — Big Joe Kumasi*

*Product:* ${selected.model} ${selected.storage} (${selected.color})
*Price:* GHS ${selected.price.toLocaleString()}

*Customer:* ${form.name}
*Phone:* ${form.phone}
*Address:* ${form.address}, ${form.city}
*Payment:* ${form.payment}
${form.payment === "MoMo" ? `*MoMo to:* ${MOMO_NUMBER} (Big Joe)\n` : ""}*Notes:* ${form.notes || "—"}

Please confirm availability and delivery. Thank you!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    toast.success("Order sent to Big Joe on WhatsApp");
    setOrderOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-brand-foreground">
              <Apple className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold">BIG JOE KUMASI</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Certified iPhone Dealer</p>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#shop" className="text-muted-foreground hover:text-foreground">Shop</a>
            <a href="#location" className="text-muted-foreground hover:text-foreground">Location</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground">Contact</a>
          </nav>
          <Button asChild size="sm" className="gradient-brand text-brand-foreground border-0 hover:opacity-90">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener">
              <MessageCircle className="mr-1.5 h-4 w-4" /> Chat
            </a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              Live in Adum, Kumasi · 136K+ followers
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
              Authentic <span className="bg-gradient-to-r from-brand to-orange-400 bg-clip-text text-transparent">iPhones</span><br />
              delivered nationwide.
            </h1>
            <p className="mt-5 max-w-lg text-base text-white/70 md:text-lg">
              From the iPhone 6s to the iPhone 16, tap any phone to see the back side, then order directly. Pay safely via Mobile Money.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild className="gradient-brand text-brand-foreground border-0 shadow-glow hover:opacity-95">
                <a href="#shop"><ShoppingBag className="mr-2 h-4 w-4" /> Shop iPhones</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                <a href="#location"><MapPin className="mr-2 h-4 w-4" /> Find the shop</a>
              </Button>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 text-sm">
              {[
                { k: "136K+", v: "Followers" },
                { k: "1.9M", v: "Likes" },
                { k: "5★", v: "Trusted" },
              ].map((s) => (
                <div key={s.v}>
                  <p className="text-2xl font-bold">{s.k}</p>
                  <p className="text-white/60">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-tr from-brand/30 to-transparent blur-3xl" />
            <img
              src={heroPhone}
              alt="iPhone 17 Pro Max"
              width={1024}
              height={1024}
              className="mx-auto max-w-md rotate-[8deg] drop-shadow-2xl md:max-w-lg"
            />
          </div>
        </div>

        <div className="border-y border-white/10 bg-black/20">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 text-sm md:grid-cols-4">
            {[
              { I: Shield, t: "100% Authentic" },
              { I: Truck, t: "Nationwide Delivery" },
              { I: CheckCircle2, t: "Installment Plan" },
              { I: Star, t: "5★ Trusted Seller" },
            ].map(({ I, t }) => (
              <div key={t} className="flex items-center gap-2 text-white/80">
                <I className="h-4 w-4 text-brand" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Catalog</p>
            <h2 className="mt-2 text-4xl font-bold md:text-5xl">Pick your iPhone</h2>
            <p className="mt-2 text-sm text-muted-foreground">Each phone card shows the back side. Hit <span className="font-semibold text-foreground">Order</span> to send your details straight to Big Joe.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <PhoneCard key={p.id} p={p} onOrder={openOrder} />
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Visit Us</p>
            <h2 className="mt-2 text-4xl font-bold md:text-5xl">Find the shop in Adum, Kumasi</h2>
            <p className="mt-4 text-muted-foreground">
              Come through to our shop in the heart of Kumasi. Big Joe Multimedia — your trusted spot for genuine Apple products.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-brand" />
                <div>
                  <p className="font-semibold">Adum, Kumasi</p>
                  <p className="text-sm text-muted-foreground">Ashanti Region, Ghana</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-brand" />
                <div>
                  <p className="font-semibold">Call us</p>
                  <p className="text-sm text-muted-foreground">Big Joe: 0241659435 · Agyeiwaa: 0555940555 · Mary: 0592498964</p>
                </div>
              </li>
            </ul>
            <Button asChild size="lg" className="mt-6 gradient-brand text-brand-foreground border-0">
              <a href="https://www.google.com/maps/dir/?api=1&destination=Adum,Kumasi,Ghana" target="_blank" rel="noopener">
                <MapPin className="mr-2 h-4 w-4" /> Get directions
              </a>
            </Button>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-card">
            <iframe
              title="Big Joe Kumasi location"
              src="https://www.google.com/maps?q=Adum,Kumasi,Ghana&output=embed"
              className="h-[450px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="gradient-hero text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand">
                <Apple className="h-5 w-5" />
              </div>
              <p className="font-bold">BIG JOE KUMASI</p>
            </div>
            <p className="mt-4 text-sm text-white/60">Certified iPhone dealer · Adum, Kumasi · Ghana's trusted plug for authentic Apple products.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Big Joe — 0241659435 (MoMo)</li>
              <li>Agyeiwaa — 0555940555</li>
              <li>Mary — 0592498964</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">Follow</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a href="https://www.instagram.com/bigjoekumasi/" target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-white">
                  <Instagram className="h-4 w-4 text-brand" /> Instagram @bigjoekumasi
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/bigjoekumasi/" target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-white">
                  <Facebook className="h-4 w-4 text-brand" /> Facebook Big Joe Kumasi
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@bigjoekumasi" target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-white">
                  <Music4 className="h-4 w-4 text-brand" /> TikTok @bigjoekumasi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">Order fast</p>
            <Button asChild className="mt-4 gradient-brand text-brand-foreground border-0">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener"><MessagesSquare className="mr-2 h-4 w-4" /> WhatsApp Big Joe</a>
            </Button>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Big Joe Kumasi. All rights reserved.
        </div>
      </footer>

      {/* ORDER DIALOG */}
      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
          <DialogHeader className="border-b p-6">
            <DialogTitle className="text-2xl font-bold">Complete your order</DialogTitle>
            <DialogDescription>Fill the form — your order goes straight to Big Joe on WhatsApp.</DialogDescription>
          </DialogHeader>

          {selected && (
            <Card className="mx-6 mt-6 flex items-center gap-4 rounded-2xl border-border p-4 shadow-card">
              <img src={selected.back} alt={selected.model} className="h-20 w-20 rounded-xl object-contain bg-secondary" />
              <div className="flex-1">
                <p className="font-semibold">{selected.model}</p>
                <p className="text-xs text-muted-foreground">{selected.storage} · {selected.color}</p>
                <p className="mt-1 text-lg font-bold">GHS {total.toLocaleString()}</p>
              </div>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="grid gap-5 p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Kwame Mensah" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0551234567" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Delivery address</Label>
              <Input id="address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House no, street, landmark" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">City / Region</Label>
              <Input id="city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>

            <div className="grid gap-3">
              <Label>Payment method</Label>
              <RadioGroup value={form.payment} onValueChange={(v) => setForm({ ...form, payment: v })} className="grid gap-3 md:grid-cols-3">
                {["MoMo", "Cash on Delivery", "Bank Transfer"].map((m) => (
                  <label key={m} htmlFor={m} className={`flex cursor-pointer items-center gap-3 rounded-2xl border bg-card p-4 transition ${form.payment === m ? "border-brand ring-2 ring-brand/30" : "border-border"}`}>
                    <RadioGroupItem id={m} value={m} />
                    <span className="text-sm font-medium">{m}</span>
                  </label>
                ))}
              </RadioGroup>
              {form.payment === "MoMo" && (
                <p className="rounded-xl bg-brand/10 px-4 py-3 text-sm text-foreground">
                  Send MoMo to <strong>{MOMO_NUMBER}</strong> (Big Joe). Include your name as reference.
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Preferred delivery time, color, etc." />
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setOrderOpen(false)} className="flex-1">
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button type="submit" size="lg" className="flex-1 gradient-brand text-brand-foreground border-0 shadow-glow hover:opacity-95">
                <Send className="mr-2 h-4 w-4" /> Send order
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
