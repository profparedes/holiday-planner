import { memo, useCallback, useEffect, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Modal,
  Paper,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LuCalendarPlus } from 'react-icons/lu'
import { useHolidayPlanner } from 'stores/HolidayContext'

import Header from 'components/Header'
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
            title: currentHolidayPlanner.title || 'PPPP',
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
          {/* Material UI's Button and startIcon */}
          Create a new Holiday Planner
        </Button>
      </Header>
      {/* <LanguageSwitcher /> */}
      <main className="flex-grow-1">
        <Container maxWidth="lg">
          {isLoading && <p>Loading...</p>}
          <Grid container spacing={2} style={{ marginTop: 12 }}>
            {!isLoading &&
              holidayPlanners.length > 0 &&
              holidayPlanners.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5">{item.title}</Typography>{' '}
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>
                          <Typography variant="body2">
                            {item.startDate}
                          </Typography>
                        </Box>
                        <Box flexGrow={1}>
                          <Typography variant="body2">
                            {item.endDate}
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          {item.participants.join(', ')}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button onClick={() => handleEditHolidayPlanner(item)}>
                          Edit
                        </Button>
                        <Button
                          onClick={() =>
                            handleOpenDeleteHolidayPlannerModal(item)
                          }
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>

      <HolidayPlannerFormModal
        showModal={modalShow}
        onHideModal={handleCloseFormModal}
        onSubmit={handleSubmitHolidayPlanner}
        currentHolidayPlanner={currentHolidayPlanner ?? undefined}
        initialFormData={initialFormData}
      />

      <Modal
        open={deleteConfirmModal}
        onClose={() => setDeleteConfirmModal(false)}
        aria-labelledby="delete-holiday-planner-modal-title"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Paper sx={{ maxWidth: 'md' }}>
            <Typography variant="h6" id="delete-holiday-planner-modal-title">
              Delete Holiday Planner
            </Typography>
            <Typography variant="body1">
              Are you sure you want to delete the holiday planner:{' '}
              {currentHolidayPlanner?.title}
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={() => setDeleteConfirmModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleDeleteHolidayPlanner}>Delete</Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </>
  )
}

export default memo(Home)
