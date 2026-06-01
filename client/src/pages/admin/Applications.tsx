import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { RetailerApplication } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Search, Eye, ClipboardList, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ADMIN_KEY = "iconic-admin";

async function fetchApplications(): Promise<RetailerApplication[]> {
  const res = await fetch(`/api/applications?adminKey=${ADMIN_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch applications");
  return res.json();
}

async function patchApplication(id: number, data: { status?: string; adminNotes?: string }) {
  const res = await fetch(`/api/applications/${id}?adminKey=${ADMIN_KEY}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update application");
  return res.json();
}

function statusBadge(status: string) {
  if (status === "approved") return <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">Approved</Badge>;
  if (status === "rejected") return <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">Rejected</Badge>;
  return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100">Pending</Badge>;
}

function DetailRow({ label, value }: { label: string; value?: string | number | boolean | null }) {
  if (!value && value !== 0 && value !== false) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="text-sm text-foreground">{String(value)}</span>
    </div>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return <h4 className="font-heading font-bold text-sm text-foreground border-b pb-1 mb-3 mt-5 first:mt-0">{children}</h4>;
}

export default function Applications() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<RetailerApplication | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery<RetailerApplication[]>({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { status?: string; adminNotes?: string } }) =>
      patchApplication(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast({ title: "Application updated" });
    },
    onError: () => {
      toast({ title: "Update failed", variant: "destructive" });
    },
  });

  const openSheet = (app: RetailerApplication) => {
    setSelected(app);
    setEditStatus(app.status ?? "pending");
    setEditNotes(app.adminNotes ?? "");
  };

  const filtered = applications.filter(a => {
    const matchSearch = a.legalBusinessName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    approved: applications.filter(a => a.status === "approved").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

  const stats = [
    { label: "Total", value: counts.total, icon: ClipboardList, color: "text-blue-600 bg-blue-50" },
    { label: "Pending", value: counts.pending, icon: Clock, color: "text-yellow-600 bg-yellow-50" },
    { label: "Approved", value: counts.approved, icon: CheckCircle, color: "text-green-600 bg-green-50" },
    { label: "Rejected", value: counts.rejected, icon: XCircle, color: "text-red-600 bg-red-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">Applications</h2>
        <p className="text-muted-foreground mt-1">Review and manage retailer account applications.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="shadow-sm" data-testid={`stat-${label.toLowerCase()}`}>
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

      {/* Search + Filter */}
      <div className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            data-testid="input-search-applications"
            placeholder="Search by business name..."
            className="pl-9 bg-background"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40" data-testid="select-filter-status">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="shadow-sm border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Submitted</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Store Type</TableHead>
                <TableHead>City / State</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">No applications found.</TableCell>
                </TableRow>
              ) : filtered.map(app => (
                <TableRow key={app.id} data-testid={`row-application-${app.id}`} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="text-sm text-muted-foreground">
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell className="font-medium">{app.legalBusinessName}</TableCell>
                  <TableCell className="capitalize text-muted-foreground">{app.storeType}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {[app.physicalCity, app.physicalState].filter(Boolean).join(", ")}
                  </TableCell>
                  <TableCell>{statusBadge(app.status ?? "pending")}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      data-testid={`button-review-${app.id}`}
                      onClick={() => openSheet(app)}
                      className="gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Slide-over Sheet */}
      <Sheet open={!!selected} onOpenChange={open => { if (!open) setSelected(null); }}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selected && (
            <>
              <SheetHeader className="mb-4">
                <SheetTitle className="font-heading text-xl">{selected.legalBusinessName}</SheetTitle>
                <p className="text-sm text-muted-foreground">
                  Submitted {selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : "—"}
                </p>
              </SheetHeader>

              {/* Admin Controls */}
              <div className="bg-muted/40 rounded-lg p-4 space-y-3 mb-4 border border-border">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Status</Label>
                    <Select value={editStatus} onValueChange={setEditStatus}>
                      <SelectTrigger data-testid="select-edit-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      className="w-full"
                      data-testid="button-save-application"
                      disabled={mutation.isPending}
                      onClick={() => {
                        if (!selected) return;
                        mutation.mutate({ id: selected.id, data: { status: editStatus, adminNotes: editNotes } });
                      }}
                    >
                      {mutation.isPending ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Admin Notes</Label>
                  <Textarea
                    data-testid="textarea-admin-notes"
                    value={editNotes}
                    onChange={e => setEditNotes(e.target.value)}
                    placeholder="Internal notes..."
                    className="h-20 resize-none text-sm bg-background"
                  />
                </div>
              </div>

              {/* Application Details */}
              <div className="space-y-1 text-sm">
                <SectionHead>Business Information</SectionHead>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <DetailRow label="Legal Name" value={selected.legalBusinessName} />
                  <DetailRow label="DBA" value={selected.dba} />
                  <DetailRow label="EIN" value={selected.ein} />
                  <DetailRow label="Resale Cert" value={selected.resaleCertNumber} />
                  <DetailRow label="Ownership" value={selected.ownershipStructure} />
                  <DetailRow label="Store Type" value={selected.storeType === "other" ? `Other: ${selected.storeTypeOther}` : selected.storeType} />
                  <DetailRow label="Locations" value={selected.numberOfLocations} />
                  <DetailRow label="Foot Traffic" value={selected.footTrafficEstimate} />
                </div>

                <SectionHead>Address</SectionHead>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <div className="col-span-2">
                    <DetailRow label="Physical Address" value={[selected.physicalStreet, selected.physicalCity, selected.physicalState, selected.physicalZip].filter(Boolean).join(", ")} />
                  </div>
                  {selected.mailingStreet && (
                    <div className="col-span-2">
                      <DetailRow label="Mailing Address" value={[selected.mailingStreet, selected.mailingCity, selected.mailingState, selected.mailingZip].filter(Boolean).join(", ")} />
                    </div>
                  )}
                </div>

                <SectionHead>Contacts</SectionHead>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <DetailRow label="Store Manager" value={[selected.storeManagerName, selected.storeManagerPhone, selected.storeManagerEmail].filter(Boolean).join(" · ")} />
                  <DetailRow label="Receiving Manager" value={[selected.receivingManagerName, selected.receivingManagerPhone, selected.receivingManagerEmail].filter(Boolean).join(" · ")} />
                  <DetailRow label="AP Contact" value={[selected.apContactName, selected.apContactPhone, selected.apContactEmail].filter(Boolean).join(" · ")} />
                </div>

                <SectionHead>Delivery & Services</SectionHead>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <DetailRow label="Delivery Access" value={(selected.deliveryAccess ?? []).join(", ")} />
                  <DetailRow label="Frequency" value={selected.deliveryFrequency} />
                  <DetailRow label="Signee" value={selected.deliverySignee} />
                  <DetailRow label="Existing Route" value={selected.existingRoute != null ? (selected.existingRoute ? `Yes — ${selected.existingRouteDetails ?? ""}` : "No") : undefined} />
                  <DetailRow label="Restrictions" value={selected.deliveryRestrictions} />
                  <DetailRow label="Merchandising" value={selected.needsMerchandising ? "Yes" : undefined} />
                  <DetailRow label="Rack Setup" value={selected.needsRackSetup ? "Yes" : undefined} />
                  <DetailRow label="Fixtures" value={selected.needsFixtures ? "Yes" : undefined} />
                  <DetailRow label="Resale Program" value={selected.interestedInResaleProgram} />
                </div>

                <SectionHead>Preferences</SectionHead>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <DetailRow label="Category Interests" value={(selected.magazineCategoryInterests ?? []).join(", ")} />
                  <DetailRow label="How Heard" value={selected.howHeardAboutUs} />
                  <DetailRow label="Preferred Contact" value={selected.preferredContactMethod} />
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
