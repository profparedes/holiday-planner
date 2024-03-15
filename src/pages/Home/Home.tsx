import { memo, useCallback, useEffect, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LuCalendarPlus } from 'react-icons/lu'
import { useHolidayPlanner } from 'stores/HolidayContext'
import { getPrintableContent } from 'utils/pdf'

import Header from 'components/Header'
import HolidayCard from 'components/HolidayCard'
import HolidayPlannerFormModal from 'components/HolidayPlannerFormModal'
import { FormDataType } from 'components/HolidayPlannerFormModal/HolidayPlannerFormModal'

import useTitle from 'hooks/useTitle'

import { HolidayPlannerType } from 'types/HolidayPlannerType'

const Home: React.FC = () => {
  const [modalShow, setModalShow] = useState(false)
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
  const [currentHolidayPlanner, setCurrentHolidayPlanner] =
    useState<HolidayPlannerType | null>(null)

  const { t, i18n } = useTranslation()
  const setTitle = useTitle()
  const {
    holidayPlanners,
    isLoading,
    createHolidayPlanner,
    updateHolidayPlanner,
    deleteHolidayPlanner,
  } = useHolidayPlanner()

  const handleOpenCreateModal = useCallback(() => {
    setCurrentHolidayPlanner(null)
    setModalShow(true)
  }, [])

  const handleCloseFormModal = useCallback(() => {
    setCurrentHolidayPlanner(null)
    setModalShow(false)
  }, [])

  const handleSubmitHolidayPlanner = useCallback(
    (formData: FormDataType) => {
      if (!currentHolidayPlanner) {
        createHolidayPlanner(formData)
        setModalShow(false)
      } else {
        updateHolidayPlanner(currentHolidayPlanner.id, formData)
        setModalShow(false)
        setCurrentHolidayPlanner(null)
      }
    },
    [createHolidayPlanner, currentHolidayPlanner, updateHolidayPlanner],
  )

  const handleEditHolidayPlanner = useCallback(
    (holidayPlanner: HolidayPlannerType) => {
      setCurrentHolidayPlanner(holidayPlanner)
      setModalShow(true)
    },
    [],
  )

  const handleOpenDeleteHolidayPlannerModal = useCallback(
    (holidayPlanner: HolidayPlannerType) => {
      setCurrentHolidayPlanner(holidayPlanner)
      setDeleteConfirmModal(true)
    },
    [],
  )

  const handleDeleteHolidayPlanner = useCallback(() => {
    if (currentHolidayPlanner) {
      deleteHolidayPlanner(currentHolidayPlanner?.id)
      setDeleteConfirmModal(false)
      setCurrentHolidayPlanner(null)
    }
  }, [currentHolidayPlanner, deleteHolidayPlanner])

  const handlePrintPlanner = useCallback(
    (holidayPlanner: HolidayPlannerType) => {
      const printableContent = getPrintableContent(holidayPlanner)
      const originalContent = document.body.innerHTML
      document.body.innerHTML = printableContent
      window.print()
      document.body.innerHTML = originalContent
    },
    [],
  )

  const initialFormData = useMemo(
    () =>
      !currentHolidayPlanner
        ? {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            location: '',
            participants: [''],
          }
        : {
            title: currentHolidayPlanner.title || '',
            description: currentHolidayPlanner.description || '',
            startDate: currentHolidayPlanner.startDate || '',
            endDate: currentHolidayPlanner.endDate || '',
            location: currentHolidayPlanner.location || '',
            participants: currentHolidayPlanner.participants || [''],
          },
    [currentHolidayPlanner],
  )

  useEffect(() => {
    setTitle(t('home.head-title'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage])

  return (
    <>
      <Header title={t('home.title')}>
        <Button
          variant="contained"
          startIcon={<LuCalendarPlus style={{ marginRight: '8px' }} />}
          onClick={handleOpenCreateModal}
        >
          Create a new Holiday Planner
        </Button>
      </Header>
      {/* <LanguageSwitcher /> */}
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        flexGrow={1}
        bgcolor="#0F1418"
      >
        <Container maxWidth="lg">
          {isLoading && <p>Loading...</p>}
          <Grid container spacing={2} style={{ marginTop: 12 }}>
            {!isLoading &&
              holidayPlanners.length > 0 &&
              holidayPlanners.map((item) => (
                <Grid
                  key={item.id}
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  flexGrow={1}
                  minHeight="100%"
                >
                  <HolidayCard
                    holidayPlanner={item}
                    onEdit={() => handleEditHolidayPlanner(item)}
                    onDelete={() => handleOpenDeleteHolidayPlannerModal(item)}
                    onPrint={() => handlePrintPlanner(item)}
                  />
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>

      <HolidayPlannerFormModal
        showModal={modalShow}
        onHideModal={handleCloseFormModal}
        onSubmit={handleSubmitHolidayPlanner}
        currentHolidayPlanner={currentHolidayPlanner ?? undefined}
        initialFormData={initialFormData}
      />

      <Dialog
        open={deleteConfirmModal}
        onClose={() => setDeleteConfirmModal(false)}
      >
        <DialogTitle bgcolor="#0B1A28" color="#fff">
          <Typography variant="h6">Delete Holiday Planner</Typography>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#222A30', color: '#fff' }}>
          <Typography mt={2} textAlign="center">
            Are you sure you want to delete the holiday planner:{' '}
            {currentHolidayPlanner?.title}
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              onClick={() => setDeleteConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteHolidayPlanner}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default memo(Home)
