import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { useConfig } from 'config/config'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { LuCalendarPlus } from 'react-icons/lu'
import { useHolidayPlanner } from 'stores/HolidayContext'

import Box from 'components/Box'
import Header from 'components/Header'

import useTitle from 'hooks/useTitle'

const Home: React.FC = () => {
  const [modalShow, setModalShow] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    participants: [''],
  })
  const { app } = useConfig()
  const { t, i18n } = useTranslation()
  const setTitle = useTitle()
  const { holidayPlanners, isLoading } = useHolidayPlanner()

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      index?: number,
    ) => {
      const { name, value } = e.target
      if (name === 'participants') {
        const updatedParticipants = [...formData.participants]
        if (index !== undefined) {
          updatedParticipants[index] = value
        } else {
          updatedParticipants.push(value)
        }
        setFormData((prevState) => ({
          ...prevState,
          participants: updatedParticipants,
        }))
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }))
      }
    },
    [formData.participants],
  )

  const handleAddParticipant = useCallback(() => {
    setFormData((prevState) => ({
      ...prevState,
      participants: [...formData.participants, ''],
    }))
  }, [formData.participants])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      console.log({ formData })
      setModalShow(false)
    },
    [formData],
  )

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
          {!isLoading &&
            holidayPlanners.length > 0 &&
            holidayPlanners.map((item) => (
              <div key={item.id}>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <p>{item.date}</p>
                {item.participants.join(', ')}
              </div>
            ))}
        </Container>
      </main>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a new Holiday Planner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formParticipants">
              <Form.Label>Participants</Form.Label>
              {formData.participants.map((participant, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Box direction="row" key={index}>
                  <Form.Control
                    type="text"
                    placeholder="Enter participant"
                    name="participants"
                    value={participant}
                    onChange={(e) => handleChange(e, index)}
                  />
                  {index === formData.participants.length - 1 && (
                    <Button variant="secondary" onClick={handleAddParticipant}>
                      +
                    </Button>
                  )}
                </Box>
              ))}
            </Form.Group>
            <Box
              width="100%"
              direction="row"
              justifyContent="flex-end"
              marginTop={12}
            >
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Box>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Box width="100%" direction="row" justifyContent="flex-start">
            <Button onClick={() => setModalShow(false)}>Cancel</Button>
          </Box>
        </Modal.Footer>
      </Modal>
      <p>{`v${app.version}`}</p>
    </>
  )
}

export default memo(Home)
