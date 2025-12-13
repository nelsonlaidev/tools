'use client'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { FileIcon } from 'lucide-react'
import pkg from 'package.json'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

import Container from '@/components/container'
import Title from '@/components/title'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { getExtension } from '@/lib/get-extension'

const PDFViewer = () => {
  const isMounted = useIsMounted()
  const [url, setUrl] = useState('')
  const onDrop = (files: File[]) => {
    setUrl(URL.createObjectURL(files[0]!))
  }
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': []
    },
    onDropRejected: (files) => {
      for (const file of files) {
        toast.error(`${getExtension(file.file.name)} format not supported`)
      }
    }
  })

  return (
    <Container className='flex max-w-5xl flex-col items-center justify-center'>
      <Title title='PDF Viewer' />

      <div className='my-12 w-full'>
        <div
          {...getRootProps()}
          className='my-12 flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 transition-colors duration-300 hover:bg-muted'
        >
          <FileIcon size={48} />
          <input {...getInputProps()} />
          <p>Drag and drop PDF here, or click to select a file</p>
        </div>

        {isMounted && url && (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pkg.dependencies['pdfjs-dist']}/build/pdf.worker.min.js`}>
            <div className='my-20 h-[1000px]'>
              <Viewer fileUrl={url} theme={'dark'} plugins={[defaultLayoutPluginInstance]} />
            </div>
          </Worker>
        )}
      </div>
    </Container>
  )
}

export default PDFViewer
