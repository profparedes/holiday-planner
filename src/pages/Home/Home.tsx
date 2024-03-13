import { memo, useCallback, useEffect, useState } from 'react'

import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { LuCalendarPlus } from 'react-icons/lu'
import { useHolidayPlanner } from 'stores/HolidayContext'

import Box from 'components/Box'
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

  useEffect(() => {
    setTitle(t('home.head-title'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage])

  return (
    <>
      <Header title={t('home.title')} />
      {/* <LanguageSwitcher /> */}
      <main className="flex-grow-1">
        <Container fluid>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            {' '}
            <LuCalendarPlus
              style={{ marginBottom: '4px', marginRight: '4px' }}
            />{' '}
            Create a new Holiday Planner
          </Button>
          {isLoading && <p>Loading...</p>}
          <Row style={{ marginTop: 12 }}>
            {!isLoading &&
              holidayPlanners.length > 0 &&
              holidayPlanners.map((item) => (
                <Col key={item.id}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>
                        {item.description}
                        <Box direction="row">
                          <p>{item.date}</p>
                          <p>{item.participants.join(', ')}</p>
                        </Box>
                        <Box
                          direction="row"
                          justifyContent="space-between"
                          marginTop={8}
                        >
                          <Button
                            onClick={() => handleEditHolidayPlanner(item)}
                          >
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
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </main>

      <HolidayPlannerFormModal
        showModal={modalShow}
        onHideModal={() => setModalShow(false)}
        onSubmit={handleSubmitHolidayPlanner}
        currentHolidayPlanner={currentHolidayPlanner ?? undefined}
      />

      <Modal
        size="sm"
        centered
        show={deleteConfirmModal}
        onHide={() => setDeleteConfirmModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Holiday Planner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {`Are you sure you want to delete the holiday planner: ${currentHolidayPlanner?.title}`}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setDeleteConfirmModal(false)}>Cancel</Button>
          <Button onClick={handleDeleteHolidayPlanner}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default memo(Home)
