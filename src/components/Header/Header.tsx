import { memo, PropsWithChildren } from 'react'

import { Box, Container, Typography } from '@mui/material'

interface IHeaderProps {
  title: string
}

const Header: React.FC<PropsWithChildren<IHeaderProps>> = ({
  title,
  children,
}) => (
  <Box bgcolor="#0B1A28">
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Typography color="#fff" fontSize={26}>
          {title}
        </Typography>
        {children}
      </Box>
    </Container>
  </Box>
)

export default memo(Header)
