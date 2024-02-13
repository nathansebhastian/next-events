'use client'

import { useCallback } from 'react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { FaUpload } from "react-icons/fa";
import Image from 'next/image';

export function ImageUploader({ imageUrl, onFieldChange, setFiles }) {
  const convertFileToUrl = (file) => URL.createObjectURL(file)

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/jpeg', 'image/png']),
  })

  return (
    <div
      {...getRootProps()}
      className="flex-center flex h-72 cursor-pointer flex-col overflow-hidden rounded-md bg-grey-50">
      <input {...getInputProps()} id='imageUrl' className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex">
          <Image
            src={imageUrl}
            alt="image"
            width={400}
            height={300}
            className="object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-col text-center pt-12 border-dashed border-2 border-gray-300 rounded-md h-full">
          <FaUpload size={32} className='inline'/>
          <h3 className="mb-2 mt-2">Drag Photo Here</h3>
          <p className="p-medium-12 mb-4">.png or .jpg extensions</p>
          <button type="button" className="btn btn-secondary btn-rounded btn-sm">
            Select From Computer
          </button>
        </div>
      )}
    </div>
  )
}


