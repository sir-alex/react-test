import { css } from '@emotion/react';
import { primary } from '@root/core/themes/primary';

export const titleStyle = () => {
    return css`
      text-align: center;
      font-size: 2.2rem;
      font-weight: bold;
      padding: 50px 0;
      color: ${primary.fontColors.primary}
    `;
};
