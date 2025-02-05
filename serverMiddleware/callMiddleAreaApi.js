import axios from 'axios';

export default async function (req, res) {

  const hostName = req.headers.hostName;
  const url = new URL(req.url, 'https://' + hostName)
  
  const large_area = url.searchParams.get('large_area');

  try {
    const response = await axios.get('https://webservice.recruit.co.jp/hotpepper/middle_area/v1/', {
      params: {
        key: 'ce1ce7e7c62a5e7e',
        format: 'json',
        large_area: large_area,
      }
    });

    const middleArea = response.data.results.middle_area.map(area => {
      // 不要なフィールドを除外
      const { large_area, large_service_area, service_area,
        ...filteredData } = area;
      return filteredData; 
    });

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify(middleArea), 'utf8')

     // APIレスポンスを返す
  } catch (error) {
    console.error('APIリクエストエラー:', error);
    res.status(500).send('データ取得エラー');
  }
}