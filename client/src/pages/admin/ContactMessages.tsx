import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ContactMessage } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Search, Mail, MailOpen, MessageSquare, Inbox } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ADMIN_KEY = "iconic-admin";

async function fetchMessages(): Promise<ContactMessage[]> {
  const res = await fetch(`/api/contact?adminKey=${ADMIN_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

async function markRead(id: number) {
  const res = await fetch(`/api/contact/${id}/read?adminKey=${ADMIN_KEY}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to mark as read");
  return res.json();
}

export default function ContactMessages() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["contact-messages"],
    queryFn: fetchMessages,
  });

  const readMutation = useMutation({
    mutationFn: (id: number) => markRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact-messages"] }),
    onError: () => toast({ title: "Failed to update", variant: "destructive" }),
  });

  const openMessage = (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.read) readMutation.mutate(msg.id);
  };

  const filtered = messages.filter(m =>
    `${m.firstName} ${m.lastName} ${m.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const unread = messages.filter(m => !m.read).length;

  const stats = [
    { label: "Total", value: messages.length, icon: Inbox, color: "text-blue-600 bg-blue-50" },
    { label: "Unread", value: unread, icon: Mail, color: "text-yellow-600 bg-yellow-50" },
    { label: "Read", value: messages.length - unread, icon: MailOpen, color: "text-green-600 bg-green-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">Contact Messages</h2>
        <p className="text-muted-foreground mt-1">Messages submitted through the public contact form.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="shadow-sm" data-testid={`stat-messages-${label.toLowerCase()}`}>
            <CardContent className="pt-4 pb-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            data-testid="input-search-messages"
            placeholder="Search by name or email..."
            className="pl-9 bg-background"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card className="shadow-sm border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-8"></TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Loading...</TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">No messages found.</TableCell>
                </TableRow>
              ) : filtered.map(msg => (
                <TableRow
                  key={msg.id}
                  data-testid={`row-message-${msg.id}`}
                  className={`hover:bg-muted/30 transition-colors cursor-pointer ${!msg.read ? "font-medium" : ""}`}
                  onClick={() => openMessage(msg)}
                >
                  <TableCell>
                    {!msg.read
                      ? <Mail className="w-4 h-4 text-primary" />
                      : <MailOpen className="w-4 h-4 text-muted-foreground" />}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell>{msg.firstName} {msg.lastName}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{msg.email}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-xs truncate">{msg.question}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      data-testid={`button-view-message-${msg.id}`}
                      onClick={e => { e.stopPropagation(); openMessage(msg); }}
                      className="gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={open => { if (!open) setSelected(null); }}>
        <SheetContent className="w-full sm:max-w-md">
          {selected && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-2">
                  <SheetTitle className="font-heading text-xl">{selected.firstName} {selected.lastName}</SheetTitle>
                  {!selected.read && <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Unread</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{selected.email}</p>
                <p className="text-xs text-muted-foreground">
                  {selected.createdAt ? new Date(selected.createdAt).toLocaleString() : ""}
                </p>
              </SheetHeader>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Question</p>
                <div className="bg-muted/40 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap border border-border">
                  {selected.question}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
