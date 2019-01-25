# Iryngu
IRYNGU (Image Resizer You'll Never Gonna Use)

## Stack:
  - NodeJs	(Backend)
  - Express	(REST API)
  - MongoDb	(noSQL)
  - AWS S3 (Cloud Storage)
  
## API
  - /api/upload?{_file_} - Uploads file to server
  - /api/resize?{_width_}&{_height_}&{_format_}&{_file_} - Resize image by given params
  - api/history - Gives the list of earlier resized images
