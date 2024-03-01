
import styled from '@emotion/styled'
import Grid from '@mui/material/Grid';

export const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(50vh - 25px);
`;

export const ModalGrid = styled(Grid)`
  justify-content: center;
  align-items: center;
  width: 400px;
   background: url('${process.env.PUBLIC_URL}/images/bground.jpg') center/cover no-repeat;
  border-radius: 8px; 
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
`;
