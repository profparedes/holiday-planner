import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'

import { HolidayPlannerType } from 'types/HolidayPlannerType'

export type FormDataType = {
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  participants: string[]
}

interface IHolidayPlannerFormModalProps {
  showModal: boolean
  currentHolidayPlanner?: HolidayPlannerType
  initialFormData: FormDataType
  onHideModal: () => void
  onSubmit: (data: FormDataType) => void
}

const HolidayPlannerFormModal: React.FC<IHolidayPlannerFormModalProps> = ({
  showModal,
  currentHolidayPlanner,
  onHideModal,
  onSubmit,
  initialFormData,
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

  const handleRemoveParticipant = useCallback((index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      participants: prevState.participants.filter((_, i) => i !== index),
    }))
  }, [])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit(formData)
      setFormData(initialFormData)
    },
    [formData, initialFormData, onSubmit],
  )

  useEffect(() => {
    if (!showModal) {
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        participants: [''],
      })
    }
  }, [showModal])

  return (
    <Dialog open={showModal} onClose={onHideModal} fullWidth maxWidth="md">
      <DialogTitle>
        {!currentHolidayPlanner
          ? 'Create a new Holiday Planner'
          : `Edit ${currentHolidayPlanner.title}`}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="title">Title</InputLabel>
                <OutlinedInput
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  label="Title"
                />
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="description">Description</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  label="Description"
                  multiline
                  rows={3}
                />
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="startDate">Start Date</InputLabel>
                <OutlinedInput
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  label="Start Date"
                  sx={{
                    padding: '16.5px 14px 16.5px 94px',
                    '& input': { padding: 0 },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="endDate">End Date</InputLabel>
                <OutlinedInput
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  label="End Date"
                  sx={{
                    padding: '16.5px 14px 16.5px 94px',
                    '& input': { padding: 0 },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="location">Location</InputLabel>
                <OutlinedInput
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  label="Location"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Typography mt={2}>Participants</Typography>
            {formData.participants.map((participant, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box key={index} sx={{ m: 1, display: 'flex', flexGrow: 1 }}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <OutlinedInput
                    name="participants"
                    type="text"
                    value={participant}
                    onChange={(e) => handleChange(e, index)}
                    fullWidth
                  />
                </FormControl>
                {formData.participants.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveParticipant(index)}
                    sx={{ ml: 1 }}
                  >
                    -
                  </IconButton>
                )}
              </Box>
            ))}
            <IconButton onClick={handleAddParticipant} sx={{ m: 1 }}>
              +
            </IconButton>
          </Grid>
          <Button onClick={onHideModal} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {currentHolidayPlanner ? 'Update' : 'Create'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default memo(HolidayPlannerFormModal)
