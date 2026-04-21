/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import {
  Car,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Star,
  Droplets,
  Sparkles,
  CheckCircle2,
  Menu,
  X,
  MessageCircle,
  Award,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ── Data ──────────────────────────────────────────────────────────
const NAV_LINKS = [
  { name: "Tentang", href: "#about" },
  { name: "Layanan", href: "#services" },
  { name: "Perjalanan", href: "#history" },
  { name: "Cabang", href: "#branches" },
  { name: "Kontak", href: "#contact" },
];

const SERVICES = [
  {
    key: "cuci",
    title: "Cuci Mobil",
    description: "Pencucian kendaraan berkualitas tinggi dengan peralatan modern dan ramah lingkungan.",
    icon: Droplets,
    details: ["Pencucian Eksterior", "Vacuum Interior", "Semir Ban", "Pembersihan Kaca"],
    color: "from-cyan-500/15 to-blue-600/15",
    border: "border-cyan-500/25",
    glowColor: "rgba(6,182,212,0.2)",
    img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800",
  },
  {
    key: "detailing",
    title: "Detailing & Coating",
    description: "Perawatan premium dengan Ceramic Coating bergaransi, ketahanan hingga 5 tahun.",
    icon: Sparkles,
    details: ["Engine Detailing", "Interior Deep Clean", "Glass Coating", "Body Ceramic Coating"],
    color: "from-violet-500/15 to-purple-600/15",
    border: "border-violet-500/25",
    glowColor: "rgba(139,92,246,0.2)",
    img: "/image/image.png",
  },
  {
    key: "khusus",
    title: "Solusi Khusus",
    description: "Layanan perawatan fleksibel termasuk Home Service langsung di rumah Anda.",
    icon: ShieldCheck,
    details: ["Home Service", "Pick-up & Delivery", "Special Vehicle Care", "Corporate Fleet"],
    color: "from-emerald-500/15 to-teal-600/15",
    border: "border-emerald-500/25",
    glowColor: "rgba(16,185,129,0.2)",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
  },
];

const TIMELINE = [
  { year: "2020", event: "Didirikan sebagai jasa pencucian mobil pertama di Semarang.", icon: Car },
  { year: "2021", event: "Ekspansi layanan dan pengembangan standar kualitas operasional.", icon: Zap },
  { year: "2022", event: "Memperkenalkan konsep standar kepuasan konsumen yang terukur.", icon: Award },
  { year: "2023", event: "Pendirian cabang Otobilaz di Bekasi dengan sistem keamanan inovatif.", icon: MapPin },
  { year: "2024", event: "Kolaborasi internasional untuk Detailing & Coating kualitas premium.", icon: Sparkles },
  { year: "2025", event: "Pengembangan kemitraan usaha dan standar layanan berkelanjutan.", icon: Users },
];

const BRANCHES = [
  {
    name: "Semarang",
    region: "Jawa Tengah",
    services: ["Carwash"],
    address: "53H3+G44 Jogan, Jl. Raya Pati-Gabus, Area Sawah, Tambahmulyo, Kec. Pati, Kabupaten Pati, Jawa Tengah 59173, Indonesia",
    phone: "+62 812-0000-0001",
    hours: "08:00 – 20:00 WIB",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600",
    maps: "https://maps.app.goo.gl/3Qs8Lvp31gnV59N77?g_st=iw",
  },
  {
    name: "Bekasi",
    region: "Jawa Barat",
    services: ["Carwash", "Detailing & Coating", "Cafe"],
    address: "Jl. Cemara Raya, Jakasampurna, Kec. Bekasi Barat, Kota Bekasi, Jawa - Barat 17145",
    phone: "0817-1717-3338",
    hours: "07:00 – 21:00 WIB",
    img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=600",
  },
];

const TESTIMONIALS = [
  { name: "Andi Pratama", role: "Owner Toyota Camry", text: "Luar biasa! Mobil saya jadi seperti baru keluar showroom. Ceramic coating‑nya benar‑benar tahan lama.", rating: 5 },
  { name: "Siti Rahayu", role: "Fleet Manager PT. ABC", text: "Kami mempercayakan perawatan armada 20 unit ke Otobilaz. Profesional dan tepat waktu!", rating: 5 },
  { name: "Budi Setiawan", role: "Pemilik BMW Series 3", text: "Detail‑nya sangat teliti. Engine compartment yang paling impress saya.", rating: 5 },
  { name: "Dewi Kusuma", role: "Owner Honda CR‑V", text: "Home service‑nya sangat membantu. Tim ramah dan hasil kerja memuaskan.", rating: 4 },
];

const FAQS = [
  { q: "Berapa lama proses cuci mobil standar?", a: "Proses cuci eksterior + vacuum interior memakan waktu sekitar 45–60 menit tergantung kondisi kendaraan." },
  { q: "Apakah Ceramic Coating aman untuk cat mobil?", a: "Ya, Ceramic Coating justru melindungi cat dari UV, air hujan, dan goresan halus. Produk kami telah tersertifikasi internasional." },
  { q: "Bagaimana cara booking Home Service?", a: "Hubungi kami melalui WhatsApp di nomor yang tersedia, atau isi form kontak di website ini. Tim kami akan menghubungi dalam 1×24 jam." },
  { q: "Apakah ada garansi untuk layanan Detailing?", a: "Ya! Kami memberikan garansi kepuasan 30 hari untuk semua layanan Detailing & Coating." },
  { q: "Kendaraan apa saja yang dilayani?", a: "Kami melayani semua jenis kendaraan: mobil pribadi, SUV, MPV, sedan, hingga armada komersial." },
];

const STATS = [
  { value: "5+", label: "Tahun Pengalaman", icon: Award },
  { value: "2K+", label: "Mobil / Bulan", icon: Car },
  { value: "2", label: "Cabang Aktif", icon: MapPin },
  { value: "99%", label: "Kepuasan Klien", icon: Star },
];

// ── 3D Tilt Card ──────────────────────────────────────────────────
function Card3D({
  children,
  className = "",
  tilt = 8,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: number;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const xVal = useMotionValue(0);
  const yVal = useMotionValue(0);
  const rotX = useTransform(yVal, [-0.5, 0.5], [tilt, -tilt]);
  const rotY = useTransform(xVal, [-0.5, 0.5], [-tilt, tilt]);
  const springX = useSpring(rotX, { stiffness: 300, damping: 25 });
  const springY = useSpring(rotY, { stiffness: 300, damping: 25 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      const r = divRef.current.getBoundingClientRect();
      xVal.set((e.clientX - r.left) / r.width - 0.5);
      yVal.set((e.clientY - r.top) / r.height - 0.5);
    },
    [xVal, yVal]
  );

  const onMouseLeave = useCallback(() => {
    xVal.set(0);
    yVal.set(0);
  }, [xVal, yVal]);

  return (
    <motion.div
      ref={divRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Star Rating ───────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= count ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
        />
      ))}
    </div>
  );
}

