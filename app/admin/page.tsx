"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Inbox,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Menu,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AdminApiError, adminRequest } from "@/lib/admin-api";
import CampaignDrawer from "@/app/admin/CampaignDrawer";

type ContactStatus = "new" | "in-progress" | "resolved";
type AdminView = "overview" | "contacts" | "subscribers" | "campaigns";

type CampaignType = "newsletter" | "announcement" | "festival" | "job";

type Campaign = {
  id: number;
  title: string;
  subject: string;
  previewText: string | null;
  type: CampaignType;
  content: string;
  status: string;
  recipientCount: number;
  sentAt: string | null;
  createdAt: string;
};

type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
};

type Subscriber = {
  id: number;
  email: string;
  isSubscribed: boolean;
  createdAt: string;
};

type Dashboard = {
  totalContacts: number;
  newContacts: number;
  resolvedContacts: number;
  totalSubscribers: number;
  activeSubscribers: number;
  recentContacts: Contact[];
};

type CampaignsViewProps = {
  campaigns: Campaign[];
  loadCampaigns: () => void;
  onCreateCampaign: () => void;
  onDelete: (id: number) => void;
};

const statusStyles: Record<ContactStatus, string> = {
  new: "bg-amber-50 text-amber-700 ring-amber-200",
  "in-progress": "bg-sky-50 text-sky-700 ring-sky-200",
  resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const statusLabels: Record<ContactStatus, string> = {
  new: "New",
  "in-progress": "In progress",
  resolved: "Resolved",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export default function AdminPage() {
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState<number | null>(
    null,
  );
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [activeView, setActiveView] = useState<AdminView>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [search, setSearch] = useState("");
  const [viewCampaign, setViewCampaign] = useState<Campaign | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | ContactStatus>(
    "all",
  );

  const loadCampaigns = useCallback(async () => {
    try {
      const response = await adminRequest<Campaign[]>("/campaigns");

      setCampaigns(response.data ?? []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [campaignForm, setCampaignForm] = useState({
    title: "",
    subject: "",
    previewText: "",
    type: "newsletter",
    content: "",
  });
  const saveCampaign = async () => {
    console.log(campaignForm);

    try {
      let response;

      if (editingCampaignId) {
        // Update Existing Campaign
        response = await adminRequest(`/campaigns/${editingCampaignId}`, {
          method: "PATCH",
          body: JSON.stringify(campaignForm),
        });
      } else {
        // Create New Campaign
        response = await adminRequest("/campaigns", {
          method: "POST",
          body: JSON.stringify(campaignForm),
        });
      }

      if (!response.success) {
        throw new Error("Unable to save campaign.");
      }

      toast.success(
        editingCampaignId
          ? "Campaign updated successfully."
          : "Campaign created successfully.",
      );

      setCampaignOpen(false);

      setEditingCampaignId(null);

      setCampaignForm({
        title: "",
        subject: "",
        previewText: "",
        type: "newsletter",
        content: "",
      });

      await loadCampaigns();
    } catch (error) {
      console.error(error);

      toast.success(
        editingCampaignId
          ? "Unable to update campaign."
          : "Unable to save campaign.",
      );
    }
  };

  const deleteCampaign = async (id: number) => {
    if (!confirm("Delete this campaign?")) return;

    try {
      await adminRequest(`/campaigns/${id}`, {
        method: "DELETE",
      });

      await loadCampaigns();
    } catch (error) {
      console.error(error);
      toast.success("Unable to delete campaign.");
    }
  };

  const editCampaign = (campaign: Campaign) => {
    setEditingCampaignId(campaign.id);

    setCampaignForm({
      title: campaign.title,
      subject: campaign.subject,
      previewText: campaign.previewText,
      type: campaign.type,
      content: campaign.content,
    });

    setCampaignOpen(true);
  };

  const sendCampaign = async () => {
    if (!editingCampaignId) {
      toast.success("Please save the campaign before sending.");
      return;
    }

    const confirmSend = window.confirm(
      "Send this campaign to all active subscribers?",
    );

    if (!confirmSend) return;

    try {
      const response = await adminRequest(
        `/campaigns/${editingCampaignId}/send`,
        {
          method: "POST",
        },
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);

      setCampaignOpen(false);

      setEditingCampaignId(null);

      await loadCampaigns();
    } catch (error) {
      console.error(error);

      toast.success("Unable to send campaign.");
    }
  };

  const updateCampaignForm = (
    field: keyof typeof campaignForm,
    value: string,
  ) => {
    setCampaignForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const signOut = useCallback(async (showMessage = true) => {
    try {
      await adminRequest<never>("/logout", { method: "POST" });
    } catch {
      // Clear the local UI even when the server session already expired.
    }

    setAuthenticated(false);
    setAdminEmail("");
    setDashboard(null);
    setContacts([]);
    setSubscribers([]);

    if (showMessage) toast.success("Signed out successfully.");
  }, []);

  const handleApiError = useCallback(
    (error: unknown) => {
      if (error instanceof AdminApiError && error.status === 401) {
        void signOut(false);
        toast.error("Your session expired. Please sign in again.");
        return;
      }

      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    },
    [signOut],
  );

  const loadAdminData = useCallback(async () => {
    setLoadingData(true);

    try {
      const [
        dashboardResponse,
        contactsResponse,
        subscribersResponse,
        campaignsResponse,
      ] = await Promise.all([
        adminRequest<Dashboard>("/dashboard"),
        adminRequest<Contact[]>("/contacts"),
        adminRequest<Subscriber[]>("/subscribers"),
        adminRequest<Campaign[]>("/campaigns"),
      ]);

      setDashboard(dashboardResponse.data ?? null);
      setContacts(contactsResponse.data ?? []);
      setSubscribers(subscribersResponse.data ?? []);
      setCampaigns(campaignsResponse.data ?? []);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoadingData(false);
    }
  }, [handleApiError]);

  useEffect(() => {
    if (authenticated) {
      loadAdminData();
    }
  }, [authenticated, loadAdminData]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await adminRequest<never>("/session");
        setAdminEmail(result.admin?.email ?? "");
        setAuthenticated(true);
        await loadAdminData();
      } catch {
        setAuthenticated(false);
      } finally {
        setCheckingSession(false);
      }
    };

    void checkSession();
  }, [loadAdminData]);

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return contacts.filter((contact) => {
      const matchesStatus =
        statusFilter === "all" || contact.status === statusFilter;
      const matchesSearch =
        !query ||
        `${contact.firstName} ${contact.lastName}`
          .toLowerCase()
          .includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [contacts, search, statusFilter]);

  const filteredSubscribers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return subscribers.filter((subscriber) =>
      subscriber.email.toLowerCase().includes(query),
    );
  }, [search, subscribers]);

  const updateContactStatus = async (id: number, status: ContactStatus) => {
    try {
      const result = await adminRequest<Contact>(`/contacts/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      if (result.data) {
        setContacts((current) =>
          current.map((contact) =>
            contact.id === id ? result.data! : contact,
          ),
        );
      }

      await loadAdminData();
      toast.success("Enquiry status updated.");
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteContact = async (contact: Contact) => {
    const confirmed = window.confirm(
      `Delete the enquiry from ${contact.firstName} ${contact.lastName}?`,
    );

    if (!confirmed) return;

    try {
      await adminRequest<never>(`/contacts/${contact.id}`, {
        method: "DELETE",
      });
      setContacts((current) =>
        current.filter((item) => item.id !== contact.id),
      );
      await loadAdminData();
      toast.success("Enquiry deleted.");
    } catch (error) {
      handleApiError(error);
    }
  };

  const toggleSubscriber = async (subscriber: Subscriber) => {
    try {
      const result = await adminRequest<Subscriber>(
        `/subscribers/${subscriber.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            isSubscribed: !subscriber.isSubscribed,
          }),
        },
      );

      if (result.data) {
        setSubscribers((current) =>
          current.map((item) =>
            item.id === subscriber.id ? result.data! : item,
          ),
        );
      }

      await loadAdminData();
      toast.success("Subscriber updated.");
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteSubscriber = async (subscriber: Subscriber) => {
    if (!window.confirm(`Delete subscriber ${subscriber.email}?`)) return;

    try {
      await adminRequest<never>(`/subscribers/${subscriber.id}`, {
        method: "DELETE",
      });
      setSubscribers((current) =>
        current.filter((item) => item.id !== subscriber.id),
      );
      await loadAdminData();
      toast.success("Subscriber deleted.");
    } catch (error) {
      handleApiError(error);
    }
  };

  if (checkingSession) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f7f6]">
        <div className="flex items-center gap-3 text-[#07584d]">
          <Loader2 className="animate-spin" />
          <span className="font-semibold">Checking admin session…</span>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <LoginScreen
        onSignedIn={(email) => {
          setAdminEmail(email);
          setAuthenticated(true);
          void loadAdminData();
        }}
      />
    );
  }

  const navigate = (view: AdminView) => {
    setActiveView(view);
    setSearch("");
    setMobileMenuOpen(false);
  };

  const navItems = [
    {
      id: "overview" as const,
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "contacts" as const,
      label: "Enquiries",
      icon: Inbox,
    },
    {
      id: "subscribers" as const,
      label: "Subscribers",
      icon: UsersRound,
    },
    {
      id: "campaigns" as const,
      label: "Campaigns",
      icon: Mail,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f4f7f6] text-slate-900">
      {viewCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Campaign Details</h2>

              <button
                onClick={() => setViewCampaign(null)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-slate-500">Campaign Name</p>
                <h3 className="text-xl font-semibold">{viewCampaign.title}</h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">Subject</p>
                <p>{viewCampaign.subject}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Preview Text</p>
                <p>{viewCampaign.previewText}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Type</p>
                <p>{viewCampaign.type}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Status</p>
                <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                  {viewCampaign.status}
                </span>
              </div>

              <div>
                <p className="text-sm text-slate-500">Content</p>

                <div className="mt-2 rounded-lg border bg-slate-50 p-4 whitespace-pre-wrap">
                  {viewCampaign.content}
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500">Created</p>
                <p>{new Date(viewCampaign.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#062c27] px-5 py-6 text-white transition-transform lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-1">
              <Image
                src="/Logo.png"
                alt="Savvy Group"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </div>
            <div>
              <p className="font-bold">Savvy Group</p>
              <p className="text-xs text-emerald-100/60">Admin workspace</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-12 space-y-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition ${
                activeView === id
                  ? "bg-[#d6ae45] text-[#062c27]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={19} />
              {label}
              <ChevronRight className="ml-auto" size={16} />
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <CircleUserRound className="text-[#d6ae45]" />
            <div className="min-w-0">
              <p className="text-xs text-white/50">Signed in as</p>
              <p className="truncate text-sm font-medium">{adminEmail}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-2.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <section className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 px-5 py-4 backdrop-blur-xl md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-xl border border-slate-200 p-2.5 lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation"
              >
                <Menu size={20} />
              </button>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b7466]">
                  Admin panel
                </p>
                <h1 className="text-xl font-bold capitalize md:text-2xl">
                  {activeView}
                </h1>
              </div>
            </div>

            <button
              type="button"
              disabled={loadingData}
              onClick={() => void loadAdminData()}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm transition hover:border-[#0b7466] hover:text-[#0b7466] disabled:opacity-50 md:px-4"
            >
              <RefreshCw
                size={16}
                className={loadingData ? "animate-spin" : ""}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </header>

        <div className="p-5 md:p-8">
          {activeView === "overview" && (
            <Overview
              dashboard={dashboard}
              loading={loadingData}
              onViewContacts={() => navigate("contacts")}
            />
          )}

          {activeView === "contacts" && (
            <ContactsView
              contacts={filteredContacts}
              search={search}
              statusFilter={statusFilter}
              onSearch={setSearch}
              onFilter={setStatusFilter}
              onStatusChange={updateContactStatus}
              onDelete={deleteContact}
            />
          )}

          {activeView === "subscribers" && (
            <SubscribersView
              subscribers={filteredSubscribers}
              search={search}
              onSearch={setSearch}
              onToggle={toggleSubscriber}
              onDelete={deleteSubscriber}
            />
          )}
          {activeView === "campaigns" && (
            <CampaignsView
              campaigns={campaigns}
              onCreateCampaign={() => {
                setEditingCampaignId(null);

                setCampaignForm({
                  title: "",
                  subject: "",
                  previewText: "",
                  type: "newsletter",
                  content: "",
                });

                setCampaignOpen(true);
              }}
              onViewCampaign={setViewCampaign}
              onDelete={deleteCampaign}
              onEdit={editCampaign}
            />
          )}

          <CampaignDrawer
            open={campaignOpen}
            onClose={() => setCampaignOpen(false)}
            form={campaignForm}
            onChange={updateCampaignForm}
            onSave={saveCampaign}
            onSend={sendCampaign}
          />
        </div>
      </section>
    </main>
  );
}

function LoginScreen({ onSignedIn }: { onSignedIn: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await adminRequest<never>("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      onSignedIn(result.admin?.email ?? email);
      toast.success(result.message || "Welcome back.");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to sign in.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-[#062c27] px-5 py-10 lg:grid-cols-2 lg:p-0">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <section className="relative hidden flex-col justify-between overflow-hidden p-16 lg:flex">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white p-2">
            <Image src="/Logo.png" alt="Savvy Group" width={60} height={60} />
          </div>
          <div className="text-white">
            <p className="text-xl font-bold">Savvy Group</p>
            <p className="text-sm text-white/50">Administration</p>
          </div>
        </div>

        <div className="max-w-xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#d6ae45]">
            Private workspace
          </p>
          <h1 className="text-6xl font-black leading-[1.05] text-white">
            Your website,
            <span className="block text-emerald-300">under control.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-white/60">
            Review new enquiries, keep conversations moving, and manage your
            audience from one focused dashboard.
          </p>
        </div>

        <p className="text-sm text-white/40">
          Protected by a signed, secure admin session.
        </p>
      </section>

      <section className="relative z-10 flex items-center justify-center rounded-[2rem] bg-[#f4f7f6] p-6 shadow-2xl lg:rounded-l-[3rem] lg:rounded-r-none lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <Image src="/Logo.png" alt="Savvy Group" width={52} height={52} />
            <div>
              <p className="font-bold">Savvy Group</p>
              <p className="text-xs text-slate-500">Admin workspace</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#d6ae45]/20 text-[#806116]">
              <ShieldCheck />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Welcome back</h2>
            <p className="mt-2 text-slate-500">
              Sign in with your administrator credentials.
            </p>
          </div>

          <form className="space-y-5" onSubmit={submit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Email address
              </span>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@company.com"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-[#0b7466] focus:ring-4 focus:ring-[#0b7466]/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-[#0b7466] focus:ring-4 focus:ring-[#0b7466]/10"
              />
            </label>

            {error && (
              <p
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0b6659] px-5 py-4 font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#084d44] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={19} />
              ) : (
                <ArrowUpRight size={19} />
              )}
              {loading ? "Signing in…" : "Sign in to dashboard"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function Overview({
  dashboard,
  loading,
  onViewContacts,
}: {
  dashboard: Dashboard | null;
  loading: boolean;
  onViewContacts: () => void;
}) {
  const metrics = [
    {
      label: "Total enquiries",
      value: dashboard?.totalContacts ?? 0,
      detail: `${dashboard?.newContacts ?? 0} require attention`,
      icon: Inbox,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "New enquiries",
      value: dashboard?.newContacts ?? 0,
      detail: "Not yet reviewed",
      icon: Clock3,
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Resolved",
      value: dashboard?.resolvedContacts ?? 0,
      detail: "Completed conversations",
      icon: CheckCircle2,
      color: "bg-sky-50 text-sky-700",
    },
    {
      label: "Active subscribers",
      value: dashboard?.activeSubscribers ?? 0,
      detail: `${dashboard?.totalSubscribers ?? 0} subscribers total`,
      icon: UserRoundCheck,
      color: "bg-violet-50 text-violet-700",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h2 className="text-3xl font-black">Good to see you.</h2>
        <p className="mt-2 text-slate-500">
          Here is what is happening on your website right now.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, icon: Icon, color }) => (
          <article
            key={label}
            className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm"
          >
            <div
              className={`grid h-12 w-12 place-items-center rounded-2xl ${color}`}
            >
              <Icon size={22} />
            </div>
            <p className="mt-7 text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-1 text-4xl font-black">{loading ? "—" : value}</p>
            <p className="mt-3 text-xs text-slate-400">{detail}</p>
          </article>
        ))}
      </div>

      <article className="mt-8 overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-lg font-bold">Recent enquiries</h3>
            <p className="text-sm text-slate-500">Your five latest messages</p>
          </div>
          <button
            type="button"
            onClick={onViewContacts}
            className="text-sm font-bold text-[#0b7466] hover:underline"
          >
            View all
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {dashboard?.recentContacts.length ? (
            dashboard.recentContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex flex-col gap-3 px-6 py-5 md:flex-row md:items-center"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0b7466]/10 font-bold text-[#0b7466]">
                  {contact.firstName.charAt(0)}
                  {contact.lastName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">
                    {contact.firstName} {contact.lastName}
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    {contact.message}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 md:block md:text-right">
                  <StatusBadge status={contact.status} />
                  <p className="mt-2 text-xs text-slate-400">
                    {formatDate(contact.createdAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <EmptyState message="No enquiries have arrived yet." />
          )}
        </div>
      </article>
    </div>
  );
}

function ContactsView({
  contacts,
  search,
  statusFilter,
  onSearch,
  onFilter,
  onStatusChange,
  onDelete,
}: {
  contacts: Contact[];
  search: string;
  statusFilter: "all" | ContactStatus;
  onSearch: (value: string) => void;
  onFilter: (value: "all" | ContactStatus) => void;
  onStatusChange: (id: number, status: ContactStatus) => void;
  onDelete: (contact: Contact) => void;
}) {
  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        title="Customer enquiries"
        description="Review messages and track each conversation."
      />

      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <SearchBox
          value={search}
          onChange={onSearch}
          placeholder="Search name, email, or phone…"
        />
        <select
          value={statusFilter}
          onChange={(event) =>
            onFilter(event.target.value as "all" | ContactStatus)
          }
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#0b7466]"
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="in-progress">In progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="grid gap-5">
        {contacts.length ? (
          contacts.map((contact) => (
            <article
              key={contact.id}
              className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm md:p-6"
            >
              <div className="flex flex-col gap-5 xl:flex-row">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">
                        {contact.firstName} {contact.lastName}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        Received {formatDate(contact.createdAt)}
                      </p>
                    </div>
                    <StatusBadge status={contact.status} />
                  </div>

                  <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 hover:text-[#0b7466]"
                    >
                      <Mail size={16} />
                      {contact.email}
                    </a>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 hover:text-[#0b7466]"
                    >
                      <CircleUserRound size={16} />
                      {contact.phone}
                    </a>
                  </div>

                  <p className="mt-5 rounded-2xl bg-slate-50 p-4 leading-7 text-slate-600">
                    {contact.message}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 pt-5 xl:w-48 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Update status
                  </label>
                  <select
                    value={contact.status}
                    onChange={(event) =>
                      onStatusChange(
                        contact.id,
                        event.target.value as ContactStatus,
                      )
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-[#0b7466]"
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => onDelete(contact)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-100 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <EmptyState message="No enquiries match your filters." />
        )}
      </div>
    </div>
  );
}

function SubscribersView({
  subscribers,
  search,
  onSearch,
  onToggle,
  onDelete,
}: {
  subscribers: Subscriber[];
  search: string;
  onSearch: (value: string) => void;
  onToggle: (subscriber: Subscriber) => void;
  onDelete: (subscriber: Subscriber) => void;
}) {
  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        title="Newsletter subscribers"
        description="Manage the audience receiving your company updates."
      />

      <div className="mb-6 max-w-xl">
        <SearchBox
          value={search}
          onChange={onSearch}
          placeholder="Search email address…"
        />
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm">
        <div className="hidden grid-cols-[1fr_180px_180px_100px] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 md:grid">
          <span>Email address</span>
          <span>Joined</span>
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>

        <div className="divide-y divide-slate-100">
          {subscribers.length ? (
            subscribers.map((subscriber) => (
              <div
                key={subscriber.id}
                className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_180px_180px_100px] md:items-center md:px-6"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-700">
                    <Mail size={18} />
                  </div>
                  <span className="truncate font-semibold">
                    {subscriber.email}
                  </span>
                </div>
                <span className="text-sm text-slate-500">
                  {formatDate(subscriber.createdAt)}
                </span>
                <button
                  type="button"
                  onClick={() => onToggle(subscriber)}
                  className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${
                    subscriber.isSubscribed
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                      : "bg-slate-100 text-slate-500 ring-slate-200"
                  }`}
                >
                  {subscriber.isSubscribed ? "Active" : "Unsubscribed"}
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(subscriber)}
                  aria-label={`Delete ${subscriber.email}`}
                  className="ml-auto grid h-10 w-10 place-items-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))
          ) : (
            <EmptyState message="No subscribers match your search." />
          )}
        </div>
      </div>
    </div>
  );
}

const getTypeBadge = (type: string) => {
  switch (type.toLowerCase()) {
    case "newsletter":
      return "bg-cyan-100 text-cyan-700 border border-cyan-200";

    case "announcement":
      return "bg-purple-100 text-purple-700 border border-purple-200";

    case "festival":
      return "bg-pink-100 text-pink-700 border border-pink-200";

    case "job":
      return "bg-blue-100 text-blue-700 border border-blue-200";

    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
  }
};

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "draft":
      return "bg-amber-100 text-amber-700 border border-amber-200";

    case "sent":
      return "bg-green-100 text-green-700 border border-green-200";

    case "failed":
      return "bg-red-100 text-red-700 border border-red-200";

    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
  }
};

function CampaignsView({
  campaigns,
  onCreateCampaign,
  onViewCampaign,
  onDelete,
  onEdit,
}: {
  campaigns: Campaign[];
  onCreateCampaign: () => void;
  onViewCampaign: (campaign: Campaign) => void;
  onDelete: (id: number) => void;
  onEdit: (campaign: Campaign) => void;
}) {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Toolbar */}

      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onCreateCampaign}
          className="rounded-xl bg-[#0b7466] px-6 py-3 font-semibold text-white hover:bg-[#085d52]"
        >
          + New Campaign
        </button>

        <div className="flex gap-3">
          <input
            placeholder="Search campaigns..."
            className="rounded-xl border px-4 py-3 w-72"
          />

          <select className="rounded-xl border px-4 py-3">
            <option>All Status</option>
            <option>Draft</option>
            <option>Scheduled</option>
            <option>Sent</option>
          </select>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm uppercase text-slate-500">
              <th className="px-8 py-5">Campaign</th>

              <th>Type</th>

              <th>Status</th>

              <th>Created</th>

              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-8 py-6">
                  <div className="font-semibold text-lg">{campaign.title}</div>

                  <div className="text-slate-500">{campaign.subject}</div>
                </td>

                <td>
                  <span
                    className={`rounded-full px-4 py-1 text-sm font-semibold capitalize ${getTypeBadge(
                      campaign.type,
                    )}`}
                  >
                    {campaign.type}
                  </span>
                </td>

                <td>
                  <span
                    className={`rounded-full px-4 py-1 text-sm font-semibold capitalize ${getStatusBadge(
                      campaign.status,
                    )}`}
                  >
                    {campaign.status}
                  </span>
                </td>

                <td className="text-slate-600">
                  {formatDate(campaign.createdAt)}
                </td>

                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        console.log(campaign);
                        onViewCampaign(campaign);
                      }}
                      className="rounded-lg border p-2 hover:bg-slate-100"
                    >
                      <img
                        src="/eye.svg"
                        alt="View"
                        width={20}
                        height={20}
                        className="pointer-events-none"
                      />
                    </button>

                    <button
                      onClick={() => onEdit(campaign)}
                      className="rounded-lg border p-2 hover:bg-blue-50"
                    >
                      <img
                        src="/edit.svg"
                        alt="Edit"
                        className="h-5 w-5 pointer-events-none"
                      />
                    </button>

                    <button className="rounded-lg border p-2 hover:bg-slate-100">
                      <object data="send.svg" width="20" height="20"></object>
                    </button>

                    <button
                      onClick={() => onDelete(campaign.id)}
                      className="rounded-lg border p-2 hover:bg-red-50"
                    >
                      <img src="redbin.svg" width="20" height="20"></img>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-black">{title}</h2>
      <p className="mt-2 text-slate-500">{description}</p>
    </div>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="relative block flex-1">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#0b7466] focus:ring-4 focus:ring-[#0b7466]/10"
      />
    </label>
  );
}

function StatusBadge({ status }: { status: ContactStatus }) {
  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="grid min-h-52 place-items-center rounded-3xl bg-white p-8 text-center">
      <div>
        <Inbox className="mx-auto text-slate-300" size={32} />
        <p className="mt-3 text-sm text-slate-500">{message}</p>
      </div>
    </div>
  );
}
