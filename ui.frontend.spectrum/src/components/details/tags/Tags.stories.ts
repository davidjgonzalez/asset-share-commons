import './Tags.ts';

export default {
  title: 'Details - Tags',
};

export const Default = () => `
    <details-tags
        label="My Tags"
        tags='["Ira", "Bear", "Pelite"]'/>
`;

export const HideLabel = () => `
    <details-tags
        hideLabel
        tags='["Ira", "Bear", "Pelite"]'/>
`;

export const NoTags = () => `
    <details-tags
        label="My Tags"
        tags="[]"
        emptyText="No tags available :("/>
`;