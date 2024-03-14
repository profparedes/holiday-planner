import { memo, PropsWithChildren } from 'react'

import { Box, Container, Typography } from '@mui/material'

interface IHeaderProps {
  title: string
}

const Header: React.FC<PropsWithChildren<IHeaderProps>> = ({
  title,
  children,
}) => (
  <Container>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={2}
    >
      <Typography fontSize={26}>{title}</Typography>
      {children}
    </Box>
  </Container>
)

export default memo(Header)
