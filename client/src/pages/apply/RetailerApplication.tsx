import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import logo from "@assets/generated_images/minimalist_magazine_distribution_logo,_white_on_blue.png";

const STEPS = [
  "Business Info",
  "Address",
  "Contacts & Hours",
  "Delivery & Services",
  "Review & Submit",
];

const DAYS = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
] as const;

type Day = typeof DAYS[number]["key"];

type FormData = {
  // Step 1
  legalBusinessName: string; dba: string; ein: string; resaleCertNumber: string;
  ownershipStructure: string; storeType: string; storeTypeOther: string;
  numberOfLocations: string; footTrafficEstimate: string;
  // Step 2
  physicalStreet: string; physicalCity: string; physicalState: string; physicalZip: string;
  sameMailing: boolean;
  mailingStreet: string; mailingCity: string; mailingState: string; mailingZip: string;
  // Step 3
  storeManagerName: string; storeManagerPhone: string; storeManagerEmail: string;
  receivingManagerName: string; receivingManagerPhone: string; receivingManagerEmail: string;
  apContactName: string; apContactPhone: string; apContactEmail: string;
  closedDays: Set<Day>;
  hoursMonOpen: string; hoursMonClose: string;
  hoursTueOpen: string; hoursTueClose: string;
  hoursWedOpen: string; hoursWedClose: string;
  hoursThuOpen: string; hoursThuClose: string;
  hoursFriOpen: string; hoursFriClose: string;
  hoursSatOpen: string; hoursSatClose: string;
  hoursSunOpen: string; hoursSunClose: string;
  // Step 4
  receivingHoursWeekdayOpen: string; receivingHoursWeekdayClose: string;
  receivingHoursSatOpen: string; receivingHoursSatClose: string;
  receivingHoursSunOpen: string; receivingHoursSunClose: string;
  deliveryAccess: string[];
  deliveryRestrictions: string; deliverySignee: string;
  existingRoute: string; existingRouteDetails: string;
  deliveryFrequency: string;
  needsMerchandising: boolean; needsRackSetup: boolean; needsFixtures: boolean;
  interestedInResaleProgram: string;
  // Step 5
  magazineCategoryInterests: string[];
  howHeardAboutUs: string; preferredContactMethod: string;
};

const EMPTY: FormData = {
  legalBusinessName: "", dba: "", ein: "", resaleCertNumber: "",
  ownershipStructure: "", storeType: "", storeTypeOther: "",
  numberOfLocations: "", footTrafficEstimate: "",
  physicalStreet: "", physicalCity: "", physicalState: "", physicalZip: "",
  sameMailing: true,
  mailingStreet: "", mailingCity: "", mailingState: "", mailingZip: "",
  storeManagerName: "", storeManagerPhone: "", storeManagerEmail: "",
  receivingManagerName: "", receivingManagerPhone: "", receivingManagerEmail: "",
  apContactName: "", apContactPhone: "", apContactEmail: "",
  closedDays: new Set(),
  hoursMonOpen: "", hoursMonClose: "", hoursTueOpen: "", hoursTueClose: "",
  hoursWedOpen: "", hoursWedClose: "", hoursThuOpen: "", hoursThuClose: "",
  hoursFriOpen: "", hoursFriClose: "", hoursSatOpen: "", hoursSatClose: "",
  hoursSunOpen: "", hoursSunClose: "",
  receivingHoursWeekdayOpen: "", receivingHoursWeekdayClose: "",
  receivingHoursSatOpen: "", receivingHoursSatClose: "",
  receivingHoursSunOpen: "", receivingHoursSunClose: "",
  deliveryAccess: [], deliveryRestrictions: "", deliverySignee: "",
  existingRoute: "", existingRouteDetails: "",
  deliveryFrequency: "",
  needsMerchandising: false, needsRackSetup: false, needsFixtures: false,
  interestedInResaleProgram: "",
  magazineCategoryInterests: [], howHeardAboutUs: "", preferredContactMethod: "",
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-500 text-xs mt-1">{msg}</p>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-heading font-bold text-base text-foreground mb-4 mt-6 first:mt-0">{children}</h3>;
}

