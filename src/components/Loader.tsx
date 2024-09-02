import { CircularProgress, Backdrop } from "@mui/material"

const Loader = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  )
}

export default Loader;