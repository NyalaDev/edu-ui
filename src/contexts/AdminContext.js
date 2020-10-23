import React, { useState, useEffect, createContext } from 'react'
import { teacher } from '../services/api'

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true)
  const [languages, setLanguages] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await teacher.listLanguages()
        const { data: tagsData } = await teacher.getTags()
        setLanguages(data)
        setTags(tagsData)
        setFetching(false)
      } catch (e) {
        setLanguages([])
        setFetching(false)
      }
    }
    fetchData()
  }, [])

  return (
    <AdminContext.Provider value={{ fetching, tags, languages }}>
      {children}
    </AdminContext.Provider>
  )
}
