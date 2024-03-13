import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { Button, Form, Modal } from 'react-bootstrap'

import Box from 'components/Box'

import { HolidayPlannerType } from 'types/HolidayPlannerType'

export type FormDataType = {
  title: string
  description: string
  date: string
  location: string
  participants: string[]
}

interface IHolidayPlannerFormModalProps {
  showModal: boolean
  currentHolidayPlanner?: HolidayPlannerType
  onHideModal: () => void
  onSubmit: (data: FormDataType) => void
}

const initialFormData = {
  title: '',
  description: '',
  date: '',
  location: '',
  participants: [''],
}

const HolidayPlannerFormModal: React.FC<IHolidayPlannerFormModalProps> = ({
  showModal,
  currentHolidayPlanner,
  onHideModal,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData)

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
      onSubmit(formData)
      setFormData(initialFormData)
    },
    [formData, onSubmit],
  )

  useEffect(() => {
    if (currentHolidayPlanner) {
      setFormData({
        title: currentHolidayPlanner.title,
        description: currentHolidayPlanner.description,
        date: currentHolidayPlanner.date,
        location: currentHolidayPlanner.location,
        participants: currentHolidayPlanner.participants,
      })
    }
  }, [currentHolidayPlanner])

  return (
    <Modal show={showModal} onHide={onHideModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {!currentHolidayPlanner
            ? 'Create a new Holiday Planner'
            : `Edit ${currentHolidayPlanner.title}`}
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
              {currentHolidayPlanner ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Box width="100%" direction="row" justifyContent="flex-start">
          <Button onClick={onHideModal}>Cancel</Button>
        </Box>
      </Modal.Footer>
    </Modal>
  )
}

export default memo(HolidayPlannerFormModal)
