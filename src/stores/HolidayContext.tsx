import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import Api from 'services/Api'

import { HolidayPlannerType } from 'types/HolidayPlannerType'

interface IContextProps {
  holidayPlanners: HolidayPlannerType[]
  holidayPlanner: HolidayPlannerType | null
  isLoading: boolean
  fetchHolidayPlanners: () => Promise<void>
  fetchHolidayPlanner: (id: number) => Promise<void>
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

  const fetchHolidayPlanner = useCallback(async (id: number) => {
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
        }),
        [
          fetchHolidayPlanner,
          fetchHolidayPlanners,
          holidayPlanner,
          holidayPlanners,
          isLoading,
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
