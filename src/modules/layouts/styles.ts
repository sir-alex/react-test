import { css } from '@emotion/react';
import { athenian } from '@core/themes/athenian';

export const mainStyle = () => {
    return css`
      font-family: "Roboto","Helvetica","Arial",sans-serif;
      padding-top: 50px;
      @media (max-width: ${athenian.breakpoints.sm}px) {
          padding: 20px 0;
      }
    `;
};
