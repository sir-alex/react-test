import { css } from '@emotion/react';
import { athenian } from '@core/themes/athenian';

export const datesStyle = () => {
    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      & > div {
        margin: 0 ${athenian.padding.primary / 2}px;
      }
      @media (max-width: ${athenian.breakpoints.sm}px) {
        flex-direction: column;
        & > div {
          margin: ${athenian.padding.primary / 2}px 0;
        }
      }
    `;
};
