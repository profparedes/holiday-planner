import { memo, PropsWithChildren } from 'react'

import Box from 'components/Box'

interface IHeaderProps {
  title: string
}

const Header: React.FC<PropsWithChildren<IHeaderProps>> = ({
  title,
  children,
}) => (
  <Box>
    <h1>{title}</h1>
    {children}
  </Box>
)

export default memo(Header)
