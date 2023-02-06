// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

const https = require('https')
const cheerio = require('cheerio')

// request 请求体对象
// response 响应体对象
// url = /api/v1/cheer
export default function handler( request, response) {
  try {
    let html = ''
    https.get('https://www.zhipin.com/shenzhen/', res=>{
      res.on('data', data => {
        html += data
      })
      res.on('end', ()=>{
        // console.log('---爬取成功', html)
        const $ = cheerio.load(html)
        const content = $('div.job-menu-wrapper').html()
        // console.log('--content', content)
        response.status(200).json({err: 0, msg:'success', data: { content }})
      })
    })
  } catch (err) {
    response.status(500)
  }
}
