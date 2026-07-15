"use client";

import { X, Mail, Save } from "lucide-react";

type CampaignForm = {
  title: string;
  subject: string;
  previewText: string;
  type: string;
  content: string;
};

type CampaignDrawerProps = {
  open: boolean;
  onClose: () => void;
  form: CampaignForm;
  onChange: (field: keyof CampaignForm, value: string) => void;
  onSave: () => void;
  onSend: () => void;
};

export default function CampaignDrawer({
  open,
  onClose,
  form,
  onChange,
  onSave,
  onSend,
}: CampaignDrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-8 py-6">
          <div>
            <h2 className="text-2xl font-black">
              {form.title ? "Edit Campaign" : "Create Campaign"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create newsletters and announcements.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-8">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Campaign Name
            </label>

            <input
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="w-full rounded-xl border p-3"
              placeholder="July Newsletter"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email Subject
            </label>

            <input
              value={form.subject}
              onChange={(e) => onChange("subject", e.target.value)}
              className="w-full rounded-xl border p-3"
              placeholder="Introducing Our New Services"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Preview Text
            </label>

            <input
              value={form.previewText}
              onChange={(e) => onChange("previewText", e.target.value)}
              className="w-full rounded-xl border p-3"
              placeholder="This text appears in Gmail preview..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Campaign Type
            </label>

            <select
              value={form.type}
              onChange={(e) => onChange("type", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="newsletter">Newsletter</option>
              <option value="announcement">Announcement</option>
              <option value="festival">Festival</option>
              <option value="job">Job Opening</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Content</label>

            <textarea
              value={form.content}
              onChange={(e) => onChange("content", e.target.value)}
              rows={12}
              className="w-full rounded-xl border p-4"
              placeholder="Write your campaign..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white px-8 py-5">
          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-3 font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-2 rounded-xl bg-[#0b7466] px-5 py-3 font-bold text-white"
          >
            <Save size={18} />
            Save Draft
          </button>

          <button
            onClick={onSend}
            className="flex items-center gap-2 rounded-xl bg-[#d6ae45] px-5 py-3 font-bold text-[#062c27]"
          >
            <Mail size={18} />
            Send
          </button>
        </div>
      </div>
    </>
  );
}
