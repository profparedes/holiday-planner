import { format } from 'date-fns'

import { HolidayPlannerType } from 'types/HolidayPlannerType'

export const getPrintableContent = (
  holidayPlanner: HolidayPlannerType,
): string => {
  const { title, description, startDate, endDate, location, participants, id } =
    holidayPlanner
  return `
    <div style="margin-bottom: 20px; padding-top: 40px; border-bottom: 1px solid #ccc; display: flex; justify-content: space-around;">
      <h1>Holiday Planner</h1>
      <p>Id: ${id}</p>
    </div>
    <div style="padding-left: 40px; padding-right: 40px;">
      <div style="margin-bottom: 20px;">
        <h2>${title}</h2>
        <p style="padding-top: 20px;">${description}</p>
      </div>
      <div style="display: flex; justify-content: space-around; margin-bottom: 20px;">
        <p>Start Date: ${format(startDate, 'MM/dd/yyyy')}</p>
        <p>End Date: ${format(endDate, 'MM/dd/yyyy')}</p>
      </div>
      <p>Location: ${location}</p>
      <p style="padding-top: 20px;">Participants: ${participants.join(', ')}</p>
      <p style="margin-top: 20px; text-align: end;">This document is a formal holiday planner.</p>
    </div>
  `
}
