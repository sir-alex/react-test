import { css } from '@emotion/react';
import { athenian } from '@core/themes/athenian';

export const addBoxStyle = () => {
    return css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 610px;
      @media (max-width: ${athenian.breakpoints.sm}px) {
          min-height: 280px;
      }
    `;
};

export const addSelectorBoxStyle = () => {
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: ${athenian.breakpoints.sm}px) {
        flex-direction: column;
      }
    `;
};

export const addTextStyle = () => {
    return css`
      text-align: center;
      font-size: 1.3rem;
      margin-bottom: 50px;
      @media (max-width: ${athenian.breakpoints.sm}px) {
          font-size: 1rem;
          margin-bottom: 25px;
      }
    `;
};

export const addSelectStyle = () => {
    return css`
      margin-right: ${athenian.padding.primary / 2}px;
      min-width: 200px;
      @media (max-width: ${athenian.breakpoints.sm}px) {
          margin-right: 0;
            margin-bottom: ${athenian.padding.primary / 2}px;
      }
    `;
};
