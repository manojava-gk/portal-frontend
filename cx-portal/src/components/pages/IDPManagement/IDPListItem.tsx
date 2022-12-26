/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { IdentityProvider } from 'features/admin/idpApiSlice'
import { useDispatch } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import EditIcon from '@mui/icons-material/Edit'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { DropdownMenu, IconButton, MenuItem } from 'cx-portal-shared-components'
import { useState } from 'react'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import './style.scss'

export default function IDPListItem({
  idp,
  buttons,
}: {
  idp: IdentityProvider
  buttons?: boolean
}) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const toggle = () => setOpen(!open)

  const doConfirmDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(show(OVERLAYS.DELETE_IDP, idp.identityProviderId))
  }

  const doAddUsers = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      e.stopPropagation()
      dispatch(show(OVERLAYS.ADDUSERS_IDP, idp.identityProviderId))
    } catch (error) {
      console.log(error)
    }
  }

  const doEdit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      e.stopPropagation()
      dispatch(show(OVERLAYS.UPDATE_IDP, idp.identityProviderId))
    } catch (error) {
      console.log(error)
    }
  }

  const doEnableToggle = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    try {
      e.stopPropagation()
      dispatch(
        show(
          idp.enabled ? OVERLAYS.DISABLE_IDP : OVERLAYS.ENABLE_IDP,
          idp.identityProviderId
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  const renderButtons = () => {
    return (
      <>
        <IconButton color={open ? 'primary' : 'secondary'} onClick={toggle}>
          <InfoIcon />
        </IconButton>
        {idp.enabled ? (
          <IconButton
            disabled={idp.alias === 'CX-Test-Access'}
            color="primary"
            onClick={doEnableToggle}
          >
            <ToggleOnIcon />
          </IconButton>
        ) : (
          <IconButton color="secondary" onClick={doEnableToggle}>
            <ToggleOffIcon />
          </IconButton>
        )}
        <IconButton
          disabled={idp.alias === 'CX-Test-Access'}
          color="secondary"
          onClick={doEdit}
        >
          <EditIcon />
        </IconButton>

        {idp.enabled ? (
          <IconButton color="secondary" onClick={doAddUsers}>
            <GroupAddIcon />
          </IconButton>
        ) : (
          <IconButton color="secondary" onClick={doConfirmDelete}>
            <DeleteForeverIcon />
          </IconButton>
        )}
      </>
    )
  }

  const renderMenu = () => {
    return (
      <DropdownMenu buttonText={'Actions'}>
        <MenuItem title={'Details'} onClick={toggle} />
        {idp.enabled ? (
          <MenuItem title={'Disable'} onClick={doEnableToggle} />
        ) : (
          <MenuItem title={'Enable'} onClick={doEnableToggle} />
        )}
        <MenuItem title={'Edit'} onClick={doEdit} />
        {idp.enabled ? (
          <MenuItem title={'Link users'} onClick={doAddUsers} />
        ) : (
          <MenuItem title={'Delete'} onClick={doConfirmDelete} />
        )}
      </DropdownMenu>
    )
  }

  return (
    <>
      <div className="idp-list-item">
        <span className="category">{idp.identityProviderCategoryId}</span>
        <span className="name">{idp.displayName || '-'}</span>
        <span className="alias">{idp.alias}</span>
        <span className={`action ${buttons ? 'buttons' : 'menu'}`}>
          {buttons ? renderButtons() : renderMenu()}
        </span>
      </div>
      {open && (
        <div className="content">
          <pre>{JSON.stringify(idp, null, 2)}</pre>
        </div>
      )}
    </>
  )
}
