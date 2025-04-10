"use client"

import { useState, useRef } from "react"
import ProgressSteps from "./progress-steps"
import { FileText, Upload, Plus } from "lucide-react"

export default function DocumentUploadPage({ onNext, updateFormData, formData }) {
  const [documents, setDocuments] = useState(formData.documents || [])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setDocuments([...documents, ...newFiles])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setDocuments([...documents, ...newFiles])
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = () => {
    updateFormData({ documents })
    onNext()
  }

  return (
    <div className="overflow-hidden rounded-lg bg-card shadow-lg">
      <div className="p-6">
        <ProgressSteps currentStep={2} />

        <div className="mb-6 flex flex-col items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mb-1 text-2xl font-bold text-primary">Document Verification</h1>
          <p className="text-center text-muted-foreground">Your documents are being verified</p>
        </div>

        <div
          className={`mb-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-input"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="mb-2 text-center text-muted-foreground">Drag and drop files here or</p>
          <button
            type="button"
            onClick={handleBrowseClick}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Browse Files
          </button>
          <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} className="hidden" />
          <p className="mt-2 text-xs text-muted-foreground">Maximum file size: 10MB</p>
        </div>

        <div className="mb-6 space-y-3">
          <DocumentItem title="Bill of Lading" />
          <DocumentItem title="Commercial Invoice" />
          <DocumentItem title="Packing List" />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-md bg-primary py-2 text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Upload Documents
        </button>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Need help?{" "}
          <a href="#" className="font-medium text-primary hover:underline">
            Contact support
          </a>
        </div>
      </div>
    </div>
  )
}

function DocumentItem({ title }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-input p-3 hover:bg-secondary/50 transition-colors">
      <div className="flex items-center">
        <FileText className="mr-2 h-5 w-5 text-primary" />
        <span className="text-foreground">{title}</span>
      </div>
      <button className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors">
        <Plus className="h-5 w-5" />
      </button>
    </div>
  )
}
