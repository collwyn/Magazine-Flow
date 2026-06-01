import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", question: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const set = (field: keyof typeof form, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => { const n = { ...e }; delete n[field]; return n; });
  };

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.question.trim()) e.question = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setTimeout(() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", question: "" }); setErrors({}); }, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg">Message Sent</h3>
              <p className="text-muted-foreground text-sm">We received your message and will be in touch soon.</p>
            </div>
            <Button variant="outline" onClick={() => handleClose(false)}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">Contact Us</DialogTitle>
              <DialogDescription>Send us a message and we'll get back to you.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-first-name">First Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="contact-first-name"
                    data-testid="input-contact-first-name"
                    value={form.firstName}
                    onChange={e => set("firstName", e.target.value)}
                    placeholder="Jane"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-last-name">Last Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="contact-last-name"
                    data-testid="input-contact-last-name"
                    value={form.lastName}
                    onChange={e => set("lastName", e.target.value)}
                    placeholder="Smith"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-email">Email Address <span className="text-red-500">*</span></Label>
                <Input
                  id="contact-email"
                  data-testid="input-contact-email"
                  type="email"
                  value={form.email}
                  onChange={e => set("email", e.target.value)}
                  placeholder="jane@yourstore.com"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-question">Question <span className="text-red-500">*</span></Label>
                <Textarea
                  id="contact-question"
                  data-testid="textarea-contact-question"
                  value={form.question}
                  onChange={e => set("question", e.target.value)}
                  placeholder="What would you like to know?"
                  className="h-32 resize-none"
                />
                {errors.question && <p className="text-red-500 text-xs">{errors.question}</p>}
              </div>

              <Button
                className="w-full"
                data-testid="button-contact-submit"
                onClick={submit}
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
