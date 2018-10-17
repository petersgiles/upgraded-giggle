//CORS middleware
export const allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', 'example.com')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next();
  }