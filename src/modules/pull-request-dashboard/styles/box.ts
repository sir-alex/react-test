import { css } from '@emotion/react';
import { athenian } from '@core/themes/athenian';

export const boxMui = {
    border: 1,
    borderColor: 'divider',
    borderRadius: athenian.borderRadius + 'px'
};

export const boxStyles = () => {
    return css`
      padding: ${athenian.padding.primary}px;
      margin: 50px 0;
      min-height: 610px;
      @media (max-width: ${athenian.breakpoints.sm}px) {
        padding: ${athenian.padding.primary / 2}px 0;
        margin: 20px 0;
      }
    `;
};

export const errorContainerStyles = () => {
    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffe2f8;
    `;
};
