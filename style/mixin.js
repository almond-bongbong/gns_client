import { css } from 'styled-components';

export const red = '#ff4d4f';
export const blue = '#1890ff';
export const yellow = '#fadb14';
export const green = '#438844';

export const hidden = css`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
`;

export const clearfix = css`
  &:before,
  &:after {
    content: '';
    display: table;
  }
  &:after {
    clear: both;  
  }
`;

export const multiEllipsis = (line) => css`
  display: -webkit-box; 
  overflow: hidden;
  -webkit-line-clamp: ${line}; 
  -webkit-box-orient: vertical; 
  text-overflow: ellipsis;
`;

export const alignX = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const alignY = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const alignXY = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const triangle = (width, direction, color) => {
  let style = '';
  if (direction === 'up') {
    style = css`
      width: 0;
      height: 0;
      border-left: ${width / 2}px solid transparent;
      border-right: ${width / 2}px solid transparent;
      border-bottom: ${width / 2}px solid ${color};
    `;
  } if (direction === 'down') {
    style = css`
      width: 0;
      height: 0;
      border-left: ${width / 2}px solid transparent;
      border-right: ${width / 2}px solid transparent;
      border-top: ${width / 2}px solid ${color};
    `;
  } if (direction === 'right') {
    style = css`
      width: 0;
      height: 0;
      border-top: ${width}px solid transparent;
      border-bottom: ${width}px solid transparent;
      border-left: ${width}px solid ${color};
    `;
  } if (direction === 'left') {
    style = css`
      width: 0;
      height: 0;
      border-top: ${width}px solid transparent;
      border-bottom: ${width}px solid transparent;
      border-right: ${width}px solid ${color};
    `;
  }
  return style;
};
