import { useEffect } from "react"
import { Box, Stack } from "@mui/material"
import { useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import Navbar from "./Navbar"
import Footer from "./Footer"
import AuthDialog from "../../components/auth/AuthDialog"

const PublicWrapper = () => {
  const location = useLocation()
  const outlet = useOutlet()

  // every page opens from the top
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", margin: 0, padding: 0 }}>
      <Stack sx={{ display: "flex", flexDirection: "column" }}>
        <Navbar />

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="min-h-[70vh]"
          >
            {outlet}
          </motion.main>
        </AnimatePresence>

        <Footer />
        <AuthDialog />
      </Stack>
    </Box>
  )
}

export default PublicWrapper