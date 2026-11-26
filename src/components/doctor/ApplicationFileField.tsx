import type { ChangeEvent } from "react"
import { FileText, Upload } from "lucide-react"
import type { ApplicationFileFieldProps } from "../../types/interface/doctorInterface/DoctorApplication.interface"

const ApplicationFileField = ({ config, file, error, onPick }: ApplicationFileFieldProps) => {
  // UI only: keeps the file name, nothing is uploaded
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0]
    if (picked) onPick(config.key, picked)
    e.target.value = "" // lets the same file be picked again
  }

  return (
    <div className={`flex flex-col gap-3 rounded-xl border p-4 ${error ? "border-red-300 bg-red-50/40" : "border-doctor-border"}`}>
      <div>
        <p className="font-semibold text-doctor-navy">
          {config.title}
          {config.required ? (
            <span className="text-red-500">*</span>
          ) : (
            <span className="text-xs font-normal text-doctor-muted"> (optional)</span>
          )}
        </p>
        <p className="text-xs text-doctor-muted">{config.hint}</p>
      </div>

      {file.fileName ? (
        <div className="flex items-center gap-2 rounded-xl bg-doctor-bg p-3 text-sm">
          <FileText size={18} className="shrink-0 text-doctor-primary-dark" />
          <span className="truncate font-medium text-doctor-navy">{file.fileName}</span>
          <span className="ml-auto shrink-0 text-xs text-doctor-muted">{file.uploadedOn}</span>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-doctor-border p-3 text-center text-sm text-doctor-muted">No file yet</p>
      )}

      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-doctor-primary px-4 py-2 text-sm font-semibold text-doctor-primary-dark hover:bg-doctor-bg-soft">
        <Upload size={16} /> {file.fileName ? "Replace file" : "Upload file"}
        <input type="file" accept=".pdf,image/*" onChange={handleFile} className="sr-only" />
      </label>
    </div>
  )
}

export default ApplicationFileField