import { css } from '@emotion/react';
import { athenian } from '@core/themes/athenian';

export const titleStyle = () => {
    return css`
      text-align: center;
      font-size: 2.2rem;
      font-weight: bold;
      padding: 50px 0;
      margin-bottom: 0;
      color: ${athenian.fontColors.primary};
      @media (max-width: ${athenian.breakpoints.sm}px) {
        font-size: 1rem;
        padding: 20px 0;
        font-weight: normal;
      }
    `;
};
