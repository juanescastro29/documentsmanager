"use client"
import Documents from '@/components/Documents'
import PrivateRoute from '@/components/PrivateRoute'
import UploadFiles from '@/components/UploadFiles'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Document = () => {

  const [refresh, setRefresh] = useState(true)

  function handleRefresh() {
    setRefresh(!refresh);
  }

  return (
    <PrivateRoute>
      <div>
        <div className='flex justify-end items-center h-full font-mono'>
          <UploadFiles  handleRefresh={handleRefresh}/>
        </div>
        <motion.div layout className='flex flex-row flex-wrap gap-12 justify-center h-full w-full p-4 font-mono'>
          <Documents refresh={refresh} handleRefresh={handleRefresh}/>
        </motion.div>
      </div>
    </PrivateRoute>
  )
}

export default Document