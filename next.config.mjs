/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: "mongodb+srv://robin:d0Txpxjb86DO7P2b@zooper-clone.6ffrv.mongodb.net/",
        EMAIL_USER:"robindeep.eminence@gmail.com",
        EMAIL_PASS:"veod zcpx yehx wmww",
        ADMIN_EMAIL:"robindeep.eminence@gmail.com"
      },
      output:'export',
      images: {
        unoptimized: true
    },
};

export default nextConfig;
