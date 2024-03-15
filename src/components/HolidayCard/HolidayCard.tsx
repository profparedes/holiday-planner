import { memo } from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { FaRegEdit } from 'react-icons/fa'
import { IoMdPrint } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

import { HolidayPlannerType } from 'types/HolidayPlannerType'

interface IHolidayCardProps {
  holidayPlanner: HolidayPlannerType
  onEdit: () => void
  onDelete: () => void
  onPrint: () => void
}

const HolidayCard: React.FC<IHolidayCardProps> = ({
  holidayPlanner,
  onEdit,
  onDelete,
  onPrint,
}) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      bgcolor: '#222A30',
    }}
  >
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        color="#3399FF"
        borderBottom={1}
        mb={2}
      >
        <Typography variant="h5">{holidayPlanner.title}</Typography>
        <IconButton sx={{ color: '#3399FF' }} onClick={onPrint}>
          <IoMdPrint size={18} />
        </IconButton>
      </Box>
      <Typography color="#fff" mb={2}>
        {holidayPlanner.description}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        color="#fff"
        mb={2}
      >
        <Box>
          <Typography fontSize={14}>Start Date:</Typography>
          <Typography>
            {format(holidayPlanner.startDate, 'MM/dd/yyyy')}
          </Typography>
        </Box>
        <Box>
          <Typography fontSize={14}>End Date:</Typography>
          <Typography>
            {format(holidayPlanner.endDate, 'MM/dd/yyyy')}
          </Typography>
        </Box>
      </Box>
      <Box mb={2} color="#fff">
        <Typography fontSize={14} color="#fff">
          Location:
        </Typography>
        <Typography>{holidayPlanner.location}</Typography>
      </Box>
      <Box color="#fff" mb={2}>
        <Typography fontSize={14}>Participants:</Typography>
        <Typography>{holidayPlanner.participants.join(', ')}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        mt="auto"
        alignItems="center"
      >
        <Button onClick={onEdit} sx={{ width: 110 }} variant="outlined">
          <FaRegEdit />
          <Typography fontSize={14} mt={0.4} ml={1}>
            Edit
          </Typography>
        </Button>
        <Button
          onClick={onDelete}
          sx={{ width: 110 }}
          variant="outlined"
          color="error"
        >
          <MdDelete />
          <Typography fontSize={14} mt={0.1} ml={1}>
            Delete
          </Typography>
        </Button>
      </Box>
    </CardContent>
  </Card>
)

export default memo(HolidayCard)
