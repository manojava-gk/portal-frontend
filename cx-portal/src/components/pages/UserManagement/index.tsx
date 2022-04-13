import { useState } from 'react'
import { AddUserOverlay } from './AddUserOverlay'
import { ActiveUserTable } from './ActiveUserTable'
import StageSection from './components/StageSection'
import { AppArea } from './AppArea'

export default function UserManagement() {
  const [open, setOpen] = useState(false)

  const openAddUserLayout = () => {
    setOpen(true)
  }

  const closeAddUserLayout = () => {
    setOpen(false)
  }

  const confirmNewUser = () => {
    console.log('confirmed')
  }

  return (
    <main>
      <AddUserOverlay
        openDialog={open}
        handleClose={closeAddUserLayout}
        handleConfirm={confirmNewUser}
      />
      <StageSection />
      <AppArea />
      <ActiveUserTable onAddUserButtonClick={openAddUserLayout} />
    </main>
  )
}