function Row({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className={`grid gap-4 ${cols === 2 ? "sm:grid-cols-2" : cols === 3 ? "sm:grid-cols-3" : cols === 4 ? "sm:grid-cols-4" : "grid-cols-1"}`}>
      {children}
    </div>
  );
}

function Field({ label, required, children, error }: { label: string; required?: boolean; children: React.ReactNode; error?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</Label>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

export default function RetailerApplication() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | string, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const set = (field: keyof FormData, value: unknown) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => { const n = { ...e }; delete n[field as string]; return n; });
  };

  const toggleSet = <T,>(field: keyof FormData, value: T) => {
    setForm(f => {
      const s = new Set(f[field] as Set<T>);
      s.has(value) ? s.delete(value) : s.add(value);
      return { ...f, [field]: s };
    });
  };

  const toggleArray = (field: keyof FormData, value: string) => {
    setForm(f => {
      const arr = f[field] as string[];
      return { ...f, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (step === 1) {
      if (!form.legalBusinessName.trim()) e.legalBusinessName = "Required";
      if (!form.ein.trim()) e.ein = "Required";
      if (!form.ownershipStructure) e.ownershipStructure = "Required";
      if (!form.storeType) e.storeType = "Required";
      if (form.storeType === "other" && !form.storeTypeOther.trim()) e.storeTypeOther = "Please specify";
    }
    if (step === 2) {
      if (!form.physicalStreet.trim()) e.physicalStreet = "Required";
      if (!form.physicalCity.trim()) e.physicalCity = "Required";
      if (!form.physicalState.trim()) e.physicalState = "Required";
      if (!form.physicalZip.trim()) e.physicalZip = "Required";
      if (!form.sameMailing) {
        if (!form.mailingStreet.trim()) e.mailingStreet = "Required";
        if (!form.mailingCity.trim()) e.mailingCity = "Required";
        if (!form.mailingState.trim()) e.mailingState = "Required";
        if (!form.mailingZip.trim()) e.mailingZip = "Required";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const buildPayload = () => {
    const dayKey = (d: Day, suffix: "Open" | "Close") => {
      const map: Record<Day, string> = { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" };
      return `hours${map[d]}${suffix}` as keyof FormData;
    };
    const hours: Partial<FormData> = {};
    for (const { key } of DAYS) {
      if (!form.closedDays.has(key)) {
        hours[dayKey(key, "Open")] = form[dayKey(key, "Open")] as string;
        hours[dayKey(key, "Close")] = form[dayKey(key, "Close")] as string;
      }
    }
    return {
      legalBusinessName: form.legalBusinessName,
      dba: form.dba || undefined,
      ein: form.ein,
      resaleCertNumber: form.resaleCertNumber || undefined,
      ownershipStructure: form.ownershipStructure,
      storeType: form.storeType,
      storeTypeOther: form.storeTypeOther || undefined,
      numberOfLocations: form.numberOfLocations ? parseInt(form.numberOfLocations) : undefined,
      footTrafficEstimate: form.footTrafficEstimate || undefined,
      physicalStreet: form.physicalStreet,
      physicalCity: form.physicalCity,
      physicalState: form.physicalState,
      physicalZip: form.physicalZip,
      mailingStreet: form.sameMailing ? undefined : form.mailingStreet || undefined,
      mailingCity: form.sameMailing ? undefined : form.mailingCity || undefined,
      mailingState: form.sameMailing ? undefined : form.mailingState || undefined,
      mailingZip: form.sameMailing ? undefined : form.mailingZip || undefined,
      storeManagerName: form.storeManagerName || undefined,
      storeManagerPhone: form.storeManagerPhone || undefined,
      storeManagerEmail: form.storeManagerEmail || undefined,
      receivingManagerName: form.receivingManagerName || undefined,
      receivingManagerPhone: form.receivingManagerPhone || undefined,
      receivingManagerEmail: form.receivingManagerEmail || undefined,
      apContactName: form.apContactName || undefined,
      apContactPhone: form.apContactPhone || undefined,
      apContactEmail: form.apContactEmail || undefined,
      ...hours,
      receivingHoursWeekdayOpen: form.receivingHoursWeekdayOpen || undefined,
      receivingHoursWeekdayClose: form.receivingHoursWeekdayClose || undefined,
      receivingHoursSatOpen: form.receivingHoursSatOpen || undefined,
      receivingHoursSatClose: form.receivingHoursSatClose || undefined,
      receivingHoursSunOpen: form.receivingHoursSunOpen || undefined,
      receivingHoursSunClose: form.receivingHoursSunClose || undefined,
      deliveryAccess: form.deliveryAccess.length ? form.deliveryAccess : undefined,
      deliveryRestrictions: form.deliveryRestrictions || undefined,
      deliverySignee: form.deliverySignee || undefined,
      existingRoute: form.existingRoute === "yes" ? true : form.existingRoute === "no" ? false : undefined,
      existingRouteDetails: form.existingRouteDetails || undefined,
      deliveryFrequency: form.deliveryFrequency || undefined,
      needsMerchandising: form.needsMerchandising,
      needsRackSetup: form.needsRackSetup,
      needsFixtures: form.needsFixtures,
      interestedInResaleProgram: form.interestedInResaleProgram || undefined,
      magazineCategoryInterests: form.magazineCategoryInterests.length ? form.magazineCategoryInterests : undefined,
      howHeardAboutUs: form.howHeardAboutUs || undefined,
      preferredContactMethod: form.preferredContactMethod || undefined,
    };
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      toast({ title: "Submission failed", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center gap-6 font-sans">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div className="space-y-3 max-w-md">
          <h1 className="text-3xl font-heading font-bold">Application Received</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your application has been received. An ICONIC Distributions representative will be in touch within 2–3 business days.
          </p>
        </div>
        <Button onClick={() => setLocation("/")} className="mt-2">
          Back to Home
        </Button>
      </div>
    );
  }

  // ── Progress bar ────────────────────────────────────────────────
  const Progress = () => (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 -z-0" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-300 -z-0"
          style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
        />
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = n < step;
          const active = n === step;
          return (
            <div key={n} className="flex flex-col items-center gap-1.5 z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${done ? "bg-primary border-primary text-white" : active ? "bg-white border-primary text-primary" : "bg-white border-slate-200 text-slate-400"}`}>
                {done ? <CheckCircle className="w-4 h-4" /> : n}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${active ? "text-primary" : done ? "text-primary/70" : "text-slate-400"}`}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Step 1: Business Information ────────────────────────────────
  const Step1 = () => (
    <div className="space-y-4">
      <Row>
        <Field label="Legal Business Name" required error={errors.legalBusinessName as string}>
          <Input data-testid="input-legal-business-name" value={form.legalBusinessName} onChange={e => set("legalBusinessName", e.target.value)} placeholder="ACME Books LLC" />
        </Field>
        <Field label="DBA / Trade Name">
          <Input data-testid="input-dba" value={form.dba} onChange={e => set("dba", e.target.value)} placeholder="If different from legal name" />
        </Field>
      </Row>
      <Row>
        <Field label="Federal Tax ID / EIN" required error={errors.ein as string}>
          <Input data-testid="input-ein" value={form.ein} onChange={e => set("ein", e.target.value)} placeholder="XX-XXXXXXX" />
        </Field>
        <Field label="State Resale Certificate Number">
          <Input data-testid="input-resale-cert" value={form.resaleCertNumber} onChange={e => set("resaleCertNumber", e.target.value)} placeholder="Optional" />
        </Field>
      </Row>
      <Row>
        <Field label="Ownership Structure" required error={errors.ownershipStructure as string}>
          <Select value={form.ownershipStructure} onValueChange={v => set("ownershipStructure", v)}>
            <SelectTrigger data-testid="select-ownership-structure"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="independent">Independent</SelectItem>
              <SelectItem value="franchise">Franchise</SelectItem>
              <SelectItem value="chain">Chain</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Store Type" required error={errors.storeType as string}>
          <Select value={form.storeType} onValueChange={v => set("storeType", v)}>
            <SelectTrigger data-testid="select-store-type"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="convenience">Convenience</SelectItem>
              <SelectItem value="grocery">Grocery</SelectItem>
              <SelectItem value="pharmacy">Pharmacy</SelectItem>
              <SelectItem value="specialty">Specialty</SelectItem>
              <SelectItem value="airport">Airport</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </Row>
      {form.storeType === "other" && (
        <Field label="Please specify store type" required error={errors.storeTypeOther as string}>
          <Input data-testid="input-store-type-other" value={form.storeTypeOther} onChange={e => set("storeTypeOther", e.target.value)} placeholder="Describe your store type" />
        </Field>
      )}
      <Row>
        <Field label="Number of Locations">
          <Input data-testid="input-num-locations" type="number" min={1} value={form.numberOfLocations} onChange={e => set("numberOfLocations", e.target.value)} placeholder="1" />
        </Field>
        <Field label="Approximate Weekly Foot Traffic">
          <Select value={form.footTrafficEstimate} onValueChange={v => set("footTrafficEstimate", v)}>
            <SelectTrigger data-testid="select-foot-traffic"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="under_500">Under 500</SelectItem>
              <SelectItem value="500_1000">500–1,000</SelectItem>
              <SelectItem value="1000_2500">1,000–2,500</SelectItem>
              <SelectItem value="2500_5000">2,500–5,000</SelectItem>
              <SelectItem value="over_5000">Over 5,000</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </Row>
    </div>
  );

  // ── Step 2: Address ─────────────────────────────────────────────
  const Step2 = () => (
    <div className="space-y-4">
      <SectionTitle>Physical Store Address</SectionTitle>
      <Field label="Street Address" required error={errors.physicalStreet as string}>
        <Input data-testid="input-physical-street" value={form.physicalStreet} onChange={e => set("physicalStreet", e.target.value)} placeholder="123 Main St" />
      </Field>
      <Row cols={3}>
        <Field label="City" required error={errors.physicalCity as string}>
          <Input data-testid="input-physical-city" value={form.physicalCity} onChange={e => set("physicalCity", e.target.value)} placeholder="New York" />
        </Field>
        <Field label="State" required error={errors.physicalState as string}>
          <Input data-testid="input-physical-state" value={form.physicalState} onChange={e => set("physicalState", e.target.value.toUpperCase())} placeholder="NY" maxLength={2} />
        </Field>
        <Field label="ZIP" required error={errors.physicalZip as string}>
          <Input data-testid="input-physical-zip" value={form.physicalZip} onChange={e => set("physicalZip", e.target.value)} placeholder="10001" maxLength={10} />
        </Field>
      </Row>

      <div className="flex items-center gap-2 pt-2">
        <Checkbox
          id="same-mailing"
          data-testid="checkbox-same-mailing"
          checked={form.sameMailing}
          onCheckedChange={v => set("sameMailing", !!v)}
        />
        <Label htmlFor="same-mailing" className="text-sm cursor-pointer">Mailing address is the same as physical address</Label>
      </div>

      {!form.sameMailing && (
        <>
          <SectionTitle>Mailing Address</SectionTitle>
          <Field label="Street Address" required error={errors.mailingStreet as string}>
            <Input data-testid="input-mailing-street" value={form.mailingStreet} onChange={e => set("mailingStreet", e.target.value)} placeholder="PO Box or mailing address" />
          </Field>
          <Row cols={3}>
            <Field label="City" required error={errors.mailingCity as string}>
              <Input data-testid="input-mailing-city" value={form.mailingCity} onChange={e => set("mailingCity", e.target.value)} />
            </Field>
            <Field label="State" required error={errors.mailingState as string}>
              <Input data-testid="input-mailing-state" value={form.mailingState} onChange={e => set("mailingState", e.target.value.toUpperCase())} maxLength={2} />
            </Field>
            <Field label="ZIP" required error={errors.mailingZip as string}>
              <Input data-testid="input-mailing-zip" value={form.mailingZip} onChange={e => set("mailingZip", e.target.value)} maxLength={10} />
            </Field>
          </Row>
        </>
      )}
    </div>
  );

  // ── Step 3: Contacts & Hours ────────────────────────────────────
  const Step3 = () => (
    <div className="space-y-4">
      {[
        { title: "Store Manager", nameKey: "storeManagerName", phoneKey: "storeManagerPhone", emailKey: "storeManagerEmail" },
        { title: "Receiving Manager", nameKey: "receivingManagerName", phoneKey: "receivingManagerPhone", emailKey: "receivingManagerEmail" },
        { title: "Accounts Payable Contact", nameKey: "apContactName", phoneKey: "apContactPhone", emailKey: "apContactEmail" },
      ].map(({ title, nameKey, phoneKey, emailKey }) => (
        <div key={title}>
          <SectionTitle>{title}</SectionTitle>
          <Row cols={3}>
            <Field label="Name">
              <Input data-testid={`input-${nameKey}`} value={form[nameKey as keyof FormData] as string} onChange={e => set(nameKey as keyof FormData, e.target.value)} placeholder="Full name" />
            </Field>
            <Field label="Phone">
              <Input data-testid={`input-${phoneKey}`} value={form[phoneKey as keyof FormData] as string} onChange={e => set(phoneKey as keyof FormData, e.target.value)} placeholder="(212) 555-0100" />
            </Field>
            <Field label="Email">
              <Input data-testid={`input-${emailKey}`} type="email" value={form[emailKey as keyof FormData] as string} onChange={e => set(emailKey as keyof FormData, e.target.value)} placeholder="name@store.com" />
            </Field>
          </Row>
        </div>
      ))}

      <SectionTitle>Store Hours</SectionTitle>
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-muted-foreground pb-1 px-1">
          <span>Day</span><span>Open</span><span>Close</span><span className="text-center">Closed</span>
        </div>
        {DAYS.map(({ key, label }) => {
          const closed = form.closedDays.has(key);
          const openKey = `hours${label.slice(0, 3)}Open` as keyof FormData;
          const closeKey = `hours${label.slice(0, 3)}Close` as keyof FormData;
          return (
            <div key={key} className="grid grid-cols-4 gap-2 items-center px-1">
              <span className="text-sm font-medium">{label}</span>
              <Input data-testid={`input-hours-${key}-open`} type="time" disabled={closed} value={form[openKey] as string} onChange={e => set(openKey, e.target.value)} className="h-8 text-sm disabled:opacity-40" />
              <Input data-testid={`input-hours-${key}-close`} type="time" disabled={closed} value={form[closeKey] as string} onChange={e => set(closeKey, e.target.value)} className="h-8 text-sm disabled:opacity-40" />
              <div className="flex justify-center">
                <Checkbox data-testid={`checkbox-closed-${key}`} checked={closed} onCheckedChange={() => toggleSet("closedDays", key)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Step 4: Delivery & Services ─────────────────────────────────
  const Step4 = () => (
    <div className="space-y-4">
      <SectionTitle>Receiving Hours</SectionTitle>
      {[
        { label: "Weekdays", openKey: "receivingHoursWeekdayOpen", closeKey: "receivingHoursWeekdayClose" },
        { label: "Saturday", openKey: "receivingHoursSatOpen", closeKey: "receivingHoursSatClose" },
        { label: "Sunday", openKey: "receivingHoursSunOpen", closeKey: "receivingHoursSunClose" },
      ].map(({ label, openKey, closeKey }) => (
        <div key={label} className="grid grid-cols-3 gap-3 items-end">
          <Label className="text-sm font-medium">{label}</Label>
          <Field label="Open">
            <Input data-testid={`input-${openKey}`} type="time" value={form[openKey as keyof FormData] as string} onChange={e => set(openKey as keyof FormData, e.target.value)} className="h-8 text-sm" />
          </Field>
          <Field label="Close">
            <Input data-testid={`input-${closeKey}`} type="time" value={form[closeKey as keyof FormData] as string} onChange={e => set(closeKey as keyof FormData, e.target.value)} className="h-8 text-sm" />
          </Field>
        </div>
      ))}

      <SectionTitle>Delivery Access</SectionTitle>
      <div className="flex flex-wrap gap-4">
        {[["loading_dock", "Loading Dock"], ["front_door", "Front Door"], ["back_door", "Back Door"]].map(([val, label]) => (
          <div key={val} className="flex items-center gap-2">
            <Checkbox data-testid={`checkbox-access-${val}`} id={`access-${val}`} checked={form.deliveryAccess.includes(val)} onCheckedChange={() => toggleArray("deliveryAccess", val)} />
            <Label htmlFor={`access-${val}`} className="text-sm cursor-pointer">{label}</Label>
          </div>
        ))}
      </div>

      <Row>
        <Field label="Delivery Restrictions">
          <Textarea data-testid="textarea-delivery-restrictions" value={form.deliveryRestrictions} onChange={e => set("deliveryRestrictions", e.target.value)} placeholder="Any restrictions we should know about..." className="h-20 resize-none" />
        </Field>
        <Field label="Who signs for deliveries?">
          <Input data-testid="input-delivery-signee" value={form.deliverySignee} onChange={e => set("deliverySignee", e.target.value)} placeholder="Name or role" />
        </Field>
      </Row>

      <Field label="Is this location on an existing ICONIC route?">
        <RadioGroup value={form.existingRoute} onValueChange={v => set("existingRoute", v)} className="flex gap-4 mt-1">
          <div className="flex items-center gap-1.5"><RadioGroupItem data-testid="radio-existing-route-yes" value="yes" id="route-yes" /><Label htmlFor="route-yes" className="cursor-pointer">Yes</Label></div>
          <div className="flex items-center gap-1.5"><RadioGroupItem data-testid="radio-existing-route-no" value="no" id="route-no" /><Label htmlFor="route-no" className="cursor-pointer">No</Label></div>
        </RadioGroup>
      </Field>
      {form.existingRoute === "yes" && (
        <Field label="Route details">
          <Input data-testid="input-existing-route-details" value={form.existingRouteDetails} onChange={e => set("existingRouteDetails", e.target.value)} placeholder="Route name or number" />
        </Field>
      )}

      <Field label="Preferred Delivery Frequency">
        <RadioGroup value={form.deliveryFrequency} onValueChange={v => set("deliveryFrequency", v)} className="flex gap-4 mt-1">
          <div className="flex items-center gap-1.5"><RadioGroupItem data-testid="radio-frequency-weekly" value="weekly" id="freq-weekly" /><Label htmlFor="freq-weekly" className="cursor-pointer">Weekly</Label></div>
          <div className="flex items-center gap-1.5"><RadioGroupItem data-testid="radio-frequency-biweekly" value="biweekly" id="freq-biweekly" /><Label htmlFor="freq-biweekly" className="cursor-pointer">Biweekly</Label></div>
        </RadioGroup>
      </Field>

      <SectionTitle>Services Needed</SectionTitle>
      <div className="space-y-2">
        {[
          ["needsMerchandising", "In-Store Merchandising"],
          ["needsRackSetup", "Rack Setup"],
          ["needsFixtures", "Distributor-Provided Fixtures"],
        ].map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <Checkbox data-testid={`checkbox-${key}`} id={key} checked={form[key as keyof FormData] as boolean} onCheckedChange={v => set(key as keyof FormData, !!v)} />
            <Label htmlFor={key} className="text-sm cursor-pointer">{label}</Label>
          </div>
        ))}
      </div>

      <SectionTitle>Unsold Inventory Resale Program</SectionTitle>
      <p className="text-sm text-muted-foreground -mt-2 mb-2">Optional program to liquidate unsold inventory on Amazon/eBay. One-time $250 setup fee.</p>
      <RadioGroup value={form.interestedInResaleProgram} onValueChange={v => set("interestedInResaleProgram", v)} className="flex gap-4">
        <div className="flex items-center gap-1.5"><RadioGroupItem data-testid="radio-resale-yes" value="yes" id="resale-yes" /><Label htmlFor="resale-yes" className="cursor-pointer">Yes</Label></div>
        <div className="flex items-center gap-1.5"><RadioGroupItem data-testid="radio-resale-no" value="no" id="resale-no" /><Label htmlFor="resale-no" className="cursor-pointer">No</Label></div>
        <div className="flex items-center gap-1.5"><RadioGroupItem data-testid="radio-resale-later" value="decide_later" id="resale-later" /><Label htmlFor="resale-later" className="cursor-pointer">Decide Later</Label></div>
      </RadioGroup>
    </div>
  );

  // ── Step 5: Review & Submit ─────────────────────────────────────
  const Step5 = () => (
    <div className="space-y-4">
      <SectionTitle>Magazine Category Interests</SectionTitle>
      <div className="flex flex-wrap gap-3">
        {["Fashion", "Music", "Lifestyle", "Culture", "Sports", "News", "Health & Wellness", "Business", "Other"].map(cat => (
          <div key={cat} className="flex items-center gap-1.5">
            <Checkbox data-testid={`checkbox-category-${cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`} id={`cat-${cat}`} checked={form.magazineCategoryInterests.includes(cat)} onCheckedChange={() => toggleArray("magazineCategoryInterests", cat)} />
            <Label htmlFor={`cat-${cat}`} className="text-sm cursor-pointer">{cat}</Label>
          </div>
        ))}
      </div>

      <Row>
        <Field label="How did you hear about us?">
          <Select value={form.howHeardAboutUs} onValueChange={v => set("howHeardAboutUs", v)}>
            <SelectTrigger data-testid="select-how-heard"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="online_search">Online Search</SelectItem>
              <SelectItem value="social_media">Social Media</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="trade_show">Trade Show</SelectItem>
              <SelectItem value="sales_rep">Sales Rep</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Preferred Contact Method">
          <RadioGroup value={form.preferredContactMethod} onValueChange={v => set("preferredContactMethod", v)} className="flex gap-4 mt-1">
            <div className="flex items-center gap-1.5"><RadioGroupItem data-testid="radio-contact-email" value="email" id="contact-email" /><Label htmlFor="contact-email" className="cursor-pointer">Email</Label></div>
            <div className="flex items-center gap-1.5"><RadioGroupItem data-testid="radio-contact-phone" value="phone" id="contact-phone" /><Label htmlFor="contact-phone" className="cursor-pointer">Phone</Label></div>
          </RadioGroup>
        </Field>
      </Row>

      <SectionTitle>Review Your Application</SectionTitle>
      <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm">
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {[
            ["Business Name", form.legalBusinessName],
            ["DBA", form.dba],
            ["EIN", form.ein],
            ["Store Type", form.storeType],
            ["Ownership", form.ownershipStructure],
            ["Locations", form.numberOfLocations],
            ["Address", [form.physicalStreet, form.physicalCity, form.physicalState, form.physicalZip].filter(Boolean).join(", ")],
            ["Store Manager", form.storeManagerName],
            ["Delivery Frequency", form.deliveryFrequency],
            ["Resale Program", form.interestedInResaleProgram],
          ].filter(([, v]) => v).map(([label, value]) => (
            <div key={label as string}>
              <span className="font-semibold text-muted-foreground">{label}: </span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const stepContent = [<Step1 />, <Step2 />, <Step3 />, <Step4 />, <Step5 />];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Nav */}
      <nav className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto border-b border-border/40">
        <a href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center overflow-hidden">
            <img src={logo} alt="ICONIC Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-heading font-bold text-xl tracking-wide">ICONIC</span>
        </a>
        <span className="text-sm text-muted-foreground">Wholesale Account Application</span>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-heading font-bold mb-1">Apply for a Wholesale Account</h1>
          <p className="text-muted-foreground">Step {step} of {STEPS.length} — {STEPS[step - 1]}</p>
        </div>

        <Progress />

        <Card className="shadow-sm border-border/60">
          <CardContent className="pt-6 pb-8 px-6">
            {stepContent[step - 1]}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={back} disabled={step === 1} data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {step < STEPS.length ? (
            <Button onClick={next} data-testid="button-next">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={submit} disabled={submitting} data-testid="button-submit">
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