// ── Section Label ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400 mb-4">
      <span className="w-4 h-px bg-cyan-400" />
      {children}
      <span className="w-4 h-px bg-cyan-400" />
    </span>
  );
}

// ── App ───────────────────────────────────────────────────────────
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/+6281717173338?text=Halo%20Otobilaz%2C%20saya%20ingin%20booking%20layanan.",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f6ff] text-slate-900 font-sans overflow-x-hidden selection:bg-cyan-400/30 selection:text-cyan-700">

      {/* ── Ambient background orbs ─────────────────────────── */}
      <div aria-hidden className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.60, 0.45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-[5%] w-[700px] h-[700px] rounded-full bg-cyan-300/40 blur-[130px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.50, 0.35] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[35%] right-[-5%] w-[600px] h-[600px] rounded-full bg-violet-300/30 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.40, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[5%] left-[35%] w-[500px] h-[500px] rounded-full bg-sky-200/50 blur-[100px]"
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,145,178,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 h-20 px-4 md:px-16 flex items-center justify-between bg-white/80 backdrop-blur-2xl border-b border-slate-200/80">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/40">
            <Car className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">OTOBILAZ</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <Button
            size="sm"
            onClick={openWhatsApp}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl px-6 shadow-lg shadow-cyan-500/30 border-0 font-bold"
          >
            Booking
          </Button>
        </nav>

        <button
          className="md:hidden p-2 text-slate-700 hover:text-slate-950 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* ── Mobile Menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black border-b border-slate-100 pb-4 text-slate-800 hover:text-cyan-600 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <Button
                className="w-full mt-4 h-14 text-base bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 rounded-xl font-bold"
                onClick={() => { setIsMenuOpen(false); openWhatsApp(); }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Booking via WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="min-h-screen flex items-center px-4 md:px-16 pt-20 pb-16">
          <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/40 text-cyan-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 pulse-glow"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Terpercaya · Bekasi & Semarang
              </motion.div>

              <h1 className="text-5xl md:text-[68px] font-black leading-[1.02] mb-6 tracking-[-2.5px]">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block text-white"
                >Perawatan</motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"
                >Mobil Elite</motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="block text-slate-600 text-4xl md:text-5xl font-bold mt-2"
                >di Indonesia.</motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-base md:text-lg text-slate-800 mb-10 max-w-[440px] leading-relaxed"
              >
                Teknologi pencucian modern, ceramic coating premium, dan home service
                — semua dalam satu tempat terpercaya.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-3"
              >
                <Button
                  size="lg"
                  onClick={openWhatsApp}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white h-14 px-8 rounded-xl text-base font-bold shadow-2xl shadow-cyan-500/35 border-0"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Booking Sekarang
                </Button>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center border border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-slate-950 h-14 px-8 rounded-xl text-base bg-transparent transition-all duration-300 font-medium"
                >
                  Lihat Layanan →
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-4 gap-4 mt-12 pt-12 border-t border-slate-200"
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-slate-900">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-700 mt-0.5 leading-tight">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: 3D Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card3D className="rounded-3xl" tilt={6}>
                <div
                  className="rounded-3xl bg-white/90 border border-slate-200 p-8 md:p-10 backdrop-blur-sm"
                  style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)" }}
                >
                  <AnimatePresence mode="wait">
                    {formStatus === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10"
                      >
                        <div className="w-20 h-20 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h2 className="text-2xl font-black mb-2">Pesan Terkirim!</h2>
                        <p className="text-slate-700 mb-8 text-sm">Tim kami akan segera menghubungi Anda.</p>
                        <Button
                          onClick={() => setFormStatus("idle")}
                          variant="outline"
                          className="w-full border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-slate-950 bg-transparent"
                        >
                          Kirim Lagi
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div className="mb-6">
                          <h2 className="text-2xl font-black mb-1 text-slate-900">Mulai Sekarang</h2>
                          <p className="text-sm text-slate-700">Konsultasi gratis kebutuhan perawatan mobil Anda.</p>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-slate-700">Nama Lengkap</Label>
                          <Input placeholder="cth. Budi Santoso" className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-500 h-11 rounded-xl focus-visible:border-cyan-500" required />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-slate-700">Email</Label>
                          <Input type="email" placeholder="budi@email.com" className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-500 h-11 rounded-xl focus-visible:border-cyan-500" required />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-slate-700">Pesan Singkat</Label>
                          <Textarea placeholder="Ceritakan kebutuhan Anda..." className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-500 min-h-[90px] rounded-xl resize-none focus-visible:border-cyan-500" required />
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black rounded-xl mt-2 border-0 shadow-xl shadow-cyan-500/30"
                          disabled={formStatus === "submitting"}
                        >
                          {formStatus === "submitting" ? "Mengirim..." : "Kirim Permintaan →"}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </Card3D>
            </motion.div>
          </div>
        </section>

        {/* ══ ABOUT ═════════════════════════════════════════════ */}
        <section id="about" className="py-28 px-4 md:px-16">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Card3D className="rounded-2xl" tilt={5}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative" style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)" }}>
                    <img src="/image/image.png" alt="Detailing profesional" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                  </div>
                </Card3D>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <SectionLabel>Tentang Kami</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1] tracking-tight">
                  Mengubah Kendaraan Anda{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Menjadi Karya Terbaik</span>
                </h2>
                <p className="text-slate-800 leading-relaxed mb-8">
                  Otobilaz adalah jasa pencucian dan perawatan otomotif premium yang berdedikasi memberikan hasil terbaik bagi kendaraan Anda. Dengan teknologi terkini dan tenaga ahli berpengalaman, kami hadir menjaga nilai investasi kendaraan Anda.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {STATS.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08 }}>
                      <Card3D className="rounded-xl" tilt={10}>
                        <div className="p-5 bg-white border border-slate-200 rounded-xl hover:border-cyan-400 transition-colors shadow-sm">
                          <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{s.value}</div>
                          <div className="text-[11px] uppercase font-black text-slate-700 mt-1 tracking-widest">{s.label}</div>
                        </div>
                      </Card3D>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══════════════════════════════════════════ */}
        <section id="services" className="py-28 px-4 md:px-16">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <SectionLabel>Layanan Kami</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Layanan Unggulan</h2>
              <p className="text-slate-700 max-w-sm mx-auto">Pilih paket perawatan yang sesuai dengan kebutuhan kendaraan Anda.</p>
            </motion.div>

            <Tabs defaultValue="cuci" className="max-w-5xl mx-auto">
              <TabsList className="grid grid-cols-3 rounded-xl p-1 mb-8">
                {SERVICES.map((s) => (
                  <TabsTrigger key={s.key} value={s.key} className="rounded-lg text-slate-800 font-semibold transition-all">
                    {s.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {SERVICES.map((s) => (
                <TabsContent key={s.key} value={s.key}>
                  <Card3D className="rounded-2xl" tilt={4}>
                    <div className={`rounded-2xl bg-gradient-to-br ${s.color} border ${s.border} overflow-hidden`} style={{ boxShadow: `0 30px 80px ${s.glowColor}` }}>
                      <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-10">
                          <div className="w-14 h-14 rounded-2xl bg-slate-900/10 border border-slate-900/15 flex items-center justify-center mb-6">
                            <s.icon className="w-7 h-7 text-slate-800" />
                          </div>
                          <h3 className="text-2xl font-black mb-3 text-slate-900">{s.title}</h3>
                          <p className="text-slate-700 mb-6 text-sm leading-relaxed">{s.description}</p>
                          <ul className="space-y-3 mb-8">
                            {s.details.map((d) => (
                              <li key={d} className="flex items-center gap-3 text-sm text-slate-800">
                                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                                {d}
                              </li>
                            ))}
                          </ul>
                          <Button onClick={openWhatsApp} className="bg-slate-900/10 hover:bg-slate-900/18 border border-slate-900/20 text-slate-900 rounded-xl">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Booking Layanan Ini
                          </Button>
                        </div>
                        <div className="min-h-[260px] overflow-hidden md:rounded-r-2xl">
                          <img src={s.img} alt={s.title} className="w-full h-full object-cover opacity-75 hover:opacity-90 transition-opacity duration-500" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* ══ HISTORY / TIMELINE ════════════════════════════════ */}
        <section id="history" className="py-28 px-4 md:px-16">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <SectionLabel>Perjalanan Kami</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Dari Nol Menuju Premium</h2>
              <p className="text-slate-700">Milestone Otobilaz dari 2020 hingga kini.</p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/60 via-blue-500/30 to-transparent hidden md:block" />
              <div className="space-y-10">
                {TIMELINE.map((t, i) => (
                  <motion.div
                    key={t.year}
                    initial={{ opacity: 0, y: 30, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`flex items-center gap-0 md:gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <Card3D className="flex-1 md:max-w-[calc(50%-3.5rem)]" tilt={7}>
                        <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-cyan-400 transition-colors shadow-sm">
                        <div className="text-[11px] font-black uppercase tracking-[3px] text-cyan-400 mb-2">{t.year}</div>
                        <p className="text-slate-800 text-sm leading-relaxed">{t.event}</p>
                      </div>
                    </Card3D>
                    <div className="hidden md:flex w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 items-center justify-center shadow-xl shadow-cyan-500/35 z-10 border-4 border-[#f0f6ff]">
                      <t.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ BRANCHES ══════════════════════════════════════════ */}
        <section id="branches" className="py-28 px-4 md:px-16">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <SectionLabel>Lokasi</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Cabang Kami</h2>
              <p className="text-slate-700">Temukan cabang Otobilaz terdekat dan kunjungi kami.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {BRANCHES.map((b, i) => (
                <motion.div key={b.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                  <Card3D className="rounded-2xl h-full" tilt={6}>
                    <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden h-full hover:border-cyan-400 transition-colors shadow-sm">
                      <div className="aspect-video overflow-hidden relative">
                        <img src={b.img} alt={b.name} className="w-full h-full object-cover opacity-65 hover:opacity-80 transition-opacity duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full">Buka</div>
                      </div>
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-black">{b.name}</h3>
                          <p className="text-slate-700 text-sm">{b.region}</p>
                        </div>
                        <div className="space-y-2.5 text-sm text-slate-800 mb-5">
                          <div className="flex items-start gap-2.5"><MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />{b.address}</div>
                          <div className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-cyan-400 shrink-0" /><a href={`tel:${b.phone.replace(/\s/g, "")}`} className="hover:text-cyan-400 transition-colors">{b.phone}</a></div>
                          <div className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-cyan-400 shrink-0" />{b.hours}</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {b.services.map((sv) => (
                            <span key={sv} className="text-[10px] font-bold uppercase px-2.5 py-1 bg-cyan-50 border border-cyan-200 rounded-full text-cyan-700">{sv}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══════════════════════════════════════ */}
        <section className="py-28 px-4 md:px-16">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <SectionLabel>Testimoni</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Kata Pelanggan Kami</h2>
              <p className="text-slate-700">Kepuasan pelanggan adalah prioritas utama kami.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={t.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card3D className="h-full rounded-2xl" tilt={9}>
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl h-full flex flex-col hover:border-cyan-400 transition-colors shadow-sm">
                      <Stars count={t.rating} />
                      <p className="text-slate-800 text-sm leading-relaxed my-5 flex-1">"{t.text}"</p>
                      <div className="border-t border-slate-100 pt-4">
                        <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                        <div className="text-slate-600 text-[11px] mt-0.5">{t.role}</div>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQ ═══════════════════════════════════════════════ */}
        <section className="py-28 px-4 md:px-16">
          <div className="container mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Pertanyaan Umum</h2>
              <p className="text-slate-700">Jawaban atas pertanyaan yang sering ditanyakan pelanggan kami.</p>
            </motion.div>
            <Accordion multiple={false} className="space-y-3">
              {FAQS.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <AccordionItem value={`item-${i}`} className="bg-white border border-slate-200 rounded-2xl px-6 hover:border-cyan-400 transition-colors shadow-sm">
                    <AccordionTrigger className="py-5 text-sm font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-5 leading-relaxed text-sm">{f.a}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ══ CONTACT ═══════════════════════════════════════════ */}
        <section id="contact" className="py-28 px-4 md:px-16">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <SectionLabel>Kontak</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Hubungi Kami</h2>
              <p className="text-slate-700">Kami siap melayani Anda 7 hari seminggu.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {[
                { icon: Phone, label: "Telepon / WhatsApp", value: "+62 817 1717 3338", action: openWhatsApp, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/25" },
                { icon: Mail, label: "Email", value: "otobilaz.id@gmail.com", action: () => window.open("mailto:otobilaz.id@gmail.com"), color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/25" },
                { icon: Instagram, label: "Instagram", value: "https://www.instagram.com/otobilaz.bks/", action: () => window.open("https://www.instagram.com/otobilaz.bks/", "_blank"), color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/25" },
              ].map((c, i) => (
                <motion.div key={c.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card3D className="rounded-2xl" tilt={8}>
                    <button onClick={c.action} className="w-full p-8 bg-white border border-slate-200 rounded-2xl hover:border-cyan-400 hover:shadow-md transition-all text-left group shadow-sm">
                      <div className={`w-14 h-14 rounded-2xl ${c.bg} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <c.icon className={`w-6 h-6 ${c.color}`} />
                      </div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-slate-600 mb-1.5">{c.label}</div>
                      <div className={`font-semibold ${c.color} text-sm group-hover:underline`}>{c.value}</div>
                    </button>
                  </Card3D>
                </motion.div>
              ))}
            </div>

            {/* CTA Block */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }} className="text-center mt-16">
              <div className="inline-block p-px rounded-3xl gradient-border">
                  <div className="bg-[#f0f6ff] rounded-3xl px-10 py-10 md:px-16">
                  <h3 className="text-2xl md:text-3xl font-black mb-3 text-slate-900">Siap Merawat Kendaraan Anda?</h3>
                  <p className="text-slate-700 mb-7 text-sm max-w-sm mx-auto">Hubungi kami sekarang dan dapatkan konsultasi gratis dari tim ahli kami.</p>
                  <Button size="lg" onClick={openWhatsApp} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white h-14 px-10 rounded-xl text-base font-bold shadow-2xl shadow-cyan-500/35 border-0">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat WhatsApp Sekarang
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="py-10 px-4 md:px-16 border-t border-slate-200 bg-white/80">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <a href="#" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Car className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-black text-slate-900">OTOBILAZ</span>
          </a>
          <p className="text-[12px] text-slate-600">&copy; 2026 Otobilaz Tech. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6 text-[12px] text-slate-700">
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Syarat & Ketentuan</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Kebijakan Privasi</span>
            <button onClick={() => window.open("https://instagram.com/otobilaz.official", "_blank")} className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
              <Instagram className="w-3 h-3" />Instagram
            </button>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp Floating Button ─────────────────────────── */}
      <motion.button
        onClick={openWhatsApp}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-7 right-7 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-500/40 flex items-center justify-center text-white border-2 border-emerald-300/30"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-black flex items-center justify-center">1</span>
      </motion.button>
    </div>
  );
}

