import { css } from '@emotion/react';
import { athenian } from '@core/themes/athenian';

export const chartBoxStyle = () => {
    return css`
      max-height: 610px;
      overflow: auto;
      @media (max-width: ${athenian.breakpoints.sm}px) {
        min-height: 280px;
      }
      @media (max-width: ${athenian.breakpoints.xl}px) {
        max-height: none;
      }
    `;
};

export const chartTextStyle = () => {
    return css`
      text-align: center;
      font-size: 1.3rem;
      padding: 40px 0;

      & > span {
        color: ${athenian.bg.secondary};
        font-weight: bold;
      }

      @media (max-width: ${athenian.breakpoints.sm}px) {
        font-size: 1rem;
      }
    `;
};

export const chartBoxContainerStyle = () => {
    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      @media (max-width: ${athenian.breakpoints.xl}px) {
        flex-direction: column;
      }
    `;
};

export const chartBoxItemStyle = () => {
    return css`
      width: 100%;
      position: relative;
    `;
};

export const chartBoxItemLoadingBgStyle = () => {
    return css`
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(255, 255, 255, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
    `;
};
