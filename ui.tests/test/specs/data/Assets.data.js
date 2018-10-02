const THUMBNAIL_RENDITION_SUFFIX = '/_jcr_content/renditions/cq5dam.thumbnail.319.319.png';
const ASSET_DETAILS_IMAGE_PREFIX = '/content/asset-share-commons/en/test/details/image.html';

const Assets = {
    images: {
        '1': {
            name: 'image-1.jpg',
            title: 'Test Image One',
            size: '741.8 KB',
            type: 'image',
            resolution: '4000 x 6000',
            path: '/content/dam/asset-share-commons/en/test/pictures/image-1.jpg',
            get image() { return this.path + THUMBNAIL_RENDITION_SUFFIX },
            get detailsPath() { return ASSET_DETAILS_IMAGE_PREFIX + this.path }
        },

        '2': {
            name: 'image-2.jpg',
            title: 'image-2.jpg',
            size: '1.3 MB',
            type: 'image',
            resolution: '5184 x 3456',
            path: '/content/dam/asset-share-commons/en/test/pictures/image-2.jpg',
            get image() { return this.path + THUMBNAIL_RENDITION_SUFFIX },
            get detailsPath() { return ASSET_DETAILS_IMAGE_PREFIX + this.path }
        },

        '3': {
            name: 'image-3.jpg',
            title: 'image-3.jpg',
            size: '1.6 MB',
            type: 'image',
            resolution: '5016 X 3344',
            path: '/content/dam/asset-share-commons/en/test/pictures/image-3.jpg',
            get image() { return this.path + THUMBNAIL_RENDITION_SUFFIX },
            get detailsPath() { return ASSET_DETAILS_IMAGE_PREFIX + this.path }
        },

        '4': {
            name: 'image-4.jpg',
            title: 'image-4.jpg',
            size: '1.3 MB',
            type: 'image',
            resolution: '1750 x 2625',
            path: '/content/dam/asset-share-commons/en/test/pictures/image-4.jpg',
            get image() { return this.path + THUMBNAIL_RENDITION_SUFFIX },
            get detailsPath() { return ASSET_DETAILS_IMAGE_PREFIX + this.path }
        },

        '5': {
            name: 'image-5.jpg',
            title: 'image-5.jpg',
            size: '889.9 KB',
            type: 'image',
            resolution: '2000 x 2751',
            path: '/content/dam/asset-share-commons/en/test/pictures/image-5.jpg',
            get image() { return this.path + THUMBNAIL_RENDITION_SUFFIX },
            get detailsPath() { return ASSET_DETAILS_IMAGE_PREFIX + this.path }
        },
    },
}

export default Assets;