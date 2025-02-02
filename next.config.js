/** @type {import('next').NextConfig} */
const nextConfig = {

    sassOptions: {
        silenceDeprecations: ['legacy-js-api']
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '50mb'
        }
    }
};

module.exports = nextConfig;
