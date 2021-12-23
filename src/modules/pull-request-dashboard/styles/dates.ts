import { css } from '@emotion/react';
import { athenian } from '@core/themes/athenian';

export const datesStyle = () => {
    return css`
      text-align: center;
      @media (min-width: ${athenian.breakpoints.sm}px) {
        & div:first-child {
          text-align: right;
        }

        & div:last-child {
          text-align: left;
        }
      }
    `;
};
