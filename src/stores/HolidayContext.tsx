import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { FormDataType } from 'components/HolidayPlannerFormModal/HolidayPlannerFormModal'

import Api from 'services/Api'

import { HolidayPlannerType } from 'types/HolidayPlannerType'

interface IContextProps {
  holidayPlanners: HolidayPlannerType[]
  holidayPlanner: HolidayPlannerType | null
  isLoading: boolean
  fetchHolidayPlanners: () => Promise<void>
  fetchHolidayPlanner: (id: string) => Promise<void>
  createHolidayPlanner: (data: FormDataType) => Promise<void>
  updateHolidayPlanner: (id: string, data: FormDataType) => Promise<void>
  deleteHolidayPlanner: (id: string) => Promise<void>
}

interface IHolidayPlannerProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const HolidayPlannerProvider: React.FC<IHolidayPlannerProviderProps> = ({
  children,
}) => {
  const [holidayPlanners, setHolidayPlanners] = useState<HolidayPlannerType[]>(
    [],
  )
  const [holidayPlanner, setHolidayPlanner] =
    useState<HolidayPlannerType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchHolidayPlanners = useCallback(async () => {
    setIsLoading(true)

    try {
      const { data } = await Api.get('/posts')
      setHolidayPlanners(data)
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error to get host api')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchHolidayPlanner = useCallback(async (id: string) => {
    setIsLoading(true)

    try {
      const { data } = await Api.get(`/posts/${id}`)
      setHolidayPlanner(data)
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error to get host api')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createHolidayPlanner = useCallback(
    async (data: FormDataType) => {
      setIsLoading(true)

      try {
        await Api.post('/posts', data)
        await fetchHolidayPlanners()
      } catch {
        // eslint-disable-next-line no-console
        console.error('Error to create holiday planner')
      } finally {
        setIsLoading(false)
      }
    },
    [fetchHolidayPlanners],
  )

  const updateHolidayPlanner = useCallback(
    async (id: string, data: FormDataType) => {
      setIsLoading(true)

      try {
        await Api.put(`/posts/${id}`, data)
        await fetchHolidayPlanners()
      } catch {
        // eslint-disable-next-line no-console
        console.error('Error to update holiday planner')
      } finally {
        setIsLoading(false)
      }
    },
    [fetchHolidayPlanners],
  )

  const deleteHolidayPlanner = useCallback(
    async (id: string) => {
      setIsLoading(true)

      try {
        await Api.delete(`/posts/${id}`)
        await fetchHolidayPlanners()
      } catch {
        // eslint-disable-next-line no-console
        console.error('Error to delete holiday planner')
      } finally {
        setIsLoading(false)
      }
    },
    [fetchHolidayPlanners],
  )

  useEffect(() => {
    fetchHolidayPlanners()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          holidayPlanners,
          holidayPlanner,
          isLoading,
          fetchHolidayPlanners,
          fetchHolidayPlanner,
          createHolidayPlanner,
          updateHolidayPlanner,
          deleteHolidayPlanner,
        }),
        [
          createHolidayPlanner,
          deleteHolidayPlanner,
          fetchHolidayPlanner,
          fetchHolidayPlanners,
          holidayPlanner,
          holidayPlanners,
          isLoading,
          updateHolidayPlanner,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useHolidayPlanner = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useHolidayPlannerHook must be within HolidayPlannerProvider')
  }

  return context
}
