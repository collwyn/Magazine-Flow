import logo from "@assets/generated_images/minimalist_magazine_distribution_logo,_white_on_blue.png";

export default function Apply() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 font-sans">
      <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
        <img src={logo} alt="ICONIC Logo" className="w-full h-full object-cover" />
      </div>
      <p className="text-xl font-semibold text-foreground tracking-tight">
        Retailer Application — Coming Soon
      </p>
    </div>
  );
}
