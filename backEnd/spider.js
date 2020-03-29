const axios = require("axios");
const $ = require("cheerio");
const url = "https://movie.douban.com/top250";
async function getListByPage(page = 1) {
  let urlSuffix = page > 1 ? `?start=${(page - 1) * 25}` : "";
  let res = await axios({
    method: "GET",
    url: url + urlSuffix,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Mobile Safari/537.36",
    }
  });
  let pics = $("div.pic>a", res.data);
  let infos = $("div.info", res.data);
  let data = []; // title href star intro
  for (let index = 0; index < pics.length; index++) {
    let pic = pics[index];
    let info = infos[index];
    let href = pic.attribs.href;
    let title = $("div.hd>a", info)
      .text()
      .replace(/\s/g, "");
    let star = $("div.star>span.rating_num", info)
      .text()
      .replace(/\s/g, "");
    let intro = $("p.quote", info)
      .text()
      .replace(/\s/g, "");
    data.push({
      index: page > 1 ? (page - 1) * 25 + index + 1 : index + 1,
      title,
      href,
      star,
      intro
    });
  }
  return data;
}
async function main() {
  let data = [];
  try {
    await Promise.all(
      Array.from(Array(10).keys()).map(async page => {
        let page_data = await getListByPage(page + 1);
        data.push(...page_data);
      })
    );
  } catch(error) {
    return { error: "服务器访问频率过高被风控，请过段时间再试。" };
  }
  
  data = data.sort((a, b) => a.index - b.index);
  return data;
}
module.exports = main;