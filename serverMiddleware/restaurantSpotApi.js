import axios from 'axios';

export default async function (req, res) {
  const hostName = req.headers.hostName;
  const url = new URL(req.url, 'https://' + hostName)
  
  const middle_area = url.searchParams.get('middle_area');
  const genre = url.searchParams.get('genre');

  try {
    const response = await axios.get('http://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
      params: {
        key: 'ce1ce7e7c62a5e7e',
        format: 'json',
        middle_area: middle_area,
        genre: genre,
        start: 1, // 検索結果の初期値
        count: 5, // 最大出力
        order: 4, // おすすめ
      }
    });

    let spotData = [];

    if(response.data.results.shop.length !== 0) {
        //指定されたデータだけを抽出
        const keysToExtract = ["name", "address", "open", "logo_image", "urls", "lat", "lng"];

        spotData = response.data.results.shop.map(oneObjectData =>
            keysToExtract.reduce((selectedCategory, key) => {
                if (key in oneObjectData) {
                    selectedCategory[key] = oneObjectData[key];
                }
                return selectedCategory;
            }, {})
        );
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify(spotData), 'utf8')

     // APIレスポンスを返す
  } catch (error) {
    console.error('APIリクエストエラー:', error);
    res.status(500).send('データ取得エラー');
  }
}