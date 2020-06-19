import './ActionButtons.ts';

export default {
  title: 'Details - Action Buttons',
};

export const Default = () => `
    <details-action-buttons
        label="My Actions"
        downloadLabel="Download"
        shareLabel="Share"
        addToCartLabel="Add to Cart"></details-action-buttons>
`;

export const NoLabel = () => `
    <details-action-buttons
        hideLabel="false"
        downloadLabel="Download"
        shareLabel="Share"
        addToCartLabel="Add to Cart"></details-action-buttons>
`;

export const DownloadOnly = () => `
    <details-action-buttons
        downloadLabel="Download"></details-action-buttons>
`;

export const Test = () => `
    <details-action-buttons myData="dooo"></details-action-buttons>
`;  