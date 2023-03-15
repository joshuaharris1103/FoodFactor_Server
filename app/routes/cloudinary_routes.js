const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: "djnnpzwtn",
    api_key: "761261242711471",
    api_secret: "iOEKefjdGI4a96W9Ig8yA-MQwvs"
  })

const cloudinary = cloudinary.uploader.upload()