"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import ProgressSteps from "./progress-steps"
import { FileText, Upload, Plus } from "lucide-react"

export default function DocumentUploadPage({ onNext, updateFormData, formData }) {
  const router = useRouter()
  const [documents, setDocuments] = useState(formData.documents || [])
  const [dragActive, setDragActive] = useState(false)
  const [activeUploadFor, setActiveUploadFor] = useState(null)
  const [error, setError] = useState("")
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    if (file.type !== 'application/pdf') {
      setError("Only PDF files are allowed")
      return false
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB in bytes
      setError("File size should not exceed 10MB")
      return false
    }
    return true
  }

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
    setError("")

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0] // Only process the first file
      
      if (!validateFile(file)) {
        return
      }

      const newFile = {
        ...file,
        _documentType: activeUploadFor
      }
      
      // Replace existing document of the same type
      const updatedDocuments = documents.filter(doc => doc._documentType !== activeUploadFor)
      setDocuments([...updatedDocuments, newFile])
    }
  }

  const handleFileChange = (e) => {
    setError("")
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0] // Only process the first file
      
      if (!validateFile(file)) {
        e.target.value = '' // Reset input
        return
      }

      const newFile = {
        ...file,
        _documentType: activeUploadFor
      }
      
      // Replace existing document of the same type
      const updatedDocuments = documents.filter(doc => doc._documentType !== activeUploadFor)
      setDocuments([...updatedDocuments, newFile])
    }
    setActiveUploadFor(null)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = () => {
    const chlDocs = documents.filter(doc => doc._documentType === 'CHL')
    const gstDocs = documents.filter(doc => doc._documentType === 'GST')

    if (!chlDocs.length || !gstDocs.length) {
      setError("Please upload both CHL License and GST Certificate before proceeding")
      return
    }

    setError("")
    updateFormData({ documents })
    onNext()
  }

  const toggleUploadSection = (documentType) => {
    setActiveUploadFor(activeUploadFor === documentType ? null : documentType)
    setError("")
  }

  const UploadSection = () => (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
        dragActive ? "border-primary bg-primary/5" : "border-input"
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <button
        type="button"
        onClick={handleBrowseClick}
        className="flex items-center gap-2 rounded-xl border-2 border-teal-700 bg-white px-8 py-6 text-teal-700 transition-colors hover:bg-blue-50"
      >
        <Upload className="h-5 w-5" />
        Drag and drop PDF file here or browse
      </button>
      <input 
        ref={fileInputRef} 
        type="file" 
        accept=".pdf,application/pdf" 
        onChange={handleFileChange} 
        className="hidden" 
      />
      <p className="mt-2 text-xs text-muted-foreground">Accepted format: PDF only (Maximum file size: 10MB)</p>
    </div>
  )

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

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-500">
            {error}
          </div>
        )}

        <div className="mb-6 space-y-3">
          <DocumentItem 
            title="CHL License" 
            onUploadClick={() => toggleUploadSection('CHL')}
            isActive={activeUploadFor === 'CHL'}
            isUploaded={documents.some(doc => doc._documentType === 'CHL')}
          />
          {activeUploadFor === 'CHL' && (
            <div className="ml-8">
              <UploadSection />
            </div>
          )}
          
          <DocumentItem 
            title="GST Certificate" 
            onUploadClick={() => toggleUploadSection('GST')}
            isActive={activeUploadFor === 'GST'}
            isUploaded={documents.some(doc => doc._documentType === 'GST')}
          />
          {activeUploadFor === 'GST' && (
            <div className="ml-8">
              <UploadSection />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-xl border-2 border-teal-700 bg-teal-700 px-8 py-6 text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
          >
            Upload Documents
          </button>
        </div>

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

function DocumentItem({ title, onUploadClick, isActive, isUploaded }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-input p-3 hover:bg-secondary/50 transition-colors">
      <div className="flex items-center">
        <FileText className="mr-2 h-5 w-5 text-primary" />
        <span className="text-foreground">{title}</span>
        {isUploaded && (
          <span className="ml-2 text-sm text-green-500">
            (Uploaded)
          </span>
        )}
      </div>
      <button 
        onClick={onUploadClick}
        className={`rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors ${
          isActive ? 'bg-secondary text-primary' : ''
        }`}
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  )
}



