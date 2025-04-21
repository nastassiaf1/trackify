import { Tooltip, Box } from '@mui/material';
import { TrackStatus } from 'src/api/constants';

const getColor = (status: TrackStatus) => {
  if (status === TrackStatus.MISSED) {
    return '#ff4700a6';
  }

  if (status === TrackStatus.DONE) {
    return '#00800073';
  }

  if (status === TrackStatus.OVERACHIVED) {
    return '#f2c071d6';
  }
};

const BoxTrackLine = ({ status }: { status: TrackStatus }) => {
  return (
    <Tooltip title={status}>
      <Box
        sx={{
          position: 'absolute',
          top: '-32px',
          right: 0,
          width: '4px',
          height: '45px',
          backgroundColor: getColor(status),
        }}
      />
    </Tooltip>
  );
};

export default BoxTrackLine;
