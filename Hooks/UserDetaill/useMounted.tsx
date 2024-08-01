import React, { useState, useEffect } from 'react'

export const useMounted = () => {
  const [mountedFlag, setMountedFlag] = useState(false)
  useEffect(() => {
    setMountedFlag(true)
  }, [])

  return mountedFlag
}
