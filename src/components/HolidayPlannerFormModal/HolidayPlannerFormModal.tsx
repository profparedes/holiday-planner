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
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci'

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
  useEffect(() => setFormData(initialFormData), [initialFormData])

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
      if (currentHolidayPlanner) {
        setFormData({
          title: currentHolidayPlanner.title || '',
          description: currentHolidayPlanner.description || '',
          startDate: currentHolidayPlanner.startDate || '',
          endDate: currentHolidayPlanner.endDate || '',
          location: currentHolidayPlanner.location || '',
          participants: currentHolidayPlanner.participants || [''],
        })
      } else {
        setFormData({
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          location: '',
          participants: [''],
        })
      }
    }
  }, [currentHolidayPlanner, showModal])

  return (
    <Dialog open={showModal} onClose={onHideModal} fullWidth maxWidth="md">
      <DialogTitle bgcolor="#0B1A28" color="#fff">
        {!currentHolidayPlanner
          ? 'Create a new Holiday Planner'
          : `Edit ${currentHolidayPlanner.title}`}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: '#222A30', color: '#fff' }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="title" sx={{ color: '#fff' }}>
                  Title
                </InputLabel>
                <OutlinedInput
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  label="Title"
                  sx={{ color: '#fff' }}
                />
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="description" sx={{ color: '#fff' }}>
                  Description
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  label="Description"
                  multiline
                  rows={3}
                  sx={{ color: '#fff' }}
                />
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="startDate" sx={{ color: '#fff' }}>
                  Start Date
                </InputLabel>
                <OutlinedInput
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  label="Start Date"
                  sx={{
                    padding: '16.5px 14px 16.5px 94px',
                    color: '#fff',
                    '& input': { padding: 0 },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="endDate" sx={{ color: '#fff' }}>
                  End Date
                </InputLabel>
                <OutlinedInput
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  label="End Date"
                  sx={{
                    color: '#fff',
                    padding: '16.5px 14px 16.5px 94px',
                    '& input': { padding: 0 },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="location" sx={{ color: '#fff' }}>
                  Location
                </InputLabel>
                <OutlinedInput
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  label="Location"
                  sx={{ color: '#fff' }}
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
                    sx={{ color: '#fff' }}
                  />
                </FormControl>
                {formData.participants.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveParticipant(index)}
                    sx={{ ml: 1 }}
                  >
                    <CiCircleMinus color="red" />
                  </IconButton>
                )}
              </Box>
            ))}
            <Box display="flex" alignItems="center">
              <IconButton
                onClick={handleAddParticipant}
                sx={{ m: 1, color: '#1976D2' }}
              >
                <CiCirclePlus />
              </IconButton>
              <Typography>Add new participant</Typography>
            </Box>
          </Grid>
          <Box display="flex" width="100%" justifyContent="space-between">
            <Button onClick={onHideModal} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" color="success" variant="outlined">
              {currentHolidayPlanner ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default memo(HolidayPlannerFormModal)
