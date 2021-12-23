import { css } from '@emotion/react';
import { athenian } from '@core/themes/athenian';

export const titleStyle = () => {
    return css`
      text-align: center;
      font-size: 2.2rem;
      font-weight: bold;
      padding: 50px 0;
      color: ${athenian.fontColors.primary}
    `;
};
