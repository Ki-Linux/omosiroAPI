const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = 'ce1ce7e7c62a5e7e';
const BASE_URL = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';

app.get('/gourmet', async (req, res) => {
    const largeArea = req.query.large_area || 'Z011';

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                large_area: largeArea,
                format: 'json',
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Hot Pepper API:', error.response?.data || error.message);
        res.status(500).json({
            error: 'APIリクエスト中にエラーが発生しました。',
            details: error.response?.data || error.message,
        });
    }
});

module.exports = app;
