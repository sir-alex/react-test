import { css } from '@emotion/react';
import { primary } from '@root/core/themes/primary';

export const datesStyle = () => {
    return css`
      text-align: center;
      @media (min-width: 576px) {
        & div:first-child {
          text-align: right;
        }

        & div:last-child {
          text-align: left;
        }
      }
    `;
};
