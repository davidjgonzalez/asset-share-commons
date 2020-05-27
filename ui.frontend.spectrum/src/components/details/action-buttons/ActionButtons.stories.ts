import './ActionButtons.ts';

export default {
  title: 'Details - Action Buttons',
};

export const Default = () => `
    <details-action-buttons
        label="My Actions"
        downloadLabel="Download"
        shareLabel="Share"
        addToCartLabel="Add to Cart"/>
`;

export const NoLabel = () => `
    <details-action-buttons
        hideLabel="false"
        downloadLabel="Download"
        shareLabel="Share"
        addToCartLabel="Add to Cart"/>
`;

export const DownloadOnly = () => `
    <details-action-buttons
        downloadLabel="Download"/>
`;