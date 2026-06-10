"use client";

import { useState } from "react";
import { X, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ProjectDeleteDialogProps {
  projectId: string;
  projectName: string;
  onClose: () => void;
  onDeleted: () => void;
}

export default function ProjectDeleteDialog({ projectId, projectName, onClose, onDeleted }: ProjectDeleteDialogProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects?id=${projectId}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete project");
      toast.success("Project deleted");
      onDeleted();
    } catch (err: any) {
      toast.error(err.message);
    }
    setDeleting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-card-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-error">Delete Project</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-500 hover:text-white cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-400 mb-2">
          Are you sure you want to delete <span className="font-semibold text-white">{projectName}</span>?
        </p>
        <p className="text-xs text-gray-500 mb-5">
          This will permanently delete the project and all associated content. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 rounded-lg bg-error px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500 transition disabled:opacity-50 cursor-pointer"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            {deleting ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-white transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
