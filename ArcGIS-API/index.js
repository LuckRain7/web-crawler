/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-05-21 23:50:28
 */

const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

const URL = 'http://localhost:3000/sdk/jsapi/'

let fileData = ''

superagent.get(URL).then((res) => {
  // 获取数据并进行DOM 操作
  const $ = cheerio.load(res.text)

  const treeRoot = $('#treeRoot > div')

  treeRoot.each((index, item) => {
    if (index < 3) return

    const $treeNodeRoot = cheerio.load(item)
    fileData += `## ${index - 2}.  ${$treeNodeRoot('span').text()}\n\n`
    $treeNodeRoot('a').each((index2, item2) => {
      fileData += `**${item2.children[0].data}**\n\n`
      fileData += '>说明：\n'
      fileData += '>\n'
      fileData += `> 网址：https://developers.arcgis.com/javascript/3/jsapi/${item2.attribs.href}\n\n`
    })
  })
  writeFile(fileData)
})

function writeFile(data) {
  // 写入文件
  fs.writeFile('ArcGIS-API.md', data, (err) => {
    if (!err) {
      console.log('文件写入完成')
    }
  })
}
