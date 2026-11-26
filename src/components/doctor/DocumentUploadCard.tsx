import type { ChangeEvent } from "react"
import { FileText, Upload } from "lucide-react"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { documentStatusStyles } from "../../constants/doctorConstants/doctorVerification.constants"
import type { DocumentUploadCardProps } from "../../types/interface/doctorInterface/DoctorVerification.interface"

const DocumentUploadCard = ({ document, disabled, onUpload }: DocumentUploadCardProps) => {
  const style = documentStatusStyles[document.status]

  // UI only: keeps the file name, nothing is uploaded
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onUpload(document.id, file)
    e.target.value = "" // lets the same file be picked again
  }

  return (
    <article className={`${doctorCardClass} flex flex-col gap-3 ${document.status === "rejected" ? "border-red-200" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-doctor-navy">
            {document.title}
            {document.required && <span className="text-red-500">*</span>}
          </p>
          <p className="text-xs text-doctor-muted">{document.hint}</p>
        </div>
        <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>{style.label}</span>
      </div>

      {document.fileName ? (
        <div className="flex items-center gap-2 rounded-xl bg-doctor-bg p-3 text-sm">
          <FileText size={18} className="shrink-0 text-doctor-primary-dark" />
          <span className="truncate font-medium text-doctor-navy">{document.fileName}</span>
          <span className="ml-auto shrink-0 text-xs text-doctor-muted">{document.uploadedOn}</span>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-doctor-border p-3 text-center text-sm text-doctor-muted">No file yet</p>
      )}

      {document.status === "rejected" && document.remark && (
        <p className="text-sm font-semibold text-red-600">{document.remark}</p>
      )}

      <label
        className={`flex w-fit items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold ${
          disabled
            ? "cursor-not-allowed border-doctor-border text-doctor-muted opacity-60"
            : "cursor-pointer border-doctor-primary text-doctor-primary-dark hover:bg-doctor-bg-soft"
        }`}
      >
        <Upload size={16} /> {document.fileName ? "Replace file" : "Upload file"}
        <input type="file" accept=".pdf,image/*" onChange={handleFile} disabled={disabled} className="sr-only" />
      </label>
    </article>
  )
}

export default DocumentUploadCard